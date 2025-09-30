import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

import axios from "../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../config/apiConfig";

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

const OrderedPassengerListsTable = () => {
  const { t } = useTranslation();

  const [filters, setFilters] = useState(() => readStoredFilters());
  const [orderedLists, setOrderedLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchOrderedPassengerLists = async () => {
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
    };

    fetchOrderedPassengerLists();
  }, [filterRequestParams]);

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

        <button
          type="button"
          className="ordered-passenger-lists__reset"
          onClick={handleResetFilters}
        >
          {t("reset_filters", { defaultValue: "Reset filters" })}
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

        {!loading && !error && (
          <table className="ordered-passenger-lists__table">
            <thead>
              <tr>
                <th>{t("ID", { defaultValue: "ID" })}</th>
                <th>{t("direction", { defaultValue: "Direction" })}</th>
                <th>{t("estimated_start_time", { defaultValue: "Start time" })}</th>
                <th>{t("estimated_end_time", { defaultValue: "End time" })}</th>
                <th>{t("start_city", { defaultValue: "Start city" })}</th>
                <th>{t("end_city", { defaultValue: "End city" })}</th>
                <th>{t("start_passenger_last_name", { defaultValue: "Start passenger" })}</th>
                <th>{t("end_passenger_last_name", { defaultValue: "End passenger" })}</th>
                <th>{t("status", { defaultValue: "Status" })}</th>
              </tr>
            </thead>
            <tbody>
              {orderedLists.length === 0 ? (
                <tr>
                  <td colSpan={9} className="ordered-passenger-lists__empty">
                    {t("no_data", { defaultValue: "No data available" })}
                  </td>
                </tr>
              ) : (
                orderedLists.map((list) => (
                  <tr key={list.id}>
                    <td>{list.id}</td>
                    <td>{list.direction}</td>
                    <td>
                      {list.estimated_start_time
                        ? dayjs(list.estimated_start_time).format("YYYY-MM-DD HH:mm")
                        : "-"}
                    </td>
                    <td>
                      {list.estimated_end_time
                        ? dayjs(list.estimated_end_time).format("YYYY-MM-DD HH:mm")
                        : "-"}
                    </td>
                    <td>{list.start_city || "-"}</td>
                    <td>{list.end_city || "-"}</td>
                    <td>{list.start_passenger_last_name || "-"}</td>
                    <td>{list.end_passenger_last_name || "-"}</td>
                    <td>
                      {typeof list.is_active === "boolean"
                        ? list.is_active
                          ? t("active", { defaultValue: "Active" })
                          : t("inactive", { defaultValue: "Inactive" })
                        : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderedPassengerListsTable;
