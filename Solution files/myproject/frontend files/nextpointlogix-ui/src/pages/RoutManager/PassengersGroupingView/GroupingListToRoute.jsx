import React, { useState, useEffect } from "react";
import "./GroupingListToRoute.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import dayjs from "dayjs";

const GroupingListToRoute = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const [startDate, setStartDate] = useState(tomorrow);
  const [endDate, setEndDate] = useState(
    new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000)
  );
  const [passengerData, setPassengerData] = useState([]);
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [allRequests, setAllRequests] = useState([]);
  const [unselectedRequests, setUnselectedRequests] = useState([]);
  const [selectedRequests, setSelectedRequests] = useState([]);

  const fetchRequests = () => {
    const start = dayjs(startDate).format("YYYY-MM-DD HH:mm:ss");
    const end = dayjs(endDate).format("YYYY-MM-DD HH:mm:ss");

    console.log("Відправка запиту на бекенд:", {
      start_date: start,
      end_date: end,
    });
    axios
      .get("http://localhost:8000/api/passenger-trip-requests/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
        params: {
          start_date: start,
          end_date: end,
          search: searchQuery,
        },
      })
      .then((response) => {
        const data = response.data.map((item) => ({
          ...item,
          is_selected: false,
        }));
        setAllRequests(data);
        setUnselectedRequests(data);
        setSelectedRequests([]); // Clear selected requests
      })
      .catch((error) => console.error("Error fetching requests data:", error));
  };

  useEffect(() => {
    fetchRequests();
  }, [startDate, endDate, searchQuery]);
  const handleSelect = (id) => {
    const selectedRequest = unselectedRequests.find((r) => r.id === id);
    if (selectedRequest) {
      setUnselectedRequests(unselectedRequests.filter((r) => r.id !== id));
      setSelectedRequests((prev) => [
        ...prev,
        {
          ...selectedRequest,
          is_selected: true,
          sequence_number: prev.length + 1,
        },
      ]);
    }
  };

  const handleDeselect = (id) => {
    const deselectedRequest = selectedRequests.find((r) => r.id === id);
    if (deselectedRequest) {
      setSelectedRequests(
        selectedRequests
          .filter((r) => r.id !== id)
          .map((req, index) => ({
            ...req,
            sequence_number: index + 1,
          }))
      );
      setUnselectedRequests([
        ...unselectedRequests,
        { ...deselectedRequest, is_selected: false, sequence_number: null },
      ]);
    }
  };

  const handleReorder = (id, direction) => {
    setSelectedRequests((prevRequests) => {
      const index = prevRequests.findIndex((r) => r.id === id);
      if (
        index === -1 ||
        (direction === "up" && index === 0) ||
        (direction === "down" && index === prevRequests.length - 1)
      ) {
        return prevRequests;
      }

      const newRequests = [...prevRequests];
      const [movedItem] = newRequests.splice(index, 1);
      newRequests.splice(
        direction === "up" ? index - 1 : index + 1,
        0,
        movedItem
      );
      return newRequests.map((req, idx) => ({
        ...req,
        sequence_number: idx + 1,
      }));
    });
  };

  // const toggleSelection = (id, selected) => {
  //   if (selected) {
  //     const request = requests.find((r) => r.id === id);
  //     if (request) {
  //       setRequests(requests.filter((r) => r.id !== id));
  //       setSelectedRequests([
  //         ...selectedRequests,
  //         { ...request, is_selected: true },
  //       ]);
  //     }
  //   } else {
  //     const request = selectedRequests.find((r) => r.id === id);
  //     if (request) {
  //       setSelectedRequests(selectedRequests.filter((r) => r.id !== id));
  //       setRequests([...requests, { ...request, is_selected: false }]);
  //     }
  //   }
  // };

  const createColumnDefs = (isLeft) => {
    console.log("isLeft:", isLeft); // Діагностика
    const columnDefs = [
      {
        headerName: t("is_selected"),
        field: "is_selected",
        width: 50,
        cellRenderer: (params) => (
          <input
            type="checkbox"
            checked={params.value}
            onChange={() =>
              isLeft
                ? handleSelect(params.data.id)
                : handleDeselect(params.data.id)
            }
          />
        ),
      },
      {
        headerName: t("sequence_number"),
        field: "sequence_number",
        cellRenderer: (params) =>
          params.data.sequence_number && !isLeft ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <button onClick={() => handleReorder(params.data.id, "up")}>
                ⬆️
              </button>
              <span style={{ margin: "0 10px" }}>
                {params.data.sequence_number}
              </span>
              <button onClick={() => handleReorder(params.data.id, "down")}>
                ⬇️
              </button>
            </div>
          ) : null,
        width: 120,
      },
      { headerName: t("request_id"), field: "id", width: 60 },
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
    return columnDefs.filter(Boolean); // Видаляє `undefined` колонки
  };
  return (
    <div className="gltr-two-column-template">
      <div className="top-nav-bar">
        <div className="logo">
          <img src="/logo.png" alt={t("logo.alt")} />
        </div>
        <h1 className="header-title">{t("grouping_list_to_route")}</h1>

        <div className="nav-buttons">
          <button className="nav-button" onClick={() => navigate("/")}>
            {t("nav.main_screen")}
          </button>
          <button className="nav-button" onClick={() => navigate(-1)}>
            {t("nav.back")}
          </button>
        </div>
      </div>
      <div className="gltr-template2s-content">
        {/* Left Column */}
        <div className="gltr-template2s-left-column">
          <div>
            <button className="nav-button">{t("save")}</button>
            <button onClick={fetchRequests} className="nav-button">
              {t("update_table")}
            </button>
            <button
              className="nav-button"
              onClick={() => navigate("/passenger-select")}
            >
              {t("add_request")}
            </button>
            <label>{t("search_by_name")}</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("enter_name_or_last_name")}
              className="form-control"
              style={{ marginBottom: "20px" }}
            />
            <div style={{ marginTop: "20px" }}>
              <label>{t("start_time")}</label>
              <input
                type="datetime-local"
                value={startDate.toISOString().slice(0, 16)}
                onChange={(e) => setStartDate(new Date(e.target.value))}
                className="form-control"
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <label>{t("end_time")}</label>
              <input
                type="datetime-local"
                value={endDate.toISOString().slice(0, 16)}
                onChange={(e) => setEndDate(new Date(e.target.value))}
                className="form-control"
              />
            </div>
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: "50%", marginTop: "20px" }}
          >
            <AgGridReact
              key={JSON.stringify(unselectedRequests)}
              rowData={unselectedRequests}
              columnDefs={[
                {
                  headerName: t("is_selected"),
                  field: "is_selected",
                  width: 50,
                  cellRenderer: (params) => (
                    <input
                      type="checkbox"
                      checked={params.value}
                      onChange={() => handleSelect(params.data.id)}
                    />
                  ),
                },

                { headerName: t("request_id"), field: "id", width: 60 },
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
                {
                  headerName: t("passenger_id"),
                  field: "passenger",
                  width: 40,
                },
                {
                  headerName: t("passenger_phone"),
                  field: "passenger_phone",
                  width: 120,
                },
                { headerName: t("is_active"), field: "is_active", width: 40 },
                { headerName: t("comment"), field: "comment", width: 600 },
              ]}
              pagination
              paginationPageSize={10}
            />
          </div>
        </div>
        {/* Right Column */}
        <div className="gltr-template2s-right-column">
          <div className="gltr-template2s-upper-right">
            <h1>{t("route_summary")}</h1>
            <h3>
              {t("direction")}: {t("work")} <strong>&#8226;</strong>{" "}
              {t("direction")}: Lviv → Drohobych <strong>&#8226;</strong>{" "}
              {t("distance")}: 100 km <strong>&#8226;</strong>{" "}
              {t("estimated_time")}: 2h <strong>&#8226;</strong>{" "}
              {t("start_time")}: 07:00 <strong>&#8226;</strong> {t("end_time")}:
              09:00 <strong>&#8226;</strong> {t("stop_count")}: 5{" "}
              <strong>&#8226;</strong> {t("passenger_count")}: 15{" "}
              <strong>&#8226;</strong> {t("status")}: {t("not_fixed")}
            </h3>
          </div>
          <div className="gltr-template2s-lower-right">
            <h2>{t("selected_passengers")}</h2>
            <div
              className="ag-theme-alpine"
              style={{ height: "50%", marginTop: "20px" }}
            >
              <AgGridReact
                key={JSON.stringify(selectedRequests)}
                rowData={selectedRequests}
                columnDefs={createColumnDefs(false)}
                pagination
                paginationPageSize={10}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupingListToRoute;
