import React, { useEffect, useState , useRef,  useMemo} from "react";
import { Route, useLocation, useNavigate } from "react-router-dom";
import { GoogleMap, Marker, Polyline, useJsApiLoader,  DirectionsRenderer} from "@react-google-maps/api";
import { useTranslation } from "react-i18next";
import "./RouteMapModal.css";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from '../../../utils/axiosInstance'; // правильний шлях

import { useSelector } from 'react-redux';
import { API_ENDPOINTS } from '../../../config/apiConfig';

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";



dayjs.extend(utc);

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
  // const renderPolyline = () => {
  //   const routePath = [];

  //   if (selectedRequests?.length > 0) {
  //     const startLat = parseFloat(selectedRequests[0]?.pickup_latitude);
  //     const startLng = parseFloat(selectedRequests[0]?.pickup_longitude);
  //     if (!isNaN(startLat) && !isNaN(startLng)) {
  //       routePath.push({ lat: startLat, lng: startLng });
  //     }

  //     routePath.push(
  //       ...selectedRequests
  //         .slice()
  //         .sort((a, b) => (a.sequence_number || 0) - (b.sequence_number || 0))
  //         .map((req) => ({
  //           lat: !isNaN(parseFloat(req.dropoff_latitude)) ? parseFloat(req.dropoff_latitude) : 0,
  //           lng: !isNaN(parseFloat(req.dropoff_longitude)) ? parseFloat(req.dropoff_longitude) : 0,
  //         }))
  //         .filter((p) => !isNaN(p.lat) && !isNaN(p.lng))
  //     );
  //   }

  //   return routePath.length > 1 ? (
  //     <Polyline
  //       path={routePath}
  //       options={{
  //         strokeColor: "#008000",
  //         strokeOpacity: 0.8,
  //         strokeWeight: 4,
  //         zIndex: 1,
  //       }}
  //     />
  //   ) : null;
  // };
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
  
    const coordinatePointId = location.state?.coordinatePointId || null;
    const initialLatitude = parseFloat(location.state?.latitude || 49.8397); // Default: Lviv
    const initialLongitude = parseFloat(location.state?.longitude || 24.0297); // Default: Lviv
    const [latitude, setLatitude] = useState(initialLatitude);
    const [longitude, setLongitude] = useState(initialLongitude);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [apiKey, setApiKey] = useState("");
    const [isKeyLoaded, setIsKeyLoaded] = useState(false);
    const mapRef = useRef(null);
    const calledRef = useRef(false);

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
    const [directions, setDirections] = useState(null);
    const [selectedMarkerId, setSelectedMarkerId] = useState(null);


    const { isLoaded, loadError } = useJsApiLoader({
      id: "script-loader",
      googleMapsApiKey: apiKey,
      version: "weekly",
      libraries: ["places"],
      region: "US",
      language: "en",
    });
    useEffect(() => {
      if (!isLoaded || selectedRequests.length === 0) return;
  
      const origin = {
        lat: parseFloat(selectedRequests[0].pickup_latitude),
        lng: parseFloat(selectedRequests[0].pickup_longitude),
      };
  
      const sorted = [...selectedRequests].sort((a, b) => a.sequence_number - b.sequence_number);
  
      const destination = {
        lat: parseFloat(sorted[sorted.length - 1].dropoff_latitude),
        lng: parseFloat(sorted[sorted.length - 1].dropoff_longitude),
      };
  
      const waypoints = sorted.slice(0, -1).map((req) => ({
        location: {
          lat: parseFloat(req.dropoff_latitude),
          lng: parseFloat(req.dropoff_longitude),
        },
        stopover: true,
      }));
  
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination,
          waypoints,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error("❌ Directions request failed:", result);
          }
        }
      );
    }, [isLoaded, selectedRequests]);
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

     // Завантаження API ключа тільки з бекенду

  useEffect(() => {
    if (requests.length > 0) {
      setSelectedRequests(requests);
    }
  }, [requests]);
  

  useEffect(() => {
    if (calledRef.current) return; // ⛔️ вже викликано раніше
    calledRef.current = true;
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
            "Session-ID": sessionId,
          },
          params: {
            ids_include: requestIds.join(","),
          },
        });
  
        if (fullResponse.status === 200) {

                    // Об'єднуємо дані з тимчасового списку (sequence_number)
const sequenceMap = {};
(tempResponse.data.requests || []).forEach(req => {
  sequenceMap[req.id] = req.sequence_number;
});

const enrichedRequests = (fullResponse.data || []).map(item => ({
  ...item,
  sequence_number: sequenceMap[item.id] || null,
}));

const sortedRequests = enrichedRequests.sort((a, b) => a.sequence_number - b.sequence_number);
console.log("📦 Повні дані заявок за цим списком, додані порядкові номери:", sortedRequests);
setRequests(sortedRequests);
        }
      } catch (error) {
        console.error("❌ Помилка отримання заявок:", error);
  
        if (
          error.response &&
          error.response.status === 410 &&
          error.response.data &&
          error.response.data.conflicting_ids
        ) {
          const ids = error.response.data.conflicting_ids;
          alert(
            t("temporary_list_expired_due_to_conflict") +
            `\n${ids.map((id) => `• ${id}`).join("\n")}`
          );
        } else {
          alert(t("error_calculating_route"));
        }
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
    const savedFilters = JSON.parse(sessionStorage.getItem("filters"));
    if (
      savedFilters &&
      Array.isArray(savedFilters.requests) &&
      savedFilters.requests.length > 0
    ) {
      const first = savedFilters.requests[0];
      const lat = parseFloat(first.pickup_latitude);
      const lng = parseFloat(first.pickup_longitude);
  
      if (!isNaN(lat) && !isNaN(lng) && mapRef.current) {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(15); // Збільшуємо масштаб до 5
        console.log("📍 Центруємо мапу в точці першого пасажира:", lat, lng);
      } else {
        console.warn("⚠️ Некоректні координати або mapRef відсутній");
      }
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

  if (!isLoaded) return <div>{t("loading_google_maps")}</div>;
  const handleRowDragEnd = async (event) => {
    const updated = [...selectedRequests];
    const dragged = event.node.data;
    const fromIndex = updated.findIndex((r) => r.id === dragged.id);
    updated.splice(fromIndex, 1);
    updated.splice(event.overIndex, 0, dragged);
  
    const reordered = updated.map((item, index) => ({
      ...item,
      sequence_number: index + 1,
    }));
  
    setSelectedRequests(reordered);
  
    try {
      await axios.post(API_ENDPOINTS.updateTempListSequence, {
        requests: reordered.map((r) => ({ id: r.id, sequence_number: r.sequence_number })),
      });
      
      console.log("✅ Список оновлено на бекенді.");
    } catch (error) {
      console.error("❌ Помилка при оновленні списку:", error);
    }
  
    // Оновлення sessionStorage
    const filters = JSON.parse(sessionStorage.getItem("filters"));
    if (filters) {
      filters.requests = reordered;
      sessionStorage.setItem("filters", JSON.stringify(filters));
      console.log("💾 SessionStorage оновлено.");
    }
  };
  
  const handleRowDragEnter = () => {
    const ghost = document.querySelector(".ag-dnd-ghost");
    if (ghost) {
      ghost.style.display = "none";
    }
  };

  const columnDefs = [
        // {
        //   headerName: t("is_selected"),
        //   field: "is_selected",
        //   width: 50,
        //   cellRenderer: (params) => (
        //     <input
        //     type="checkbox"
        //     title="remove from the list"
        //     checked={true} // бо у правій таблиці завжди лише відібрані
        //     onChange={() => handleDeselect(params.data.id)} // ⬅ ось тут головне
        //     />
        //   ),
        // },
        // {
        //   headerName: t("status"),
        //   field: "status",
        //   width: 30,
        //   cellRenderer: (params) => {
        //     const { sequence_number } = params.data;
        //     const maxSequence = Math.max(
        //       ...selectedRequests.map((req) => req.sequence_number || 0)
        //     );
        //     if (sequence_number === 1) return t("start");
        //     if (sequence_number === maxSequence) return t("finish");
        //     return "";
        //   },
        // },
       
              
        
        // {
        //   headerName: t("№"),
        //   field: "№",
        //   cellRenderer: (params) => (
        //     <div style={{ display: "flex", alignItems: "center" }}>
        //       {/* <button onClick={() => handleReorder(params.data.id, "up")}>
        //         ⬆️
        //       </button> */}
        //       <span style={{ margin: "0 10px" }}>
        //         {params.data.sequence_number || "-"}
        //       </span>
        //       {/* <button onClick={() => handleReorder(params.data.id, "down")}>
        //         ⬇️
        //       </button> */}
        //     </div>
        //   ),
        //   width: 20,
        // },
        { headerName: t("request_id"), field: "id", width: 60 },
        {
          headerName: "#",
          field: "sequence_number",
          width: 60,
          rowDrag: true,
          rowDragText: (params) =>
            params?.data?.passenger_first_name
              ? `${params.data.passenger_first_name} ${params.data.passenger_last_name}`
              : "пасажир",
          cellRenderer: (params) => params?.data?.sequence_number || "",
        },
        {
          headerName: t("passenger_first_name"),
          field: "passenger_first_name",
          width: 70,
        },
        {
          headerName: t("passenger_last_name"),
          field: "passenger_last_name",
          width: 70,
        },
  
        {
          headerName: t("direction"),
          field: "direction",
          cellStyle: { fontWeight: "bold" },
          width: 120,
        },
  
        {
          headerName: t("departure_info"), // 🔵 Блок ВІДПРАВКА
          children: [
            {
              headerName: t("departure_time"),
              cellStyle: { fontWeight: "bold" },
              field: "departure_time",
              width: 120,
              valueFormatter: (params) =>
                params.value
                  ? dayjs(params.value).format("DD-MM-YYYY HH:mm")
                  : "",
            },
            {
              headerName: t("pickup_city"),
              cellStyle: { fontWeight: "bold" },
              field: "pickup_city",
              width: 70,
            },
            {
              headerName: t("pickup_street"),
              field: "pickup_street",
              width: 100,
            },
            {
              headerName: t("pickup_house"),
              field: "pickup_house",
              width: 40,
            },
            {
              headerName: t("pickup_latitude"),
              field: "pickup_latitude",
              width: 60,
            },
            {
              headerName: t("pickup_longitude"),
              field: "pickup_longitude",
              width: 60,
            },
          ],
        },
  
        {
          headerName: t("arrival_info"), // 🔵 Блок ПРИБУТТЯ
          children: [
            {
              headerName: t("arrival_time"),
              cellStyle: { fontWeight: "bold" },
              field: "arrival_time",
              width: 120,
              valueFormatter: (params) =>
                params.value
                  ? dayjs(params.value).format("DD-MM-YYYY HH:mm")
                  : "",
            },
            {
              headerName: t("dropoff_city"),
              cellStyle: { fontWeight: "bold" },
              field: "dropoff_city",
              width: 70,
            },
            {
              headerName: t("dropoff_street"),
              field: "dropoff_street",
              width: 100,
            },
            {
              headerName: t("dropoff_house"),
              field: "dropoff_house",
              width: 40,
            },
            {
              headerName: t("dropoff_latitude"),
              field: "dropoff_latitude",
              width: 70,
            },
            {
              headerName: t("dropoff_longitude"),
              field: "dropoff_longitude",
              width: 70,
            },
          ],
        },
        { headerName: t("passenger_id"), field: "passenger", width: 40 },
        {
          headerName: t("passenger_phone"),
          field: "passenger_phone",
          width: 120,
        },
        { headerName: t("is_active"), field: "is_active", width: 40 },
        { headerName: t("comment"), field: "comment", width: 600 },
      ];

  //     const routePath = tripType === "WORK_TO_HOME"
  // ? [
  //     // Початкова точка — робота
  //     {
  //       lat: parseFloat(selectedRequests[0].pickup_latitude),
  //       lng: parseFloat(selectedRequests[0].pickup_longitude),
  //     },
  //     // Всі крапки висадки
  //     ...selectedRequests
  //       .slice()
  //       .sort((a, b) => a.sequence_number - b.sequence_number)
  //       .map((req) => ({
  //         lat: parseFloat(req.dropoff_latitude),
  //         lng: parseFloat(req.dropoff_longitude),
  //       })),
  //   ]
  // : [
  //     // Всі крапки посадки
  //     ...selectedRequests
  //       .slice()
  //       .sort((a, b) => a.sequence_number - b.sequence_number)
  //       .map((req) => ({
  //         lat: parseFloat(req.pickup_latitude),
  //         lng: parseFloat(req.pickup_longitude),
  //       })),
  //     // Кінцева точка — робота
  //     {
  //       lat: parseFloat(selectedRequests[selectedRequests.length - 1].dropoff_latitude),
  //       lng: parseFloat(selectedRequests[selectedRequests.length - 1].dropoff_longitude),
  //     },
  //   ];
  
  const buildRoutePath = () => {
    if (!selectedRequests.length) return [];
    console.log("🧭 Вхідні selectedRequests:", selectedRequests);

    const origin = {
      lat: parseFloat(selectedRequests[0].pickup_latitude),
      lng: parseFloat(selectedRequests[0].pickup_longitude),
    };

    const dropoffs = selectedRequests
      .slice()
      .sort((a, b) => a.sequence_number - b.sequence_number)
      .map((r) => ({
        lat: parseFloat(r.dropoff_latitude),
        lng: parseFloat(r.dropoff_longitude),
      }));

    const route = [origin, ...dropoffs].filter(p => !isNaN(p.lat) && !isNaN(p.lng));

    console.log("🟢 Побудований маршрут:", route);
    return route;
  };
    console.log("🟢 Selected Requests:", selectedRequests);
    const handleRowClick = (event) => {
      const clickedId = event.data.id;
      setSelectedMarkerId(clickedId);
    };
     
 
    
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
           
            <button className="rmm-nav-button" onClick={centerMap }>
              {t("center_map")}
            </button>

            {/* <button className="rmm-nav-button" onClick={setNewCoordinates}>
              {t("set_new_coordinates")}
            </button>
            <button className="rmm-nav-button" onClick={handleSaveCoordinates}>
              {t("save_coordinates")}
            </button> */}

      <div className="ag-theme-alpine" style={{ height: 400, width: "100%", marginBottom: "1rem" }}>
 <AgGridReact
          rowData={selectedRequests}
          columnDefs={columnDefs}
          rowDragManaged={true}
          animateRows={true}
          pagination={false}
          getRowNodeId={(data) => data.id.toString()}
          onRowDragEnd={handleRowDragEnd}
          onRowDragEnter={handleRowDragEnter}
          onRowClicked={handleRowClick}
          suppressRowTransform={true}
          suppressMoveWhenRowDragging={true}
        />


      </div>

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
            {isLoaded && (
            <GoogleMap mapContainerStyle={mapContainerStyle} center={defaultCenter} zoom={12} onLoad={(map) => {
    mapRef.current = map;
    centerMap(); // 🔥 викликаємо тільки коли мапа точно ініціалізована
  }}>
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
        lat: !isNaN(parseFloat(request.pickup_latitude)) ? parseFloat(request.pickup_latitude) : 0,
        lng: !isNaN(parseFloat(request.pickup_longitude)) ? parseFloat(request.pickup_longitude) : 0,
      }}
      icon={{
        url: "/entrance 1 marker.png",
        scaledSize: new window.google.maps.Size(
          selectedMarkerId === request.id ? 160 : 80,
          selectedMarkerId === request.id ? 160 : 80
        ),
        labelOrigin: new window.google.maps.Point(40, -5), // 🔼 номер над іконкою
      }}
      label={{
        text: `+${index + 1}`,
        color: "black",
        fontSize: "24px",
        fontWeight: "bold",
      }}
      title={title}
    />
  );
})}

