import { useState, useEffect } from "react";
import axios from "../../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../../config/apiConfig";
import RouteMapModal from "./RouteMapModal"; // або твоя карта

export default function RouteMapWrapper() {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const fetchKey = async () => {
      const res = await axios.get(API_ENDPOINTS.googleMapsKey);
      setApiKey(res.data.google_maps_api_key);
    };
    fetchKey();
  }, []);

  if (!apiKey) return <div>Loading key...</div>;

  return <RouteMapModal apiKey={apiKey} />;
}
