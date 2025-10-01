import React, { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { GoogleMap, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";

import axios from "../../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../../config/apiConfig";

import "./OrderedPassengerListRouteMap.css";

const MAP_LIBRARIES = ["places"];
const MAP_CONTAINER_STYLE = { width: "100%", height: "100%" };
const DEFAULT_CENTER = { lat: 49.8397, lng: 24.0297 };

const parseCoordinate = (value) => {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const buildLatLng = (lat, lng) => {
  const parsedLat = parseCoordinate(lat);
  const parsedLng = parseCoordinate(lng);

  if (parsedLat === null || parsedLng === null) {
    return null;
  }

  return { lat: parsedLat, lng: parsedLng };
};

const OrderedPassengerListRouteMapContent = ({ apiKey, tripRequests }) => {
  const { t } = useTranslation();
  const { isLoaded, loadError } = useJsApiLoader({
    id: "ordered-passenger-list-route-map",
    googleMapsApiKey: apiKey,
    libraries: MAP_LIBRARIES,
  });

  const sortedRequests = useMemo(() => {
    if (!Array.isArray(tripRequests)) {
      return [];
    }

    return [...tripRequests].sort((a, b) => {
      const first = Number.isFinite(a?.sequence_number) ? a.sequence_number : Number.MAX_SAFE_INTEGER;
      const second = Number.isFinite(b?.sequence_number) ? b.sequence_number : Number.MAX_SAFE_INTEGER;

      return first - second;
    });
  }, [tripRequests]);

  const markers = useMemo(() => {
    if (!sortedRequests.length) {
      return [];
    }

    const canUseSymbols =
      isLoaded && typeof window !== "undefined" && window.google?.maps?.SymbolPath?.CIRCLE;

    return sortedRequests.flatMap((request, index) => {
      const displayIndex = Number.isFinite(request?.sequence_number)
        ? request.sequence_number
        : index + 1;

      const pickup = buildLatLng(request?.pickup_latitude, request?.pickup_longitude);
      const dropoff = buildLatLng(request?.dropoff_latitude, request?.dropoff_longitude);

      const markersForRequest = [];

      if (pickup) {
        markersForRequest.push({
          key: `pickup-${request?.id ?? displayIndex}`,
          position: pickup,
          label: `P${displayIndex}`,
          icon: canUseSymbols
            ? {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: "#10b981",
                fillOpacity: 1,
                strokeColor: "#064e3b",
                strokeWeight: 1,
              }
            : undefined,
        });
      }

      if (dropoff) {
        markersForRequest.push({
          key: `dropoff-${request?.id ?? displayIndex}`,
          position: dropoff,
          label: `D${displayIndex}`,
          icon: canUseSymbols
            ? {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: "#f97316",
                fillOpacity: 1,
                strokeColor: "#7c2d12",
                strokeWeight: 1,
              }
            : undefined,
        });
      }

      return markersForRequest;
    });
  }, [isLoaded, sortedRequests]);

  const path = useMemo(() => {
    if (!sortedRequests.length) {
      return [];
    }

    const points = [];

    sortedRequests.forEach((request) => {
      const pickup = buildLatLng(request?.pickup_latitude, request?.pickup_longitude);
      const dropoff = buildLatLng(request?.dropoff_latitude, request?.dropoff_longitude);

      if (pickup) {
        points.push(pickup);
      }

      if (dropoff) {
        points.push(dropoff);
      }
    });

    return points;
  }, [sortedRequests]);

  const center = useMemo(() => {
    if (path.length) {
      const { latSum, lngSum } = path.reduce(
        (acc, point) => ({ latSum: acc.latSum + point.lat, lngSum: acc.lngSum + point.lng }),
        { latSum: 0, lngSum: 0 }
      );

      return {
        lat: latSum / path.length,
        lng: lngSum / path.length,
      };
    }

    if (markers.length) {
      const { latSum, lngSum } = markers.reduce(
        (acc, marker) => ({
          latSum: acc.latSum + marker.position.lat,
          lngSum: acc.lngSum + marker.position.lng,
        }),
        { latSum: 0, lngSum: 0 }
      );

      return {
        lat: latSum / markers.length,
        lng: lngSum / markers.length,
      };
    }

    return DEFAULT_CENTER;
  }, [markers, path]);

  const handleMapLoad = useCallback(
    (mapInstance) => {
      if (!mapInstance || !window.google) {
        return;
      }

      if (markers.length === 0) {
        mapInstance.setCenter(center);
        mapInstance.setZoom(11);
        return;
      }

      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach((marker) => bounds.extend(marker.position));
      mapInstance.fitBounds(bounds, 32);
    },
    [center, markers]
  );

  if (loadError) {
    return (
      <div className="ordered-passenger-list-route-map__status ordered-passenger-list-route-map__status--error">
        {t("map_load_error", { defaultValue: "Unable to load map" })}
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="ordered-passenger-list-route-map__status">
        {t("loading", { defaultValue: "Loading" })}...
      </div>
    );
  }

  if (!markers.length) {
    return (
      <div className="ordered-passenger-list-route-map__status">
        {t("no_route_data", { defaultValue: "No route data available" })}
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={MAP_CONTAINER_STYLE}
      center={center}
      options={{
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        styles: [
          {
            elementType: "geometry",
            stylers: [{ color: "#1f2937" }],
          },
          {
            elementType: "labels.text.stroke",
            stylers: [{ color: "#1f2937" }],
          },
          {
            elementType: "labels.text.fill",
            stylers: [{ color: "#f9fafb" }],
          },
          {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [{ color: "#4b5563" }],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d1d5db" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#374151" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3f4f6" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#2563eb" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#111827" }],
          },
        ],
      }}
      onLoad={handleMapLoad}
    >
      {markers.map((marker) => (
        <Marker key={marker.key} position={marker.position} label={marker.label} icon={marker.icon} />
      ))}
      {path.length > 1 && (
        <Polyline
          path={path}
          options={{
            strokeColor: "#2563eb",
            strokeOpacity: 0.85,
            strokeWeight: 4,
          }}
        />
      )}
    </GoogleMap>
  );
};

OrderedPassengerListRouteMapContent.propTypes = {
  apiKey: PropTypes.string.isRequired,
  tripRequests: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const OrderedPassengerListRouteMap = ({ tripRequests }) => {
  const { t } = useTranslation();
  const [apiKey, setApiKey] = useState("");
  const [loadingKey, setLoadingKey] = useState(false);
  const [keyError, setKeyError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchKey = async () => {
      setLoadingKey(true);
      setKeyError(null);

      try {
        const response = await axios.get(API_ENDPOINTS.googleMapsKey);
        if (!isMounted) {
          return;
        }

        setApiKey(response.data?.google_maps_api_key || "");
      } catch (err) {
        if (!isMounted) {
          return;
        }

        console.error("Failed to load Google Maps key", err);
        setKeyError(err);
      } finally {
        if (isMounted) {
          setLoadingKey(false);
        }
      }
    };

    fetchKey();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loadingKey) {
    return (
      <div className="ordered-passenger-list-route-map__status">
        {t("loading", { defaultValue: "Loading" })}...
      </div>
    );
  }

  if (keyError || !apiKey) {
    return (
      <div className="ordered-passenger-list-route-map__status ordered-passenger-list-route-map__status--error">
        {t("map_key_error", { defaultValue: "Google Maps key is unavailable" })}
      </div>
    );
  }

  return <OrderedPassengerListRouteMapContent apiKey={apiKey} tripRequests={tripRequests} />;
};

OrderedPassengerListRouteMap.propTypes = {
  tripRequests: PropTypes.arrayOf(PropTypes.object),
};

OrderedPassengerListRouteMap.defaultProps = {
  tripRequests: [],
};

export default OrderedPassengerListRouteMap;
