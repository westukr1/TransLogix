import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

import axios from "../../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../../config/apiConfig";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import "./OrderedPassengerListDetails.css";
import OrderedPassengerListRouteMap from "./OrderedPassengerListRouteMap";

const formatDateTime = (value) =>
  value && dayjs(value).isValid() ? dayjs(value).format("YYYY-MM-DD HH:mm") : "-";

const OrderedPassengerListDetails = () => {
  const { listId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const initialList = location.state?.orderedList || null;

  const [listDetails, setListDetails] = useState(initialList);
  const [passengers, setPassengers] = useState(
    Array.isArray(initialList?.trip_requests) ? initialList.trip_requests : []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 120,
      flex: 1,
    }),
    []
  );

  const passengerColumnDefs = useMemo(
    () => [
      {
        headerName: t("sequence_number", { defaultValue: "Sequence" }),
        field: "sequence_number",
        maxWidth: 140,
        filter: "agNumberColumnFilter",
      },
      {
        headerName: t("request_id", { defaultValue: "Request ID" }),
        field: "id",
        maxWidth: 140,
        filter: "agNumberColumnFilter",
      },
      {
        headerName: t("passenger_first_name", { defaultValue: "First name" }),
        field: "passenger_first_name",
      },
      {
        headerName: t("passenger_last_name", { defaultValue: "Last name" }),
        field: "passenger_last_name",
      },
      {
        headerName: t("direction", { defaultValue: "Direction" }),
        field: "direction",
      },
      {
        headerName: t("departure_time", { defaultValue: "Departure" }),
        field: "departure_time",
        valueFormatter: ({ value }) => formatDateTime(value),
        filter: false,
        minWidth: 180,
      },
      {
        headerName: t("arrival_time", { defaultValue: "Arrival" }),
        field: "arrival_time",
        valueFormatter: ({ value }) => formatDateTime(value),
        filter: false,
        minWidth: 180,
      },
      {
        headerName: t("pickup_city", { defaultValue: "Pickup city" }),
        field: "pickup_city",
      },
      {
        headerName: t("pickup_street", { defaultValue: "Pickup street" }),
        field: "pickup_street",
      },
      {
        headerName: t("pickup_house", { defaultValue: "Pickup house" }),
        field: "pickup_house",
        maxWidth: 140,
      },
      {
        headerName: t("dropoff_city", { defaultValue: "Dropoff city" }),
        field: "dropoff_city",
      },
      {
        headerName: t("dropoff_street", { defaultValue: "Dropoff street" }),
        field: "dropoff_street",
      },
      {
        headerName: t("dropoff_house", { defaultValue: "Dropoff house" }),
        field: "dropoff_house",
        maxWidth: 140,
      },
      {
        headerName: t("passenger_phone", { defaultValue: "Passenger phone" }),
        field: "passenger_phone",
        minWidth: 180,
      },
      {
        headerName: t("comment", { defaultValue: "Comment" }),
        field: "comment",
        minWidth: 240,
        flex: 2,
      },
    ],
    [t]
  );

  useEffect(() => {
    if (!listId) {
      return;
    }

    const fetchListDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          API_ENDPOINTS.getOrderedPassengerListDetails(listId)
        );

        const details = response.data;
        setListDetails(details);
        setPassengers(Array.isArray(details?.trip_requests) ? details.trip_requests : []);
      } catch (err) {
        console.error("Failed to load ordered passenger list details", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListDetails();
  }, [listId]);

  const listSummary = useMemo(() => {
    if (!listDetails) {
      return null;
    }

    return {
      id: listDetails.id,
      direction: listDetails.direction,
      startTime: formatDateTime(listDetails.estimated_start_time),
      endTime: formatDateTime(listDetails.estimated_end_time),
      startCity: listDetails.start_city,
      endCity: listDetails.end_city,
      isActive: listDetails.is_active,
    };
  }, [listDetails]);

  return (
    <div className="ordered-passenger-list-details">
      <div className="ordered-passenger-list-details__header">
        <button
          type="button"
          className="ordered-passenger-list-details__back"
          onClick={() => navigate(-1)}
        >
          {t("back", { defaultValue: "Back" })}
        </button>
        <h1>{t("ordered_passenger_list_details", { defaultValue: "Ordered passenger list" })}</h1>
      </div>

      {listSummary && (
        <div className="ordered-passenger-list-details__summary">
          <div>
            <span className="ordered-passenger-list-details__label">
              {t("ID", { defaultValue: "ID" })}:
            </span>
            <span>{listSummary.id ?? "-"}</span>
          </div>
          <div>
            <span className="ordered-passenger-list-details__label">
              {t("direction", { defaultValue: "Direction" })}:
            </span>
            <span>{listSummary.direction || "-"}</span>
          </div>
          <div>
            <span className="ordered-passenger-list-details__label">
              {t("estimated_start_time", { defaultValue: "Start" })}:
            </span>
            <span>{listSummary.startTime}</span>
          </div>
          <div>
            <span className="ordered-passenger-list-details__label">
              {t("estimated_end_time", { defaultValue: "End" })}:
            </span>
            <span>{listSummary.endTime}</span>
          </div>
          <div>
            <span className="ordered-passenger-list-details__label">
              {t("start_city", { defaultValue: "Start city" })}:
            </span>
            <span>{listSummary.startCity || "-"}</span>
          </div>
          <div>
            <span className="ordered-passenger-list-details__label">
              {t("end_city", { defaultValue: "End city" })}:
            </span>
            <span>{listSummary.endCity || "-"}</span>
          </div>
          <div>
            <span className="ordered-passenger-list-details__label">
              {t("status", { defaultValue: "Status" })}:
            </span>
            <span>
              {listSummary.isActive === true
                ? t("active", { defaultValue: "Active" })
                : listSummary.isActive === false
                ? t("inactive", { defaultValue: "Inactive" })
                : "-"}
            </span>
          </div>
        </div>
      )}

      {loading && (
        <div className="ordered-passenger-list-details__status">
          {t("loading", { defaultValue: "Loading" })}...
        </div>
      )}

      {error && !loading && (
        <div className="ordered-passenger-list-details__status ordered-passenger-list-details__status--error">
          {t("error_loading_passenger_list", {
            defaultValue: "Failed to load ordered passenger list",
          })}
        </div>
      )}

      <div className="ordered-passenger-list-details__content">
        <div className="ordered-passenger-list-details__section ordered-passenger-list-details__table-section">
          <h2 className="ordered-passenger-list-details__section-title">
            {t("passenger_list", { defaultValue: "Passenger list" })}
          </h2>
          <div className="ordered-passenger-list-details__grid-wrapper">
            <div className="ag-theme-alpine ordered-passenger-list-details__grid">
              <AgGridReact
                rowData={passengers}
                columnDefs={passengerColumnDefs}
                defaultColDef={defaultColDef}
                suppressCellFocus
                overlayNoRowsTemplate={`<span class="ordered-passenger-list-details__empty">${t("no_data", { defaultValue: "No data available" })}</span>`}
              />
            </div>
          </div>
        </div>

        <div className="ordered-passenger-list-details__section ordered-passenger-list-details__map-section">
          <h2 className="ordered-passenger-list-details__section-title">
            {t("route_map", { defaultValue: "Route map" })}
          </h2>
          <div className="ordered-passenger-list-details__map-wrapper">
            <OrderedPassengerListRouteMap tripRequests={passengers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderedPassengerListDetails;
