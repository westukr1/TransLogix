
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

import axios from "../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../config/apiConfig";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./OrderedPassengerListsTable.css";

const FILTER_STORAGE_KEY = "orderedPassengerListsFilters";

const formatForDateTimeInput = (value) =>
  value ? dayjs(value).format("YYYY-MM-DDTHH:mm") : "";

const createDefaultFilters = () => {
  const startOfTomorrow = dayjs().add(1, "day").startOf("day");
  const endOfTomorrow = startOfTomorrow.endOf("day");

  return {
    direction: "",
    is_active: "",
    start_city: "",
    search_query: "",
    start_date: formatForDateTimeInput(startOfTomorrow),
    end_date: formatForDateTimeInput(endOfTomorrow),
  };
};

const readStoredFilters = () => {
  if (typeof window === "undefined") {
    return createDefaultFilters();
  }

  try {
    const storedValue = sessionStorage.getItem(FILTER_STORAGE_KEY);
    if (!storedValue) {
      return createDefaultFilters();
    }

    const parsedValue = JSON.parse(storedValue);
    return {
      ...createDefaultFilters(),
      ...parsedValue,
    };
  } catch (error) {
    console.error("Failed to read ordered passenger list filters from sessionStorage", error);
    return createDefaultFilters();
  }
};

const formatForRequest = (value) =>
  value && dayjs(value).isValid()
    ? dayjs(value).format("YYYY-MM-DD HH:mm:ss")
    : null;


