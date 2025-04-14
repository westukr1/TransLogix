import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./PassengerTripRequestView.css";
import axios from "../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../config/apiConfig";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

const PassengerTripRequestView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  // 📅 Ініціалізація дат з фільтром по часу
  const [startDate, setStartDate] = useState(dayjs().startOf("day").toDate()); // Сьогодні 00:00
  const [endDate, setEndDate] = useState(
    dayjs().add(1, "day").endOf("day").toDate()
  ); // Завтра 23:59
  const [directionFilter, setDirectionFilter] = useState({
    toWork: true,
    toHome: true,
  });
  const [onlyActive, setOnlyActive] = useState(false);
  const formatDateToCompareDay = (isoString) => dayjs(isoString).format("YYYY-MM-DD");

  useEffect(() => {
    fetchRequests();
  }, [startDate, endDate, searchQuery, directionFilter, onlyActive]);

  const fetchRequests = async () => {
    const start = dayjs(startDate).format("YYYY-MM-DD HH:mm:ss");
    const end = dayjs(endDate).format("YYYY-MM-DD HH:mm:ss");
    const directions = [];
    if (directionFilter.toWork) directions.push("HOME_TO_WORK");
    if (directionFilter.toHome) directions.push("WORK_TO_HOME");
  
    console.log("Відправка запиту на бекенд:", {
      start_date: start,
      end_date: end,
      search: searchQuery,
      direction: directions.join(","),
      is_active: onlyActive,
    });
  
    try {
      const response = await axios.get(API_ENDPOINTS.getFilteredTripRequests, {
        params: {
          start_date: start,
          end_date: end,
          search: searchQuery,
          direction: directions.join(","),
          is_active: onlyActive,
        },
      });
  
      const data = response.data.map((request) => {
        const sameDayRequests = response.data.filter(
          (r) =>
            r.passenger === request.passenger &&
            r.direction === request.direction &&
            r.is_active === true &&
            ((r.direction === "WORK_TO_HOME" && r.departure_time && request.departure_time &&
              dayjs(r.departure_time).format("YYYY-MM-DD") ===
                dayjs(request.departure_time).format("YYYY-MM-DD")) ||
              (r.direction === "HOME_TO_WORK" && r.arrival_time && request.arrival_time &&
                dayjs(r.arrival_time).format("YYYY-MM-DD") ===
                  dayjs(request.arrival_time).format("YYYY-MM-DD")))
        );
  
        return {
          ...request,
          isConflict: sameDayRequests.length > 1,
        };
      });
      setRequests(data);
      console.log("Processed Passenger Trip Requests Data:", data);
    } catch (error) {
      console.error("Error fetching requests data:", error);
    }
  };

  // const handleViewModeChange = (mode) => {
  //   setViewMode(mode);
  //   if (mode === "yesterday_today_tomorrow") {
  //     const today = new Date();
  //     const yesterday = new Date(today);
  //     yesterday.setDate(today.getDate() - 1);
  //     const tomorrow = new Date(today);
  //     tomorrow.setDate(today.getDate() + 1);
  //     setStartDate(yesterday);
  //     setEndDate(tomorrow);
  //     fetchRequests();
  //   }
  // };

  // const handleStartDateChange = (date) => {
  //   if (date > endDate) {
  //     setEndDate(new Date(date.getTime() + 24 * 60 * 60 * 1000));
  //   }
  //   setStartDate(date);
  //   fetchRequests();
  // };

  // const handleEndDateChange = (date) => {
  //   if (date < startDate) {
  //     setStartDate(new Date(date.getTime() - 24 * 60 * 60 * 1000));
  //   }
  //   setEndDate(date);
  //   fetchRequests();
  // };
  const handleFilterChange = (filterName) => {
    setDirectionFilter((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };
  const handleIsActiveChange = (id, value) => {
    const status = value ? t("activated") : t("deactivated");
  
    axios
      .patch(
        API_ENDPOINTS.updateTripRequestStatus(id),
        { is_active: value }
      )
      .then((response) => {
        console.log("Updated is_active status:", response.data);
        fetchRequests();
        toast.success(t("Request {{status}} successfully.", { status }));
      })
      .catch((error) => {
        console.error("Error updating is_active status:", error);
        toast.error(t("Error during {{status}} of the request.", { status }));
      });
  };
  useEffect(() => {
    // Виклик функції для завантаження даних із фільтром
    fetchRequests();
  }, [directionFilter]);

  

  const columnDefs = [
    { headerName: t("request_id"), field: "id", width: 60 },
    {
      headerName: t("is_active"),
      field: "is_active",
      width: 60,
      cellRenderer: (params) => (
        <input
          type="checkbox"
          checked={params.value}
          onChange={(e) => {
            const isChecked = e.target.checked;
            const action = isChecked ? t("activate") : t("deactivate");

            if (
              window.confirm(
                t("Are you sure you want to {{action}} the request?", {
                  action,
                })
              )
            ) {
              handleIsActiveChange(params.data.id, isChecked);
            }
          }}
        />
      ),
    },
    {
      headerName: t("passenger_id"),
      field: "passenger",
      width: 50,
      cellStyle: (params) => {
        return params.data.isConflict ? { color: "red" } : {};
      },
    },
    {
      headerName: t("passenger_first_name"),
      field: "passenger_first_name",
      width: 70,
      cellStyle: (params) => {
        return params.data.isConflict ? { color: "red" } : {};
      },
    },
    {
      headerName: t("passenger_last_name"),
      field: "passenger_last_name",
      width: 100,
      cellStyle: (params) => {
        return params.data.isConflict ? { color: "red" } : {};
      },
    },
    {
      headerName: t("passenger_phone"),
      field: "passenger_phone",
      width: 130,
      cellStyle: (params) => {
        return params.data.isConflict ? { color: "red" } : {};
      },
    },
    {
      headerName: t("direction"),
      field: "direction",
      width: 120,
      cellStyle: { fontWeight: "bold" },
      cellStyle: (params) => {
        return params.data.isConflict ? { color: "red" } : {};
      },
    },

    {
      headerName: t("departure_info"), // 🔵 Блок ВІДПРАВКА
      children: [
        {
          headerName: t("departure_time"),
          cellStyle: { fontWeight: "bold" },
          field: "departure_time",
          width: 150,
          valueFormatter: (params) =>
            params.value ? dayjs(params.value).format("DD-MM-YYYY HH:mm") : "",
          cellStyle: (params) => {
            return params.data.isConflict ? { color: "red" } : {};
          },
        },
        {
          headerName: t("pickup_city"),
          cellStyle: { fontWeight: "bold" },
          field: "pickup_city",
          width: 100,
          cellStyle: (params) => {
            return params.data.isConflict ? { color: "red" } : {};
          },
        },
        {
          headerName: t("pickup_street"),
          field: "pickup_street",
          width: 150,
          cellStyle: (params) => {
            return params.data.isConflict ? { color: "red" } : {};
          },
        },
        {
          headerName: t("pickup_house"),
          field: "pickup_house",
          width: 60,
          cellStyle: (params) => {
            return params.data.isConflict ? { color: "red" } : {};
          },
        },
        {
          headerName: t("pickup_latitude"),
          field: "pickup_latitude",
          width: 80,
          cellStyle: (params) => {
            return params.data.isConflict ? { color: "red" } : {};
          },
        },
        {
          headerName: t("pickup_longitude"),
          field: "pickup_longitude",
          width: 80,
          cellStyle: (params) => {
            return params.data.isConflict ? { color: "red" } : {};
          },
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
          width: 150,
          valueFormatter: (params) =>
            params.value ? dayjs(params.value).format("DD-MM-YYYY HH:mm") : "",
          cellStyle: (params) => {
            return params.data.isConflict ? { color: "red" } : {};
          },
        },
        {
          headerName: t("dropoff_city"),
          cellStyle: { fontWeight: "bold" },
          field: "dropoff_city",
          width: 100,
          cellStyle: (params) => {
            return params.data.isConflict ? { color: "red" } : {};
          },
        },
        {
          headerName: t("dropoff_street"),
          field: "dropoff_street",
          width: 150,
          cellStyle: (params) => {
            return params.data.isConflict ? { color: "red" } : {};
          },
        },
        {
          headerName: t("dropoff_house"),
          field: "dropoff_house",
          width: 50,
          cellStyle: (params) => {
            return params.data.isConflict ? { color: "red" } : {};
          },
        },
        {
          headerName: t("dropoff_latitude"),
          field: "dropoff_latitude",
          width: 80,
          cellStyle: (params) => {
            return params.data.isConflict ? { color: "red" } : {};
          },
        },
        {
          headerName: t("dropoff_longitude"),
          field: "dropoff_longitude",
          width: 80,
          cellStyle: (params) => {
            return params.data.isConflict ? { color: "red" } : {};
          },
        },
      ],
    },

    { headerName: t("comment"), field: "comment", width: 600 },
  ];

  return (
    <div className="two-column-template">
      <div className="top-nav-bar">
        <div className="two-column-template-logo">
          <img src="/logo.png" alt="NextPointLogix" />
        </div>

        <div className="nav-buttons">
          <button className="nav-button" onClick={() => navigate("/")}>
            {t("nav.main_screen")}
          </button>
        </div>
      </div>
      <div className="template21-content">
        <div className="template21-left-column">
          <h2>{t("menu")}</h2>
          <button onClick={fetchRequests} className="nav-button">
            {t("update_table")}
          </button>
          <button
            className="nav-button"
            onClick={() => navigate("/passenger-select")}
          >
            {t("add_request")}
          </button>
        </div>
        <div
          className="ptrv-template21-right-column"
          style={{ height: "100vh" }}
        >
          <h1
            style={{
              color: "white",
              fontsize: "50%",
            }}
          >
            {" "}
            {t("trip_requests_from_passengers")}{" "}
          </h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <h3
              style={{
                color: "white",
                fontsize: "50%",
              }}
            >
              Data range from -
            </h3>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="dd-MM-yyyy"
              calendarClassName="custom-datepicker"
            />
            <h3
              style={{
                color: "white",
                fontsize: "50%",
              }}
            >
              {" "}
              - to -{" "}
            </h3>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="dd-MM-yyyy"
              calendarClassName="custom-datepicker"
            />
            <input
              type="text"
              placeholder={t("search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <label>
              <input
                type="checkbox"
                checked={directionFilter.toWork}
                onChange={() => handleFilterChange("toWork")}
              />
              {t("to_work")}
            </label>
            <label>
              <input
                type="checkbox"
                checked={directionFilter.toHome}
                onChange={() => handleFilterChange("toHome")}
              />
              {t("to_home")}
            </label>
            <label>
              <input
                type="checkbox"
                checked={onlyActive}
                onChange={(e) => setOnlyActive(e.target.checked)}
              />
              {t("is_active_only")}
            </label>
          </div>
          <AgGridReact
            className="ag-theme-alpine"
            rowData={requests}
            // getRowStyle={getRowStyle}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={10}
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default PassengerTripRequestView;
