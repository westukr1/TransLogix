import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import axios from "../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../config/apiConfig";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import "./PassengerList.css";

const DEFAULT_DIRECTION = "WORK_TO_HOME";

const formatDateForApi = (date) => dayjs(date).format("YYYY-MM-DD HH:mm:ss");

const FILTERS_STORAGE_KEY = "routeManager.passengerRequestsFilters";

export default function PassengerRequestsTable() {
  const { t } = useTranslation();

  const savedFilters = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const storedValue = localStorage.getItem(FILTERS_STORAGE_KEY);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      console.error("Failed to parse saved passenger request filters", error);
      return null;
    }
  }, []);

  const defaultStartDate = useMemo(() => dayjs().add(1, "day").startOf("day"), []);

  const [startDate, setStartDate] = useState(() => {
    if (savedFilters?.startDate && dayjs(savedFilters.startDate).isValid()) {
      return dayjs(savedFilters.startDate).toDate();
    }

    return defaultStartDate.toDate();
  });

  const [endDate, setEndDate] = useState(() => {
    if (savedFilters?.endDate && dayjs(savedFilters.endDate).isValid()) {
      return dayjs(savedFilters.endDate).toDate();
    }

    return defaultStartDate.add(1, "day").toDate();
  });

  const [allowExtendedInterval, setAllowExtendedInterval] = useState(
    savedFilters?.allowExtendedInterval ?? false
  );
  const [searchQuery, setSearchQuery] = useState(savedFilters?.searchQuery ?? "");
  const [directionFilter, setDirectionFilter] = useState(
    savedFilters?.directionFilter ?? DEFAULT_DIRECTION
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const payload = {
      startDate: dayjs(startDate).toISOString(),
      endDate: dayjs(endDate).toISOString(),
      allowExtendedInterval,
      searchQuery,
      directionFilter,
    };

    try {
      localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      console.error("Failed to persist passenger request filters", error);
    }
  }, [allowExtendedInterval, directionFilter, endDate, searchQuery, startDate]);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        start_date: formatDateForApi(startDate),
        end_date: formatDateForApi(endDate),
        search: searchQuery,
      };

      const response = await axios.get(API_ENDPOINTS.getFilteredTripRequests, {
        params,
      });

      if (Array.isArray(response.data)) {
        setRequests(response.data);
      } else {
        console.warn("Unexpected passenger requests payload", response.data);
        setRequests([]);
      }
    } catch (err) {
      console.error("Error fetching passenger requests:", err);
      setRequests([]);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [endDate, searchQuery, startDate]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchRequests();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [fetchRequests]);

  const handleStartDateChange = (date) => {
    if (!date) return;

    setStartDate(date);

    if (!allowExtendedInterval) {
      const adjustedEndDate = dayjs(date).add(1, "day").toDate();
      setEndDate(adjustedEndDate);
    }
  };

  const handleEndDateChange = (date) => {
    if (!date) return;
    setEndDate(date);
  };

  const toggleAllowExtendedInterval = () => {
    setAllowExtendedInterval((prev) => {
      const next = !prev;
      if (!next) {
        setEndDate(dayjs(startDate).add(1, "day").toDate());
      }
      return next;
    });
  };

  const filteredRequests = useMemo(() => {
    if (directionFilter === "ALL") {
      return requests;
    }

    return requests.filter((request) => request.direction === directionFilter);
  }, [directionFilter, requests]);

  const columnDefs = useMemo(
    () => [
      { headerName: t("request_id"), field: "id", maxWidth: 100 },
      {
        headerName: t("passenger_first_name"),
        field: "passenger_first_name",
        minWidth: 140,
      },
      {
        headerName: t("passenger_last_name"),
        field: "passenger_last_name",
        minWidth: 140,
      },
      {
        headerName: t("passenger_phone"),
        field: "passenger_phone",
        minWidth: 160,
      },
      {
        headerName: t("direction"),
        field: "direction",
        minWidth: 140,
        cellStyle: { fontWeight: "bold" },
      },
      {
        headerName: t("departure_info"),
        marryChildren: true,
        children: [
          {
            headerName: t("departure_time"),
            field: "departure_time",
            minWidth: 170,
            valueFormatter: (params) =>
              params.value ? dayjs(params.value).format("DD-MM-YYYY HH:mm") : "",
          },
          {
            headerName: t("pickup_city"),
            field: "pickup_city",
            minWidth: 120,
          },
          {
            headerName: t("pickup_street"),
            field: "pickup_street",
            minWidth: 160,
          },
          {
            headerName: t("pickup_house"),
            field: "pickup_house",
            maxWidth: 120,
          },
          {
            headerName: t("pickup_latitude"),
            field: "pickup_latitude",
            maxWidth: 140,
          },
          {
            headerName: t("pickup_longitude"),
            field: "pickup_longitude",
            maxWidth: 140,
          },
        ],
      },
      {
        headerName: t("arrival_info"),
        marryChildren: true,
        children: [
          {
            headerName: t("arrival_time"),
            field: "arrival_time",
            minWidth: 170,
            valueFormatter: (params) =>
              params.value ? dayjs(params.value).format("DD-MM-YYYY HH:mm") : "",
          },
          {
            headerName: t("dropoff_city"),
            field: "dropoff_city",
            minWidth: 120,
          },
          {
            headerName: t("dropoff_street"),
            field: "dropoff_street",
            minWidth: 160,
          },
          {
            headerName: t("dropoff_house"),
            field: "dropoff_house",
            maxWidth: 120,
          },
          {
            headerName: t("dropoff_latitude"),
            field: "dropoff_latitude",
            maxWidth: 140,
          },
          {
            headerName: t("dropoff_longitude"),
            field: "dropoff_longitude",
            maxWidth: 140,
          },
        ],
      },
      { headerName: t("passenger_id"), field: "passenger", maxWidth: 110 },
      {
        headerName: t("is_active"),
        field: "is_active",
        maxWidth: 120,
        valueFormatter: (params) =>
          params.value ? t("yes") : t("no"),
      },
      {
        headerName: t("comment"),
        field: "comment",
        minWidth: 260,
        flex: 1,
      },
    ],
    [t]
  );

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
    }),
    []
  );

  const overlayNoRowsTemplate = useMemo(
    () =>
      `<span class="ag-overlay-loading-center">${t(
        "no_passenger_requests",
        "No passenger requests match the current filters."
      )}</span>`,
    [t]
  );

  const overlayLoadingTemplate = useMemo(
    () =>
      `<span class="ag-overlay-loading-center">${t(
        "loading",
        "Loading..."
      )}</span>`,
    [t]
  );

  return (
    <div className="rm-passenger-list">
      <h3>{t("passenger_trip_requests", "Passenger requests")}</h3>
      <div className="passenger-requests-controls">
        <label htmlFor="passenger-request-search">{t("search_by_name")}</label>
        <input
          id="passenger-request-search"
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder={t("enter_name_or_last_name")}
        />

        <div className="date-range-picker">
          <div className="date-picker-field">
            <span>{t("start_date")}</span>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="dd.MM.yyyy HH:mm"
              className="date-picker-input"
            />
          </div>
          <div className="date-picker-field">
            <span>{t("end_date")}</span>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              minDate={startDate}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="dd.MM.yyyy HH:mm"
              className="date-picker-input"
              disabled={!allowExtendedInterval}
            />
          </div>
        </div>

        <div className="passenger-requests-options">
          <label>
            <input
              type="checkbox"
              checked={allowExtendedInterval}
              onChange={toggleAllowExtendedInterval}
            />
            {t("allow_extended_interval")}
          </label>
        </div>

        <div className="filters">
          <label>
            <input
              type="radio"
              name="directionFilter"
              checked={directionFilter === "WORK_TO_HOME"}
              onChange={() => setDirectionFilter("WORK_TO_HOME")}
            />
            {t("to_home")}
          </label>
          <label>
            <input
              type="radio"
              name="directionFilter"
              checked={directionFilter === "HOME_TO_WORK"}
              onChange={() => setDirectionFilter("HOME_TO_WORK")}
            />
            {t("to_work")}
          </label>
          <label>
            <input
              type="radio"
              name="directionFilter"
              checked={directionFilter === "ALL"}
              onChange={() => setDirectionFilter("ALL")}
            />
            {t("show_all_requests")}
          </label>
        </div>

        <div className="passenger-requests-status">
          <button type="button" onClick={fetchRequests} disabled={loading}>
            {t("refresh", "Refresh")}
          </button>
          <span>
            {t("total", "Total")}: {filteredRequests.length}
          </span>
          {loading && <span>{t("loading", "Loading...")}</span>}
        </div>
        {error && (
          <div className="passenger-requests-error">
            {t(
              "error_loading_requests",
              "Failed to load passenger requests."
            )}
          </div>
        )}
      </div>

      <div className="ag-theme-alpine" style={{ height: "420px", marginTop: "20px" }}>
        <AgGridReact
          rowData={filteredRequests}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination
          paginationPageSize={10}
          animateRows
          overlayNoRowsTemplate={overlayNoRowsTemplate}
          overlayLoadingTemplate={overlayLoadingTemplate}
          suppressCellFocus
        />
      </div>
    </div>
  );
}
