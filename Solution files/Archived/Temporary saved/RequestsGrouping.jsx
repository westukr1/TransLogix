import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './GroupingListToRoute.css';
import { useTranslation } from 'react-i18next';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import dayjs from "dayjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RequestsGrouping() {
    const { t } = useTranslation();
    const [filters, setFilters] = useState({});
    const [error, setError] = useState(null);
    const token = localStorage.getItem('access_token');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(startDate.getTime() + 24 * 60 * 60 * 1000));
    const [searchQuery, setSearchQuery] = useState('');
    const [allowExtendedInterval, setAllowExtendedInterval] = useState(false);
    const [allowMixedDirections, setAllowMixedDirections] = useState(false);
    const [directionFilter, setDirectionFilter] = useState('WORK_TO_HOME');
    const [showIncludedInList, setShowIncludedInList] = useState(false);
    const [showIncludedInRoute, setShowIncludedInRoute] = useState(false);
    const [filtersLoaded, setFiltersLoaded] = useState(false); // Новий прапор для уникнення зайвих записів
    const [passengerRequests, setPassengerRequests] = useState([]);
    const [onlyActive, setOnlyActive] = useState(false);
    

    const sessionId = localStorage.getItem("session_id") || "bd1e7f30-12d3-4b56-92a3-bc46e2c84cda";
    localStorage.setItem("session_id", sessionId);
  // Додано 10.03.2025
  const defaultFilters = {
    start_date: new Date().toISOString(),
    end_date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
    direction: "",
    show_in_route: false,
    show_included: false,
    allow_mixed_directions: false,
    allow_extended_interval: false,
  };
  const checkSavedFilters = useCallback(async () => {
    console.log("📤 Перевірка збережених фільтрів...");
    try {
        const response = await axios.get(`http://localhost:8000/api/temp-lists/get_active_list/`, {
            headers: { Authorization: `Bearer ${token}`, 'Session-ID': sessionId }
        });
        if (response.status === 200) {
            const data = response.data;
            console.log("✅ Отримано активний список фільтрів:", data);
            if (data.expires_at && new Date(data.expires_at) < new Date()) {
                console.warn("⚠️ Фільтри застаріли, встановлюємо дефолтні значення...");
                sessionStorage.setItem("filters", JSON.stringify(defaultFilters));
                await deleteExpiredFilters();
            } else {
                sessionStorage.setItem("filters", JSON.stringify(data.filter_params || defaultFilters));
            }
        }
    } catch (error) {
        console.error("❌ Помилка отримання списку фільтрів, встановлюємо дефолтні:", error);
        sessionStorage.setItem("filters", JSON.stringify(defaultFilters));
    }
}, [token, sessionId]);

// Додано 10.03.2025
const initiateFiltersFromStorage = useCallback(() => {
  const savedFilters = JSON.parse(sessionStorage.getItem("filters")) || defaultFilters;
  setStartDate(new Date(savedFilters.start_date));
  setEndDate(new Date(savedFilters.end_date));
  setAllowExtendedInterval(savedFilters.allow_extended_interval);
  setAllowMixedDirections(savedFilters.allow_mixed_directions);
  setShowIncludedInList(savedFilters.show_included);
  setShowIncludedInRoute(savedFilters.show_in_route);
  setOnlyActive(savedFilters.onlyActive || false);
  setDirectionFilter(savedFilters.direction);
  console.log("✅ Фільтри ініціалізовано зі сховища:", savedFilters);
}, []);

const saveFiltersInSessionStorage = useCallback(() => {
  const updatedFilters = {
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      allow_extended_interval: allowExtendedInterval,
      allow_mixed_directions: allowMixedDirections,
      show_included: showIncludedInList,
      show_in_route: showIncludedInRoute,
      onlyActive: onlyActive,
      direction: directionFilter,
  };
  sessionStorage.setItem("filters", JSON.stringify(updatedFilters));
  console.log("💾 Фільтри збережено у Session Storage:", updatedFilters);
}, [startDate, endDate, allowExtendedInterval, allowMixedDirections, showIncludedInList, showIncludedInRoute, onlyActive, directionFilter]);

