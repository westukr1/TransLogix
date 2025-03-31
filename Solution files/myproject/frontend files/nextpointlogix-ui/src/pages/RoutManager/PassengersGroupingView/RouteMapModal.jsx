import React, { useEffect, useState } from "react";
import { Route, useLocation, useNavigate } from "react-router-dom";
import { GoogleMap, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";
import "./RouteMapModal.css";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
    const initialLatitude = parseFloat(location.state?.latitude || 50.4501); // Default: Kyiv
    const initialLongitude = parseFloat(location.state?.longitude || 30.5234); // Default: Kyiv
    const [latitude, setLatitude] = useState(initialLatitude);
    const [longitude, setLongitude] = useState(initialLongitude);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [apiKey, setApiKey] = useState(
      localStorage.getItem("google_maps_api_key") || ""
    );
    const [mapRef, setMapRef] = useState(null);
    const stopDetails = location.state?.stopDetails || [];
    const tripType = location.state?.direction || "N/A";
    
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
    
      const [standardRoute, setStandardRoute] = useState([]);
      const [optimizedRoute, setOptimizedRoute] = useState([]);
    
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
    
      console.log("📌 Отримані дані після оновлення:", { standardRoute, optimizedRoute });
  
    const defaultCenter = standardRoute.length > 0 
      ? { lat: standardRoute[0].lat, lng: standardRoute[0].lng }
      : { lat: 50.4501, lng: 30.5234 }; // Default Kyiv

  useEffect(() => {
    if (!apiKey) {
      const fetchGoogleMapsKey = async () => {
        try {
          const token = localStorage.getItem("access_token");
          const response = await fetch(
            "http://localhost:8000/api/google-maps-key/",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const data = await response.json();
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
    if (isLoaded && mapRef) {
      placeMarker();
    }
  }, [isLoaded, mapRef]);
  
   // Зчитуємо точки маршруту із sessionStorage
  useEffect(() => {
    const filters = JSON.parse(sessionStorage.getItem("filters"));
    const storedRequests = filters?.requests || [];
  
    const coordinates = storedRequests
      .map((req) => {
        const lat = parseFloat(req.pickup_latitude);
        const lng = parseFloat(req.pickup_longitude);
        return !isNaN(lat) && !isNaN(lng) ? { lat, lng } : null;
      })
      .filter(Boolean);
  
    setStandardRoute(coordinates);
  }, []);
  

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
        `http://localhost:8000/api/coordinate-points/${coordinatePointId}/update-coordinates/`,
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
</GoogleMap>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteMapModal;
