import React, { useEffect, useState } from "react";
import { Route, useLocation, useNavigate } from "react-router-dom";
import { GoogleMap, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";
import "./RouteMapModal.css";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from '../../../utils/axiosInstance'; // правильний шлях

import { useSelector } from 'react-redux';
import { API_ENDPOINTS } from '../../../config/apiConfig';



const libraries = ["places"];
const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 49.8397,
  lng: 24.0297,
};
const RouteMapModal = ({ onClose }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
  
    const coordinatePointId = location.state?.coordinatePointId || null;
    const initialLatitude = parseFloat(location.state?.latitude || 49.8397); // Default: Lviv
    const initialLongitude = parseFloat(location.state?.longitude || 24.0297); // Default: Lviv
    const [latitude, setLatitude] = useState(initialLatitude);
    const [longitude, setLongitude] = useState(initialLongitude);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [apiKey, setApiKey] = useState(
      localStorage.getItem("google_maps_api_key") || ""
    );
    const [mapRef, setMapRef] = useState(null);
    const stopDetails = location.state?.stopDetails || [];
    const tripType = location.state?.direction || "N/A";

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
  
    // const token = useSelector((state) => state.auth.token);
    // const sessionId = useSelector((state) => state.auth.sessionId);
    const [standardRoute, setStandardRoute] = useState([]);
    const [optimizedRoute, setOptimizedRoute] = useState([]);
    const [selectedRequests, setSelectedRequests] = useState([]);

    const token = localStorage.getItem('access_token');
    const sessionId = localStorage.getItem("session_id") || "bd1e7f30-12d3-4b56-92a3-bc46e2c84cda";
    localStorage.setItem("session_id", sessionId);
  
    
    // const extractCoordinates = (route) => {
    //     if (!route || typeof route !== "object") return [];
    //     if (route.stops && Array.isArray(route.stops)) {
    //       return route.stops.map((stop) => ({
    //         lat: parseFloat(stop.latitude),
    //         lng: parseFloat(stop.longitude),
    //       }));
    //     }
    //     if (route.start_address && route.end_address) {
    //       console.warn("⚠️ Маршрут отримано у форматі об'єкта, конвертуємо...");
    //       return [
    //         { lat: parseFloat(route.start_lat) || 50.4501, lng: parseFloat(route.start_lng) || 30.5234 },
    //         { lat: parseFloat(route.end_lat) || 50.4501, lng: parseFloat(route.end_lng) || 30.5234 },
    //       ];
    //     }
    //     return [];
    //   };
    

    
      // useEffect(() => {
      //   if (location.state) {
      //     console.log("\ud83d\udccc Отримані дані в RouteMapModal:", location.state);
    
      //     const newStandardRoute = extractCoordinates(location.state?.standardRoute);
      //     const newOptimizedRoute = extractCoordinates(location.state?.optimizedRoute);
    
      //     console.log("📌 Конвертований стандартний маршрут:", newStandardRoute);
      //     console.log("📌 Конвертований оптимізований маршрут:", newOptimizedRoute);
    
      //     if (newStandardRoute.length > 0) {
      //       setStandardRoute(newStandardRoute);
      //     }
      //     if (newOptimizedRoute.length > 0) {
      //       setOptimizedRoute(newOptimizedRoute);
      //     }
      //   }
      // }, [location.state]);
    
      // console.log("📌 Отримані дані після оновлення:", { standardRoute, optimizedRoute });
  
    const defaultCenter = standardRoute.length > 0 
      ? { lat: standardRoute[0].lat, lng: standardRoute[0].lng }
      : { lat: 49.8397, lng: 24.0297}; // Default Lviv

      useEffect(() => {
        if (!apiKey) {
          const fetchGoogleMapsKey = async () => {
            try {
              const response = await axios.get(API_ENDPOINTS.googleMapsKey);
              const data = response.data;
              setApiKey(data.google_maps_api_key);
              localStorage.setItem("google_maps_api_key", data.google_maps_api_key);
            } catch (error) {
              console.error(t("error_fetching_key"), error);
            }
          };
          fetchGoogleMapsKey();
        }
      }, [apiKey, t]);
      

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries,
  });
  useEffect(() => {
    if (requests.length > 0) {
      setSelectedRequests(requests);
    }
  }, [requests]);
  
  useEffect(() => {
    if (isLoaded && mapRef) {
      placeMarker();
    }
  }, [isLoaded, mapRef]);
  useEffect(() => {
    const fetchPassengerRequests = async () => {
      try {
        // 🔍 1. Логування перед запитом до тимчасового списку
        console.log("📡 Відправка запиту з Session-ID:", sessionId);
        console.log("📡 Відправка запиту з token:", token);
       


        // 2. Отримуємо тимчасовий список заявок
        const tempResponse = await axios.get(API_ENDPOINTS.getActiveTempList);


       
        console.log("📨 Відповідь з бекенду (повна):", tempResponse.data);
  
        const requestIds = tempResponse.data?.requests?.map((r) => r.id) || [];
  
        console.log("🗃️ ID заявок з тимчасового списку:", requestIds);
  
        if (requestIds.length === 0) {
          console.warn("⚠️ Тимчасовий список заявок порожній або відсутній.");
          setLoading(false);
          return;
        }
  
        // 🔍 3. Логування перед другим запитом
        console.log("📡 Отримуємо повні дані заявок з ids_include:", requestIds.join(","));
  
        // 4. Запит на отримання повних даних заявок
        const fullResponse = await axios.get(API_ENDPOINTS.getFilteredTripRequests, {
          headers: {
            "Session-ID": sessionId,  // 🔥 Обов'язково передати знову, якщо потрібно (залежить від BE)
          },
          params: {
            ids_include: requestIds.join(","),
          },
        });
  
        if (fullResponse.status === 200) {
          console.log("📦 Повні дані заявок за цим списком:", fullResponse.data);
          setRequests(fullResponse.data);
        }
      } catch (error) {
        console.error("❌ Помилка отримання заявок:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPassengerRequests();
  }, [token, sessionId]);
  
  if (loading) return <div>Loading...</div>;
  //  // Зчитуємо точки маршруту із sessionStorage
  // useEffect(() => {
  //   const filters = JSON.parse(sessionStorage.getItem("filters"));
  //   const storedRequests = filters?.requests || [];
  
  //   const coordinates = storedRequests
  //     .map((req) => {
  //       const lat = parseFloat(req.pickup_latitude);
  //       const lng = parseFloat(req.pickup_longitude);
  //       return !isNaN(lat) && !isNaN(lng) ? { lat, lng } : null;
  //     })
  //     .filter(Boolean);
  
  //   setStandardRoute(coordinates);
  // }, []);
  

  const handleExit = () => {
    const filters = JSON.parse(sessionStorage.getItem("filters"));
    const selectedRequests = filters?.requests || [];
  
    navigate("/passengers-grouping-view/grouping-list-to-route", {
      state: {
        from: "RouteMapModal",
        savedRequests: selectedRequests,
      },
    });
  };
  
  const handleSaveCoordinates = async () => {
    if (!coordinatePointId) {
      console.error(t("no_coordinate_point_id"));
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      const updatedCoordinates = {
        latitude: parseFloat(latitude.toFixed(6)),
        longitude: parseFloat(longitude.toFixed(6)),
      };

      await fetch(
        API_ENDPOINTS.updateCoordinates(coordinatePointId),
        updatedCoordinates,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCoordinates),
        }
      );

      alert(
        `${t("saved_coordinates")} - ${t("latitude")}: ${latitude}, ${t(
          "longitude"
        )}: ${longitude}`
      );
      navigate(-1);
    } catch (error) {
      console.error(t("error_saving_coordinates"), error);
      alert(t("failed_save_coordinates"));
    }
  };

  const onMarkerDragEnd = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setLatitude(newLat);
    setLongitude(newLng);
  };

  const centerMap = () => {
    if (mapRef) {
      mapRef.panTo({ lat: latitude, lng: longitude });
    }
  };

  const placeMarker = () => {
    if (mapRef) {
      const center = mapRef.getCenter();
      const lat = center.lat();
      const lng = center.lng();
      setMarkerPosition({ lat, lng });
    }
  };

  const setNewCoordinates = () => {
    if (markerPosition) {
      setLatitude(markerPosition.lat);
      setLongitude(markerPosition.lng);
    } else {
      alert(t("place_marker_first"));
    }
  };

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  if (!apiKey || !isLoaded) {
    return <p>{t("loading_google_maps")}</p>;
  }


  return (
    <div className="rmm-two-column-template">
      <div className="top-nav-bar">
        <div className="logo">
          <img src="/logo.png" alt={t("logo.alt")} />
        </div>
        <div className="nav-buttons">
          <button className="nav-button" onClick={handleExit}>
            {t("exit")}
          </button>
        </div>
      </div>
      <div className="rmm-template2s-content">
        <div className="rmm-map-verification" style={{ display: "flex" }}>
          <div
            className="sidebar"
            style={{
              width: "30%",
              padding: "10px",
              borderRight: "1px solid #ccc",
              height: "900px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start", // Вирівнює вміст по верхньому краю
              justifyContent: "flex-start", // Додатково фіксує вирівнювання
            }}

          >
            <h3>{t("user_route")}</h3>
          <h3>{t("direction")}: {tripType}</h3>
          <h3><strong>{t("start_address")}:</strong> {location.state?.standardRoute?.start_address}</h3>
          <h3><strong>{t("end_address")}:</strong> {location.state?.standardRoute?.end_address}</h3>
          <h3><strong>{t("total_distance")}:</strong> {location.state?.standardRoute?.total_distance} km</h3>
          <h3><strong>{t("total_duration")}:</strong> {location.state?.standardRoute?.total_duration} min</h3>
          <h3>{t("stop_details")}</h3>
          <ul>
            {stopDetails.map((stop, index) => (
              <li key={index}>
                <strong>{index + 1}. {tripType === "HOME_TO_WORK" ? t("pickup") : t("dropoff")}:</strong>
                {tripType === "HOME_TO_WORK"
                  ? `${stop.pickup_city}, ${stop.pickup_street}, ${stop.pickup_house}`
                  : `${stop.dropoff_city}, ${stop.dropoff_street}, ${stop.dropoff_house}`}
                <br />
                {stop.passenger_first_name} {stop.passenger_last_name}
              </li>
            ))}
          </ul>


 
          <h3>{t("optimized_route")}</h3>
          <ul>
  {Array.isArray(optimizedRoute) ? (
    optimizedRoute.map((point, index) => (
      <li key={index}>{`${index + 1}. ${point.lat}, ${point.lng}`}</li>
    ))
  ) : (
    <p>{t("no_route_data")}</p>
  )}
</ul>
           
            <button className="rmm-nav-button" onClick={centerMap}>
              {t("center_map")}
            </button>
            <button className="rmm-nav-button" onClick={placeMarker}>
              {t("place_marker")}
            </button>
            <button className="rmm-nav-button" onClick={setNewCoordinates}>
              {t("set_new_coordinates")}
            </button>
            <button className="rmm-nav-button" onClick={handleSaveCoordinates}>
              {t("save_coordinates")}
            </button>


          </div>
          <div
            className="rmm-map-container"
            style={{ width: "90%", position: "relative", height: "900px" }}
          >
            <div
              className="actions"
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                zIndex: 10,
                background: "#fff",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
              }}
            ></div>
            <GoogleMap mapContainerStyle={mapContainerStyle} center={defaultCenter} zoom={12}>
  {standardRoute.map((point, index) => (
    <Marker key={index} position={{ lat: point.lat, lng: point.lng }} title={`Точка ${index + 1}`} />
  ))}
  {optimizedRoute.map((point, index) => (
    <Marker key={`opt-${index}`} position={{ lat: point.lat, lng: point.lng }} 
      icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }} 
      title={`Оптимізована точка ${index + 1}`}
    />
  ))}
  <Polyline path={standardRoute} options={{ strokeColor: "red" }} />
  <Polyline path={optimizedRoute} options={{ strokeColor: "blue" }} />
  {selectedRequests.map((request, index) => {
  const fullName = `${request.passenger_first_name || ''} ${request.passenger_last_name || ''}`;
  const datetime = request.estimated_start_time
    ? new Date(request.estimated_start_time).toLocaleString()
    : t("no_time");
  const title = `${index + 1}. ${fullName.trim()}\n${datetime}`;

  return (
    <Marker
      key={`pickup-${index}`}
      position={{
        lat: parseFloat(request.pickup_latitude),
        lng: parseFloat(request.pickup_longitude),
      }}
      label={`${index + 1}`}
      title={title}
    />
  );
})}

{selectedRequests.map((request, index) => {
  const fullName = `${request.passenger_first_name || ''} ${request.passenger_last_name || ''}`;
  const datetime = request.estimated_end_time
    ? new Date(request.estimated_end_time).toLocaleString()
    : t("no_time");
  const title = `D${index + 1}. ${fullName.trim()}\n${datetime}`;

  return (
    <Marker
      key={`dropoff-${index}`}
      position={{
        lat: parseFloat(request.dropoff_latitude),
        lng: parseFloat(request.dropoff_longitude),
      }}
      label={`D${index + 1}`}
      icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
      title={title}
    />
  );
})}


</GoogleMap>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteMapModal;