const deleteExpiredFilters = useCallback(async () => {
  console.log("🗑️ Видаляємо застарілі фільтри з тимчасового сховища...");
  try {
      await axios.delete(`http://localhost:8000/api/temp-lists/delete_expired/`, {
          headers: { Authorization: `Bearer ${token}` }
      });
      console.log("✅ Застарілі фільтри видалено");
  } catch (error) {
      console.error("❌ Помилка видалення застарілих фільтрів:", error);
  }
}, [token]);
// Додано 10.03.2025
useEffect(() => {
  checkSavedFilters();
  initiateFiltersFromStorage();
}, []);
useEffect(() => {
  saveFiltersInSessionStorage();
}, [startDate, endDate, allowExtendedInterval, allowMixedDirections, showIncludedInList, showIncludedInRoute, onlyActive, directionFilter]);
// Додано 10.03.2025

const saveFiltersToBackend = useCallback(async () => {
  const updatedFilters = {
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      allow_extended_interval: allowExtendedInterval,
      allow_mixed_directions: allowMixedDirections,
      show_included: showIncludedInList,
      show_in_route: showIncludedInRoute,
      onlyActive: onlyActive,
      direction: directionFilter,
  };
  try {
      await axios.post(`http://localhost:8000/api/temp-lists/save_list/`, {
          session_id: sessionId,
          filter_params: updatedFilters,
      }, {
          headers: { Authorization: `Bearer ${token}` }
      });
      console.log("✅ Фільтри оновлено у тимчасовій таблиці на бекенді:", updatedFilters);
  } catch (error) {
      console.error("❌ Помилка оновлення фільтрів на бекенді:", error);
  }
}, [startDate, endDate, allowExtendedInterval, allowMixedDirections, showIncludedInList, showIncludedInRoute, onlyActive, directionFilter, token, sessionId]);

// Додано 10.03.2025

useEffect(() => {
  setFilters({
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString(),
    allow_extended_interval: allowExtendedInterval,
    allow_mixed_directions: allowMixedDirections,
    show_included: showIncludedInList,
    show_in_route: showIncludedInRoute,
    onlyActive: onlyActive,
    direction: directionFilter,
  });
}, [startDate, endDate, allowExtendedInterval, allowMixedDirections, showIncludedInList, showIncludedInRoute, onlyActive, directionFilter]);

useEffect(() => {
  if (filters) {
      console.log("📤 Виклик saveFiltersToBackend із новими фільтрами:", filters);
      saveFiltersToBackend();
  }
}, [filters]);


// Додано 10.03.2025

    const fetchFilters = useCallback(async () => {
        console.log("📤 Запит на отримання активного списку фільтрів...");
        try {
            const response = await axios.get(`http://localhost:8000/api/temp-lists/get_active_list/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Session-ID': sessionId
                }
            });
            
            if (response.status === 200) {
                console.log("✅ Отримано активний список фільтрів:", response.data);
               
                setStartDate(new Date(response.data.filter_params.start_date || new Date()));
                setEndDate(new Date(response.data.filter_params.end_date || new Date()));
                // setAllowExtendedInterval(response.data.filter_params.allow_extended_interval || false);
                // setAllowMixedDirections(response.data.filter_params.allow_mixed_directions || false);
                // setDirectionFilter(response.data.filter_params.direction || 'WORK_TO_HOME');
                // setShowIncludedInList(response.data.filter_params.show_included || false);
                // setShowIncludedInRoute(response.data.filter_params.show_in_route || false);
               
                setFilters(response.data.filter_params || {});
                setFiltersLoaded(true);
                setError(null);
            }
        } catch (error) {
            console.error("❌ Помилка отримання списку:", error);
            // setFilters({});
            // setError("Помилка з'єднання з сервером.");
        }
    }, [token, sessionId]);

    const handleFilterChange = (newFilters) => {
      setFilters((prevFilters) => ({
          ...prevFilters,
          ...newFilters
      }));
  
      // Оновлюємо фільтри на бекенді
      updateFilters({ 
          ...filters, 
          ...newFilters 
      });
  
      // Отримуємо новий список заявок після зміни фільтрів
      fetchPassengerRequests();
  };
  const handleDirectionChange = (newDirection) => {
    setDirectionFilter(newDirection);
    handleFilterChange({ direction: newDirection });
};


const updateFilters = useCallback(async (updatedFilters) => {
  console.log("📤 Відправляємо оновлення фільтрів:", updatedFilters);
  try {
      await axios.post(`http://localhost:8000/api/temp-lists/save_list/`, {
          session_id: sessionId,
          filter_params: updatedFilters,
      }, {
          headers: { Authorization: `Bearer ${token}` }
      });
      fetchPassengerRequests();
      
  } catch (error) {
      console.error("❌ Помилка оновлення фільтрів:", error);
  }
}, [token, sessionId]);
  