const OrderedPassengerListsTable = forwardRef((_, ref) => {

  const { t } = useTranslation();

  const [filters, setFilters] = useState(() => readStoredFilters());
  const [orderedLists, setOrderedLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 120,
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  const dateValueFormatter = useMemo(
    () =>
      ({ value }) =>
        value && dayjs(value).isValid()
          ? dayjs(value).format("YYYY-MM-DD HH:mm")
          : "-",
    []
  );

  const statusValueFormatter = useMemo(
    () =>
      ({ value }) => {
        if (typeof value !== "boolean") {
          return "-";
        }
        return value
          ? t("active", { defaultValue: "Active" })
          : t("inactive", { defaultValue: "Inactive" });
      },
    [t]
  );

  const columnDefs = useMemo(
    () => [
      {
        headerName: t("ID", { defaultValue: "ID" }),
        field: "id",
        filter: "agNumberColumnFilter",
        maxWidth: 120,
      },
      {
        headerName: t("direction", { defaultValue: "Direction" }),
        field: "direction",
        filter: "agTextColumnFilter",
      },
      {
        headerName: t("estimated_start_time", { defaultValue: "Start time" }),
        field: "estimated_start_time",
        valueFormatter: dateValueFormatter,
        filter: false,
        minWidth: 180,
      },
      {
        headerName: t("estimated_end_time", { defaultValue: "End time" }),
        field: "estimated_end_time",
        valueFormatter: dateValueFormatter,
        filter: false,
        minWidth: 180,
      },
      {
        headerName: t("start_city", { defaultValue: "Start city" }),
        field: "start_city",
        valueFormatter: ({ value }) => value || "-",
      },
      {
        headerName: t("end_city", { defaultValue: "End city" }),
        field: "end_city",
        valueFormatter: ({ value }) => value || "-",
      },
      {
        headerName: t("start_passenger_last_name", {
          defaultValue: "Start passenger",
        }),
        field: "start_passenger_last_name",
        valueFormatter: ({ value }) => value || "-",
      },
      {
        headerName: t("end_passenger_last_name", {
          defaultValue: "End passenger",
        }),
        field: "end_passenger_last_name",
        valueFormatter: ({ value }) => value || "-",
      },
      {
        headerName: t("status", { defaultValue: "Status" }),
        field: "is_active",
        valueFormatter: statusValueFormatter,
        filter: "agSetColumnFilter",
      },
    ],
    [t, dateValueFormatter, statusValueFormatter]
  );

  const noRowsOverlayTemplate = useMemo(
    () =>
      `<span class="ordered-passenger-lists__empty">${t("no_data", {
        defaultValue: "No data available",
      })}</span>`,
    [t]
  );

  const filterRequestParams = useMemo(() => {
    const parsedIsActive =
      filters.is_active === ""
        ? null
        : filters.is_active === "true";

    return {
      estimated_start_time__gte: formatForRequest(filters.start_date),
      estimated_end_time__lte: formatForRequest(filters.end_date),
      direction: filters.direction || null,
      is_active: parsedIsActive,
      start_city__icontains: filters.start_city || null,
      search: filters.search_query || null,
    };
  }, [filters]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(filters));
    }
  }, [filters]);


  const fetchOrderedPassengerLists = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        API_ENDPOINTS.getOrderedPassengerLists,
        {
          params: filterRequestParams,
        }
      );

      const data = Array.isArray(response.data) ? response.data : [];
      setOrderedLists(data);
    } catch (err) {
      console.error("Failed to load ordered passenger lists", err);
      setError(err);
      setOrderedLists([]);
    } finally {
      setLoading(false);
    }
  }, [filterRequestParams]);

  useImperativeHandle(
    ref,
    () => ({
      refresh: fetchOrderedPassengerLists,
    }),
    [fetchOrderedPassengerLists]
  );

  useEffect(() => {
    fetchOrderedPassengerLists();
  }, [fetchOrderedPassengerLists]);


  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFilters((prev) => {
      const next = {
        ...prev,
        [name]: value,
      };

      if (name === "start_date" && value && prev.end_date) {
        const nextStart = dayjs(value);
        if (nextStart.isValid() && nextStart.isAfter(dayjs(prev.end_date))) {
          next.end_date = value;
        }
      }

      if (name === "end_date" && value && prev.start_date) {
        const nextEnd = dayjs(value);
        if (nextEnd.isValid() && nextEnd.isBefore(dayjs(prev.start_date))) {
          next.start_date = value;
        }
      }

      return next;
    });
  };

  const handleResetFilters = () => {
    setFilters(createDefaultFilters());
  };

  return (
    <div className="ordered-passenger-lists">
      <div className="ordered-passenger-lists__filters">
        <div className="ordered-passenger-lists__filter-group">

          <label htmlFor="start_date">
            {t("start_date", { defaultValue: "Start date" })}
          </label>
          <input
            id="start_date"
            type="datetime-local"
            name="start_date"
            value={filters.start_date}
            onChange={handleInputChange}
          />
        </div>

        <div className="ordered-passenger-lists__filter-group">
          <label htmlFor="end_date">
            {t("end_date", { defaultValue: "End date" })}
          </label>
          <input
            id="end_date"
            type="datetime-local"
            name="end_date"
            value={filters.end_date}
            onChange={handleInputChange}
          />

        </div>

        <div className="ordered-passenger-lists__filter-group">
          <label htmlFor="start_city">
            {t("start_city", { defaultValue: "Start city" })}
          </label>
          <input
            id="start_city"
            type="text"
            name="start_city"
            value={filters.start_city}
            onChange={handleInputChange}
            placeholder={t("enter_city", { defaultValue: "Enter city" })}
          />
        </div>

        <div className="ordered-passenger-lists__filter-group">
          <label htmlFor="search_query">
            {t("search", { defaultValue: "Search" })}
          </label>
          <input
            id="search_query"
            type="text"
            name="search_query"
            value={filters.search_query}
            onChange={handleInputChange}
            placeholder={t("search_passengers", { defaultValue: "Search passengers" })}
          />
        </div>

        <div className="ordered-passenger-lists__filter-group">

          <label htmlFor="direction">
            {t("direction", { defaultValue: "Direction" })}
          </label>
          <select
            id="direction"
            name="direction"
            value={filters.direction}
            onChange={handleInputChange}
          >
            <option value="">
              {t("all", { defaultValue: "All" })}
            </option>
            <option value="HOME_TO_WORK">
              {t("home_to_work", { defaultValue: "Home to Work" })}
            </option>
            <option value="WORK_TO_HOME">
              {t("work_to_home", { defaultValue: "Work to Home" })}
            </option>
          </select>
        </div>

        <div className="ordered-passenger-lists__filter-group">
          <label htmlFor="is_active">
            {t("status", { defaultValue: "Status" })}
          </label>
          <select
            id="is_active"
            name="is_active"
            value={filters.is_active}
            onChange={handleInputChange}
          >
            <option value="">
              {t("all", { defaultValue: "All" })}
            </option>
            <option value="true">
              {t("active", { defaultValue: "Active" })}
            </option>
            <option value="false">
              {t("inactive", { defaultValue: "Inactive" })}
            </option>
          </select>

        </div>

        <button style={{ backgroundColor: "black", color: "white", width: "180px", height: "30px", fontSize: "14px", marginLeft: "5px" }}
          type="button"
          className="ordered-passenger-lists__reset"
          onClick={handleResetFilters}
        >
          {t("reset_filters", { defaultValue: "Reset filters" })}
        </button>
        <button style={{ backgroundColor: "#007bff", width: "90px", height: "30px", fontSize: "14px", marginLeft: "5px" }}
              type="button"
              onClick={() => fetchOrderedPassengerLists.current?.refresh()}
              className="nav-button"
            >
              {t("refresh", { defaultValue: "Refresh" })}
            </button>
      </div>

      <div className="ordered-passenger-lists__table-wrapper">
        {loading && (
          <div className="ordered-passenger-lists__status">
            {t("loading", { defaultValue: "Loading" })}...
          </div>
        )}

        {error && !loading && (
          <div className="ordered-passenger-lists__status ordered-passenger-lists__status--error">
            {t("error_loading_passenger_lists", {
              defaultValue: "Failed to load ordered passenger lists",
            })}
          </div>
        )}

        {!error && (
          <div className="ag-theme-alpine ordered-passenger-lists__grid">
            <AgGridReact
              rowData={orderedLists}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              animateRows
              suppressCellFocus
              overlayNoRowsTemplate={noRowsOverlayTemplate}
            />
          </div>

        )}
      </div>
    </div>
  );

});

OrderedPassengerListsTable.displayName = "OrderedPassengerListsTable";


export default OrderedPassengerListsTable;
