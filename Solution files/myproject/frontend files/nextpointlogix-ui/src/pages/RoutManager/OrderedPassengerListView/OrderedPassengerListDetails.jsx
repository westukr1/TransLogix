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

const extractVehiclesFromDetails = (details) => {
  if (!details) {
    return [];
  }

  if (Array.isArray(details)) {
    return details;
  }

  const candidates = [
    details.transport_vehicles,
    details.vehicles,
    details.assigned_vehicles,
    details.assignedVehicles,
    details.transportVehicles,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }

  return [];
};

const extractDriversFromDetails = (details) => {
  if (!details) {
    return [];
  }

  if (Array.isArray(details)) {
    return details;
  }

  const candidates = [
    details.drivers,
    details.assigned_drivers,
    details.assignedDrivers,
    details.transport_drivers,
    details.transportDrivers,
    details.driverAssignments,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }

  return [];
};

const extractAvailableDriversFromDetails = (details) => {
  if (!details) {
    return { data: [], found: false };
  }

  const candidateKeys = [
    "available_drivers",
    "availableDrivers",
    "drivers_available_for_trip",
    "driversAvailableForTrip",
  ];

  for (const key of candidateKeys) {
    if (Object.prototype.hasOwnProperty.call(details, key)) {
      const value = details[key];

      if (Array.isArray(value)) {
        return { data: value, found: true };
      }

      return { data: [], found: true };
    }
  }

  return { data: [], found: false };
};

const parseBooleanLike = (value) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    if (value === 1) {
      return true;
    }

    if (value === 0) {
      return false;
    }
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["true", "1", "yes", "available", "active", "free"].includes(normalized)) {
      return true;
    }

    if (["false", "0", "no", "unavailable", "inactive", "busy"].includes(normalized)) {
      return false;
    }
  }

  return null;
};

const getDriverAvailabilityFromFields = (driver) => {
  if (!driver || typeof driver !== "object") {
    return null;
  }

  const availabilityFields = [
    "available_at_trip_time",
    "availableAtTripTime",
    "available_for_trip",
    "availableForTrip",
    "available_during_trip",
    "availableDuringTrip",
    "is_available_for_trip",
    "isAvailableForTrip",
    "is_available",
    "isAvailable",
    "available",
    "active",
    "is_active",
  ];

  for (const field of availabilityFields) {
    if (Object.prototype.hasOwnProperty.call(driver, field)) {
      const parsed = parseBooleanLike(driver[field]);
      if (parsed !== null) {
        return parsed;
      }
    }
  }

  if (typeof driver.status === "string") {
    const normalized = driver.status.trim().toLowerCase();
    if (["available", "active", "free"].includes(normalized)) {
      return true;
    }

    if (["busy", "unavailable", "inactive", "assigned"].includes(normalized)) {
      return false;
    }
  }

  return null;
};

const isDriverAvailableForTrip = (driver, details) => {
  const directAvailability = getDriverAvailabilityFromFields(driver);
  if (directAvailability !== null) {
    return directAvailability;
  }

  const availabilityWindows = driver?.availability_windows || driver?.availabilityWindows;

  if (
    Array.isArray(availabilityWindows) &&
    availabilityWindows.length > 0 &&
    details?.estimated_start_time &&
    details?.estimated_end_time
  ) {
    const tripStart = dayjs(details.estimated_start_time);
    const tripEnd = dayjs(details.estimated_end_time);

    if (tripStart.isValid() && tripEnd.isValid()) {
      return availabilityWindows.some((window) => {
        if (!window || typeof window !== "object") {
          return false;
        }

        const startCandidate =
          window.start ?? window.from ?? window.start_time ?? window.startTime;
        const endCandidate = window.end ?? window.to ?? window.end_time ?? window.endTime;

        const startMoment = startCandidate ? dayjs(startCandidate) : null;
        const endMoment = endCandidate ? dayjs(endCandidate) : null;

        if (startMoment?.isValid() && endMoment?.isValid()) {
          return (
            (startMoment.isBefore(tripStart) || startMoment.isSame(tripStart)) &&
            (endMoment.isAfter(tripEnd) || endMoment.isSame(tripEnd))
          );
        }

        if (startMoment?.isValid() && !endMoment) {
          return startMoment.isBefore(tripStart) || startMoment.isSame(tripStart);
        }

        if (!startMoment && endMoment?.isValid()) {
          return endMoment.isAfter(tripEnd) || endMoment.isSame(tripEnd);
        }

        return false;
      });
    }
  }

  return true;
};

const formatDateTime = (value) =>
  value && dayjs(value).isValid() ? dayjs(value).format("YYYY-MM-DD HH:mm") : "-";