const fetchPassengerRequests = useCallback(async () => {
  if (!filters) {
      console.warn("⚠️ Фільтри ще не завантажені!");
      return;
  }
  
  const formatDate = (isoString) => dayjs(isoString).format("YYYY-MM-DD HH:mm:ss");
  
  console.log("📤 Використовуємо фільтри у запиті:", filters);
  
  const directionValue = filters.direction || '';
  console.log("📤 Відправка запиту на бекенд:", {
    included_in_list: "false",
    start_date: filters.start_date ? formatDate(filters.start_date) : '',
    end_date: filters.end_date ? formatDate(filters.end_date) : '',
    direction: filters.direction || '',
    search: searchQuery,
    is_active: onlyActive
});
    
      try {
          const response = await axios.get("http://localhost:8000/api/filtered-passenger-trip-requests/", {
              headers: {
                  Authorization: `Bearer ${token}`
              },
              params: {
                  included_in_list: "false",
                  start_date: filters.start_date ? formatDate(filters.start_date) : '',
                  end_date: filters.end_date ? formatDate(filters.end_date) : '',
                  direction: filters.direction || '',
                  search: searchQuery,
                  is_active: onlyActive
              }
          });
  
          if (response.status === 200) {
              console.log("✅ Отримані заявки пасажирів:", response.data);
              setPassengerRequests(response.data);
          }
      } catch (error) {
          console.error("❌ Помилка отримання заявок пасажирів:", error);
      }
  }, [token, filters]);
  
    // useEffect(() => {
    //     fetchPassengerRequests();
    // }, [fetchPassengerRequests]);

   

    
    // useEffect(() => {
    //     if (filtersLoaded) {
    //         updateFilters(); // Оновлюємо лише після першого завантаження
    //         fetchPassengerRequests(); // 🔄 Викликаємо запит заявок після збереження фільтрів
    //     }
    // }, [startDate, endDate, allowExtendedInterval, allowMixedDirections, directionFilter, showIncludedInList, showIncludedInRoute]);
    
    useEffect(() => {
      fetchFilters();
  }, []);

  useEffect(() => {
    if (filtersLoaded && filters && Object.keys(filters).length > 0) {
        console.log("🔄 Виклик fetchPassengerRequests після оновлення фільтрів:", filters);
        fetchPassengerRequests();
    }
}, [filtersLoaded]);

const handleStartDateChange = (date) => {
  if (!date || isNaN(date.getTime())) {
      console.warn("⚠️ Некоректна дата! Оновлення скасовано.");
      return;
  }

  setStartDate(date);

  if (!allowExtendedInterval) {
      setEndDate(new Date(date.getTime() + 24 * 60 * 60 * 1000));
  }

  // Оновлюємо фільтри після зміни дати
  setFilters(prevFilters => ({
      ...prevFilters,
      start_date: date.toISOString(),
      end_date: allowExtendedInterval ? prevFilters.end_date : new Date(date.getTime() + 24 * 60 * 60 * 1000).toISOString(),
  }));
};


