import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";
import "./MapVerification.css";
import axios from "../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../config/apiConfig";
const libraries = ["places"];

const MapVerification = () => {
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

  useEffect(() => {
    if (!apiKey) {
      const fetchGoogleMapsKey = async () => {
        try {
          const response = await axios.get(API_ENDPOINTS.getGoogleMapsKey);
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
    if (isLoaded && mapRef) {
      placeMarker();
    }
  }, [isLoaded, mapRef]);

  const handleExit = () => {
    navigate(-1);
  };

  const handleSaveCoordinates = async () => {
    if (!coordinatePointId) {
      console.error(t("no_coordinate_point_id"));
      return;
    }
  
    try {
      const updatedCoordinates = {
        latitude: parseFloat(latitude.toFixed(6)),
        longitude: parseFloat(longitude.toFixed(6)),
      };
  
      await axios.put(
        API_ENDPOINTS.updateCoordinates(coordinatePointId),
        updatedCoordinates
      );
  
      alert(
        `${t("saved_coordinates")} - ${t("latitude")}: ${latitude}, ${t("longitude")}: ${longitude}`
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
    <div className="mv-two-column-template">
      <div className="mv-top-nav-bar">
        <div className="logo">
          <img src="/logo.png" alt={t("logo.alt")} />
        </div>
        <div className="nav-buttons">
          <button className="nav-button" onClick={handleExit}>
            {t("exit")}
          </button>
        </div>
      </div>
      <div className="mv-template2s-content">
        <div className="map-verification" style={{ display: "flex" }}>
          <div
            className="sidebar"
            style={{
              width: "10%",
              padding: "10px",
              borderRight: "1px solid #ccc",
              height: "900px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start", // Вирівнює вміст по верхньому краю
              justifyContent: "flex-start", // Додатково фіксує вирівнювання
            }}
          >
            <h3>{t("verification_coordinates")}</h3>
            <p>
              {t("latitude")}: {initialLatitude.toFixed(6)}
              <br />
              {t("longitude")}: {initialLongitude.toFixed(6)}
            </p>

            <h4>{t("marker_coordinates")}</h4>
            {markerPosition ? (
              <>
                <p>
                  {t("latitude")}: {markerPosition.lat.toFixed(6)} <br />
                  {t("longitude")}: {markerPosition.lng.toFixed(6)}
                </p>
              </>
            ) : (
              <p>{t("no_marker_placed")}</p>
            )}
            <button className="mv-nav-button" onClick={centerMap}>
              {t("center_map")}
            </button>
            <button className="mv-nav-button" onClick={placeMarker}>
              {t("place_marker")}
            </button>
            <button className="mv-nav-button" onClick={setNewCoordinates}>
              {t("set_new_coordinates")}
            </button>
            <button className="mv-nav-button" onClick={handleSaveCoordinates}>
              {t("save_coordinates")}
            </button>
          </div>
          <div
            className="map-container"
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
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={{ lat: latitude, lng: longitude }}
              zoom={15}
              options={{ fullscreenControl: false }}
              onLoad={(map) => setMapRef(map)}
            >
              <Marker
                position={{ lat: latitude, lng: longitude }}
                draggable={true}
                onDragEnd={onMarkerDragEnd}
              />
              {markerPosition && (
                <Marker
                  position={markerPosition}
                  draggable={true}
                  onDragEnd={(event) => {
                    const newLat = event.latLng.lat();
                    const newLng = event.latLng.lng();
                    setMarkerPosition({ lat: newLat, lng: newLng });
                  }}
                  title={t("draggable_marker")}
                />
              )}
            </GoogleMap>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapVerification;