const OrderedPassengerListDetails = () => {
  const { listId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const initialList = location.state?.orderedList || null;
  const initialAvailableDriversResult = extractAvailableDriversFromDetails(initialList);

  const [listDetails, setListDetails] = useState(initialList);
  const [passengers, setPassengers] = useState(
    Array.isArray(initialList?.trip_requests) ? initialList.trip_requests : []
  );
  const [vehicles, setVehicles] = useState(() => extractVehiclesFromDetails(initialList));
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

  const vehicleColumnDefs = useMemo(
    () => [
      {
        headerName: t("vehicle_id", { defaultValue: "ID" }),
        field: "vehicle_id",
        maxWidth: 140,
        filter: "agNumberColumnFilter",
      },
      {
        headerName: t("license_plate", { defaultValue: "License plate" }),
        field: "license_plate",
        minWidth: 160,
      },
      {
        headerName: t("make", { defaultValue: "Make" }),
        field: "make",
      },
      {
        headerName: t("model", { defaultValue: "Model" }),
        field: "model",
      },
      {
        headerName: t("year", { defaultValue: "Year" }),
        field: "year",
        maxWidth: 140,
        filter: "agNumberColumnFilter",
      },
      {
        headerName: t("capacity", { defaultValue: "Capacity" }),
        field: "capacity",
        maxWidth: 140,
        filter: "agNumberColumnFilter",
      },
      {
        headerName: t("fuel_type", { defaultValue: "Fuel type" }),
        field: "fuel_type",
        minWidth: 160,
        valueGetter: ({ data }) =>
          data?.fuel_type?.type ?? data?.fuel_type ?? "-",
      },
      {
        headerName: t("status", { defaultValue: "Status" }),
        field: "active",
        minWidth: 140,
        valueFormatter: ({ value }) => {
          if (value === true) {
            return t("active", { defaultValue: "Active" });
          }

          if (value === false) {
            return t("inactive", { defaultValue: "Inactive" });
          }

          return "-";
        },
      },
    ],
    [t]
  );

  const driverColumnDefs = useMemo(
    () => [
      {
        headerName: t("driver_id", { defaultValue: "Driver ID" }),
        field: "driver_id",
        maxWidth: 140,
        filter: "agNumberColumnFilter",
      },
      {
        headerName: t("last_name", { defaultValue: "Last name" }),
        field: "last_name",
      },
      {
        headerName: t("first_name", { defaultValue: "First name" }),
        field: "first_name",
      },
      {
        headerName: t("phone_number", { defaultValue: "Phone" }),
        field: "phone_number",
        minWidth: 160,
      },
      {
        headerName: t("email", { defaultValue: "Email" }),
        field: "email",
        minWidth: 200,
      },
      {
        headerName: t("license_number", { defaultValue: "License number" }),
        field: "license_number",
        minWidth: 180,
      },
      {
        headerName: t("status", { defaultValue: "Status" }),
        field: "active",
        minWidth: 160,
        valueFormatter: ({ data }) => {
          const availability = getDriverAvailabilityFromFields(data);
          if (availability === true) {
            return t("active", { defaultValue: "Active" });
          }

          if (availability === false) {
            return t("inactive", { defaultValue: "Inactive" });
          }

          if (typeof data?.status === "string" && data.status.trim().length > 0) {
            return data.status;
          }

          return "-";
        },
      },
    ],
    [t]
  );

  const driverRowData = useMemo(
    () => (driverFilter === "available" ? availableDrivers : drivers),
    [driverFilter, availableDrivers, drivers]
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
        setVehicles(extractVehiclesFromDetails(details));
        const extractedDrivers = extractDriversFromDetails(details);
        if (extractedDrivers.length) {
          setDrivers(extractedDrivers);
        }

        const availableDriversFromDetails = extractAvailableDriversFromDetails(details);
        setHasExplicitAvailableDrivers(availableDriversFromDetails.found);

        if (availableDriversFromDetails.found) {
          setAvailableDrivers(
            Array.isArray(availableDriversFromDetails.data)
              ? availableDriversFromDetails.data
              : []
          );
        } else {
          setAvailableDrivers([]);
        }
      } catch (err) {
        console.error("Failed to load ordered passenger list details", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListDetails();
  }, [listId]);

  useEffect(() => {
    if (hasExplicitAvailableDrivers) {
      return;
    }

    if (!drivers.length) {
      setAvailableDrivers((current) => (current.length ? [] : current));
      return;
    }

    const computedAvailableDrivers = drivers.filter((driver) =>
      isDriverAvailableForTrip(driver, listDetails)
    );

    setAvailableDrivers((current) => {
      if (
        current.length === computedAvailableDrivers.length &&
        current.every((item, index) => item === computedAvailableDrivers[index])
      ) {
        return current;
      }

      return computedAvailableDrivers;
    });
  }, [drivers, listDetails, hasExplicitAvailableDrivers]);

  useEffect(() => {
    let isMounted = true;

    const fetchDrivers = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.getDrivers);
        if (!isMounted) {
          return;
        }

        const driverData = Array.isArray(response.data) ? response.data : [];
        if (driverData.length) {
          setDrivers(driverData);
        }
      } catch (err) {
        console.error("Failed to load drivers", err);
      }
    };

    fetchDrivers();

    return () => {
      isMounted = false;
    };
  }, []);

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
                suppressBrowserResizeObserver
                overlayNoRowsTemplate={`<span class="ordered-passenger-list-details__empty">${t("no_data", { defaultValue: "No data available" })}</span>`}
              />
            </div>
          </div>
          <div className="ordered-passenger-list-details__vehicles">
            <h3 className="ordered-passenger-list-details__vehicles-title">
              {t("ordered_passenger_list_vehicles", {
                defaultValue: "Transport vehicles",
              })}
            </h3>
            <div className="ag-theme-alpine ordered-passenger-list-details__vehicles-grid">
              <AgGridReact
                rowData={vehicles}
                columnDefs={vehicleColumnDefs}
                defaultColDef={defaultColDef}
                suppressCellFocus
                suppressBrowserResizeObserver
                overlayNoRowsTemplate={`<span class="ordered-passenger-list-details__empty">${t("no_data", { defaultValue: "No data available" })}</span>`}
              />
            </div>
          </div>
          <div className="ordered-passenger-list-details__drivers">
            <div className="ordered-passenger-list-details__drivers-header">
              <h3 className="ordered-passenger-list-details__drivers-title">
                {t("ordered_passenger_list_drivers", { defaultValue: "Drivers" })}
              </h3>
              <label className="ordered-passenger-list-details__drivers-filter">
                <span className="ordered-passenger-list-details__drivers-filter-label">
                  {t("ordered_passenger_list_driver_filter_label", { defaultValue: "Show" })}
                </span>
                <select
                  className="ordered-passenger-list-details__drivers-filter-select"
                  value={driverFilter}
                  onChange={(event) =>
                    setDriverFilter(event.target.value === "available" ? "available" : "all")
                  }
                >
                  <option value="available">
                    {t("ordered_passenger_list_driver_filter_available", {
                      defaultValue: "Available for the trip",
                    })}
                  </option>
                  <option value="all">
                    {t("ordered_passenger_list_driver_filter_all", {
                      defaultValue: "All drivers",
                    })}
                  </option>
                </select>
              </label>
            </div>
            <div className="ag-theme-alpine ordered-passenger-list-details__drivers-grid">
              <AgGridReact
                rowData={driverRowData}
                columnDefs={driverColumnDefs}
                defaultColDef={defaultColDef}
                suppressCellFocus
                suppressBrowserResizeObserver
                overlayNoRowsTemplate={`<span class="ordered-passenger-list-details__empty">${t("no_data", { defaultValue: "No data available" })}</span>`}
              />
            </div>
          </div>
          <div className="ordered-passenger-list-details__vehicles">
            <h3 className="ordered-passenger-list-details__vehicles-title">
              {t("ordered_passenger_list_vehicles", {
                defaultValue: "Transport vehicles",
              })}
            </h3>
            <div className="ag-theme-alpine ordered-passenger-list-details__vehicles-grid">
              <AgGridReact
                rowData={vehicles}
                columnDefs={vehicleColumnDefs}
                defaultColDef={defaultColDef}
                suppressCellFocus
                overlayNoRowsTemplate={`<span class="ordered-passenger-list-details__empty">${t("no_data", { defaultValue: "No data available" })}</span>`}
              />
            </div>
          </div>
          <div className="ordered-passenger-list-details__actions">
            <button
              type="button"
              className="ordered-passenger-list-details__action-button ordered-passenger-list-details__action-button--secondary"
            >
              {t("ordered_passenger_list_disband", { defaultValue: "Розформувати" })}
            </button>
            <button
              type="button"
              className="ordered-passenger-list-details__action-button ordered-passenger-list-details__action-button--secondary"
            >
              {t("ordered_passenger_list_edit", { defaultValue: "Редагувати" })}
            </button>
            <button
              type="button"
              className="ordered-passenger-list-details__action-button ordered-passenger-list-details__action-button--primary"
            >
              {t("ordered_passenger_list_create_route", { defaultValue: "Створити Маршрут" })}
            </button>
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