const handleEndDateChange = (newDate) => {
  const updatedFilters = { ...filters, end_date: newDate.toISOString() };
  
  updateFilters(updatedFilters).then(() => {
      setFilters(updatedFilters);
  });
};


    const filteredRequests = passengerRequests.filter(request =>
        request.dropoff_city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.dropoff_street.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.passenger_first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.passenger_last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.passenger_phone.includes(searchQuery) ||
        request.pickup_city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.pickup_street.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleIsActiveChange = (id, value) => {
        const status = value ? t("activated") : t("deactivated");
    
        axios
          .patch(
            `http://localhost:8000/api/passenger-trip-requests/${id}/update-status/`,
            { is_active: value },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log("Updated is_active status:", response.data);
            fetchPassengerRequests(); // Оновлюємо список після зміни
            toast.success(t("Request {{status}} successfully.", { status }));
          })
          .catch((error) => {
            console.error("Error updating is_active status:", error);
            toast.error(t("Error during {{status}} of the request.", { status }));
          });
      };

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
        <div className="gltr-template2s-left-column">
        <div className="requests-grouping">
            <h2>{t("Temporary Passenger List")}</h2>
            <button onClick={fetchFilters}>🔄 {t("Update Filters")}</button>
            {error && <p className="error">⚠️ {error}</p>}
            
            <div className="filter-container">
                <label>{t("start_time")}</label>
                <input type="datetime-local" value={startDate.toISOString().slice(0, 16)}
                       onChange={(e) => handleStartDateChange(new Date(e.target.value))} className="form-control" />
                
                <label>{t("end_time")}</label>
                <input type="datetime-local" value={endDate.toISOString().slice(0, 16)}
                       onChange={(e) => handleEndDateChange(new Date(e.target.value))} className="form-control"
                       disabled={!allowExtendedInterval} />
                <input
                type="text"
                placeholder={t("Search..." )}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control"
                style={{ marginBottom: "10px" }}
             />
                <label>
                    <input type="checkbox" checked={allowExtendedInterval} 
                           onChange={(e) => setAllowExtendedInterval(e.target.checked)} />
                    {t("allow_extended_interval")}
                </label>
                
                <label>
                    <input type="checkbox" checked={allowMixedDirections} 
                           onChange={(e) => setAllowMixedDirections(e.target.checked)} />
                    {t("allow_mixed_directions")}
                </label>
                
                <label>
                    <input type="checkbox" checked={showIncludedInList} 
                           onChange={(e) => setShowIncludedInList(e.target.checked)} />
                    {t("show_included_in_list")}
                </label>
                
                <label>
                    <input type="checkbox" checked={showIncludedInRoute} 
                           onChange={(e) => setShowIncludedInRoute(e.target.checked)} />
                    {t("show_included_in_route")}
                </label>
                <label>
               <input
                  type="checkbox"
                  checked={onlyActive}
                  onChange={(e) => setOnlyActive(e.target.checked)}
               />
                {t("is_active_only")}
              </label>
              <div className="filters">
                <label>
                  <input
                    type="radio"
                    name="directionFilter"
                    checked={directionFilter === "WORK_TO_HOME"}
                    onChange={() => handleDirectionChange("WORK_TO_HOME")}

                  />
                 {t("to_home")}
                </label>
                <label>
                  <input
                    type="radio"
                    name="directionFilter"
                    checked={directionFilter === "HOME_TO_WORK"}
                    onChange={() => handleDirectionChange("HOME_TO_WORK")}

                 
                  />
                  {t("to_work")}
                </label>
                <label></label>
                {allowMixedDirections && (
                  <label>
                    <input
                     type="radio"
                      name="directionFilter"
                      checked={directionFilter === "ALL"}
                      onChange={() => setDirectionFilter("ALL")}
                    />
                   {t("show_all_requests")}
                  </label>
                )}
              </div>
            </div>
            <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                    rowData={filteredRequests}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
        </div>
        </div>
    );
}

export default RequestsGrouping;