{selectedRequests.map((request, index) => {
  const fullName = `${request.passenger_first_name || ''} ${request.passenger_last_name || ''}`;
  const datetime = request.estimated_end_time
    ? new Date(request.estimated_end_time).toLocaleString()
    : t("no_time");
  const title = `${index + 1}. ${fullName.trim()}\n${datetime}`;

  return (
    <Marker
      key={`dropoff-${index}`}
      position={{
        lat: !isNaN(parseFloat(request.dropoff_latitude)) ? parseFloat(request.dropoff_latitude) : 0,
        lng: !isNaN(parseFloat(request.dropoff_longitude)) ? parseFloat(request.dropoff_longitude) : 0,
      }}
      icon={{
        url: "/exit marker.png",
        scaledSize: new window.google.maps.Size(
          selectedMarkerId === request.id ? 160 : 80,
          selectedMarkerId === request.id ? 160 : 80
        ),
        labelOrigin: new window.google.maps.Point(40, -5), // 🔼 номер над іконкою
      }}
      label={{
        text: `-${index + 1}`,
        color: "black",
        fontSize: "24px",
        fontWeight: "bold",
      }}
      title={title}
    />
  );
})}
{/* {renderPolyline()} */}


{/* {isLoaded && (
  <Polyline
    path={[
      { lat: 49.858920, lng: 24.033717 }, // Початок (робота)
      { lat: 49.828114, lng: 24.031219 }, // Стрийська
      { lat: 49.843251, lng: 24.039446 }, // Міклухо-Маклая
      { lat: 49.806058, lng: 24.004535 }, // Наукова
      { lat: 49.715483, lng: 23.905562 }, // Пустомити
    ]}
    options={{
      strokeColor: "#FF0000", // червона тестова лінія
      strokeOpacity: 0.8,
      strokeWeight: 5,
      zIndex: 100,
    }}
  />
)} */}
{/* <Polyline
            path={buildRoutePath()}
            options={{
              strokeColor: "#008000",
              strokeOpacity: 0.8,
              strokeWeight: 4,
              zIndex: 1000,
            }}
          /> */}
 {directions && <DirectionsRenderer directions={directions} />}
</GoogleMap>
 )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default RouteMapModal;
