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

  // Додано 14.03.2025
  const defaultFilters = {
    start_date: new Date().toISOString(),
    end_date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
    direction: "WORK_TO_HOME",
    show_in_route: false,
    show_included: false,
    allow_mixed_directions: false,
    allow_extended_interval: false,
    onlyActive: true,
  };

function RequestsGrouping() {
    const { t } = useTranslation();
    const [filters, setFilters] = useState(() => {
      const savedFilters = JSON.parse(sessionStorage.getItem("filters"));
      return savedFilters || defaultFilters;
  });
    const [error, setError] = useState(null);
    const token = localStorage.getItem('access_token');
    // чи потрібно це видалити?
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
    const [searchQuery, setSearchQuery] = useState('');
    // const [allowExtendedInterval, setAllowExtendedInterval] = useState(false);
    // const [allowMixedDirections, setAllowMixedDirections] = useState(false);
    const [directionFilter, setDirectionFilter] = useState('WORK_TO_HOME');
    // const [showIncludedInList, setShowIncludedInList] = useState(false);
    // const [showIncludedInRoute, setShowIncludedInRoute] = useState(false);
    // чи потрібно це видалити?
    const [filtersLoaded, setFiltersLoaded] = useState(false); // Новий прапор для уникнення зайвих записів
    const [passengerRequests, setPassengerRequests] = useState([]);
    const [onlyActive, setOnlyActive] = useState(true);
    
    const formatDate = (isoString) => dayjs(isoString).format("YYYY-MM-DD HH:mm:ss");
    const formatDateToCompareDay = (isoString) => dayjs(isoString).format("YYYY-MM-DD");

    const sessionId = localStorage.getItem("session_id") || "bd1e7f30-12d3-4b56-92a3-bc46e2c84cda";
    localStorage.setItem("session_id", sessionId);

    const checkSavedFilters = useCallback(async () => {
      console.log("📤 Перевірка збережених фільтрів...");
      const savedFilters = JSON.parse(sessionStorage.getItem("filters"));
      if (savedFilters && new Date(savedFilters.expires_at) > new Date()) {
          console.log("✅ Використовуємо збережені фільтри з Session Storage:", savedFilters);
          setFilters(savedFilters);
          setFiltersLoaded(true);
          return;
      }

      try {
          const response = await axios.get(`http://localhost:8000/api/temp-lists/get_active_list/`, {
              headers: { Authorization: `Bearer ${token}`, 'Session-ID': sessionId }
          });

          if (response.status === 200 && response.data.filter_params) {
              const backendFilters = response.data.filter_params;
              if (response.data.expires_at && new Date(response.data.expires_at) > new Date()) {
                  console.log("✅ Завантажено фільтри з бекенду:", backendFilters);
                  sessionStorage.setItem("filters", JSON.stringify(backendFilters));
                  setFilters(backendFilters);
              } else {
                  console.warn("⚠️ Немає збережених фільтрів на бекенді або вони застарілі, встановлюємо значення за замовчуванням.");
                  sessionStorage.setItem("filters", JSON.stringify(defaultFilters));
                  setFilters(defaultFilters);
              }
          }
      } catch (error) {
          console.error("❌ Помилка отримання фільтрів з бекенду, використовуємо значення за замовчуванням:", error);
          sessionStorage.setItem("filters", JSON.stringify(defaultFilters));
          setFilters(defaultFilters);
      }
      setFiltersLoaded(true);
  }, [token, sessionId]);

  
  const clearSavedFilters = useCallback(() => {
    console.log("🗑️ Очищення збережених фільтрів...");
    sessionStorage.removeItem("filters"); // Видаляємо збережені фільтри
    setFilters(defaultFilters); // Встановлюємо значення за замовчуванням
    console.log("✅ Фільтри очищено, встановлено значення за замовчуванням:", defaultFilters);
}, []);



const deleteExpiredFilters = useCallback(async () => {
  console.log("🗑️ Видаляємо застарілі фільтри з session storage і бекенду...");
  try {
      // Видаляємо фільтри з sessionStorage
      sessionStorage.removeItem("filters");

      // Видаляємо фільтри з бекенду
      await axios.delete(`http://localhost:8000/api/temp-lists/delete_expired/`, {
          headers: { Authorization: `Bearer ${token}` }
      });

      console.log("✅ Застарілі фільтри видалено з session storage і бекенду.");
  } catch (error) {
      console.error("❌ Помилка видалення застарілих фільтрів:", error);
  }
}, [token]);

// Додано 14.03.2025
useEffect(() => {
    checkSavedFilters().then(() => {
        // initiateFiltersFromStorage();
        setFiltersLoaded(true);
    });
}, []);



const saveFiltersToBackend = useCallback(async (updatedFilters) => {
  console.log("📤 Відправка оновлених фільтрів на бекенд:", updatedFilters);

  try {
    const filtersWithExpiration = {
      ...updatedFilters,
      expires_at: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString()
  };
      const response = await axios.post(`http://localhost:8000/api/temp-lists/save_list/`, {
          session_id: sessionId,
          filter_params: filtersWithExpiration,
      }, {
          headers: { Authorization: `Bearer ${token}` }
      });

      console.log("✅ Фільтри оновлено у тимчасовій таблиці на бекенді.", response.data);
  } catch (error) {
      console.error("❌ Помилка оновлення фільтрів на бекенді:", error.response?.data || error);
  }
}, [ token, sessionId]);

const saveFiltersInSessionStorage = useCallback(() => {
  const filtersWithExpiration = {
    ...filters,
    expires_at: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString()
};
  sessionStorage.setItem("filters", JSON.stringify(filtersWithExpiration));
  console.log("💾 Фільтри збережено у Session Storage:", filtersWithExpiration);
  saveFiltersToBackend(filtersWithExpiration);
}, [filters, saveFiltersToBackend]);



const fetchFilters = useCallback(async () => {
  console.log("📤 Оновлення списку фільтрів...");
  try {
      const response = await axios.get(`http://localhost:8000/api/temp-lists/get_active_list/`, {
          headers: { Authorization: `Bearer ${token}`, 'Session-ID': sessionId }
      });
      if (response.status === 200 && response.data.filter_params) {
          console.log("✅ Отримано фільтри з бекенду:", response.data.filter_params);
          sessionStorage.setItem("filters", JSON.stringify(response.data.filter_params));
          setFilters(response.data.filter_params);
          fetchPassengerRequests(); // Викликаємо отримання нових заявок після оновлення фільтрів
      } else {
          console.warn("⚠️ Немає збережених фільтрів, використовується дефолтний набір.");
          sessionStorage.setItem("filters", JSON.stringify(defaultFilters));
          setFilters(defaultFilters);
      }
  } catch (error) {
      console.error("❌ Помилка отримання фільтрів:", error);
      sessionStorage.setItem("filters", JSON.stringify(defaultFilters));
      setFilters(defaultFilters);
  }
}, [token, sessionId]);


const handleDirectionChange = (newDirection) => {
  if (!newDirection) return; // Запобігаємо встановленню порожнього значення

  setFilters((prevFilters) => {
    const updatedFilters = { ...prevFilters, direction: newDirection };
    sessionStorage.setItem("filters", JSON.stringify(updatedFilters));
    saveFiltersToBackend(updatedFilters);
    return updatedFilters;
  });

  setDirectionFilter(newDirection);
};



const fetchPassengerRequests = useCallback(async () => {
  let currentFilters = JSON.parse(sessionStorage.getItem("filters"));

  if (!currentFilters) {
      console.log("📤 Немає фільтрів у Session Storage. Виконуємо запит на бекенд...");
      try {
          const response = await axios.get(`http://localhost:8000/api/temp-lists/get_active_list/`, {
              headers: { Authorization: `Bearer ${token}`, 'Session-ID': sessionId }
          });
          if (response.status === 200 && response.data.filter_params) {
              console.log("✅ Отримано фільтри з бекенду:", response.data.filter_params);
              currentFilters = response.data.filter_params;
              sessionStorage.setItem("filters", JSON.stringify(currentFilters));
          } else {
              console.warn("⚠️ Немає фільтрів на бекенді, використовується дефолтний набір.");
              currentFilters = defaultFilters;
              sessionStorage.setItem("filters", JSON.stringify(defaultFilters));
          }
      } catch (error) {
          console.error("❌ Помилка отримання фільтрів з бекенду, встановлюємо дефолтні:", error);
          currentFilters = defaultFilters;
          sessionStorage.setItem("filters", JSON.stringify(defaultFilters));
      }
  }

 
  console.log("📤 Використовуємо фільтри у запиті:", currentFilters);
  
  let directionQuery = "";
  if (currentFilters.allow_mixed_directions && directionFilter === "ALL") {
      directionQuery = "HOME_TO_WORK,WORK_TO_HOME"; // Бекенд сприйме це як всі напрямки
  } else {
      directionQuery = currentFilters.direction || "";
  }

  try {
      const response = await axios.get("http://localhost:8000/api/filtered-passenger-trip-requests/", {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            included_in_list: "false",
            start_date: currentFilters.start_date ? formatDate(currentFilters.start_date) : '',
            end_date: currentFilters.end_date ? formatDate(currentFilters.end_date) : '',
            direction: directionQuery,
            search: '',
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
}, [token, sessionId, onlyActive, directionFilter]);

useEffect(() => {
  fetchPassengerRequests();
}, [filters]); // Викликаємо отримання заявок при зміні фільтрів



    
    useEffect(() => {
      if (filtersLoaded) {
          saveFiltersInSessionStorage(filters);
          fetchPassengerRequests();
      }
  }, [filters, filtersLoaded]);
  


  useEffect(() => {
    if (filtersLoaded && filters && Object.keys(filters).length > 0) {
        console.log("🔄 Виклик fetchPassengerRequests після оновлення фільтрів:", filters);
        fetchPassengerRequests();
    }
}, [filtersLoaded]);

useEffect(() => {
  if (filtersLoaded) {
      console.log("🔄 Виклик fetchPassengerRequests після першого завантаження фільтрів:", filters);
      fetchPassengerRequests();
  }
}, [filtersLoaded]); // Викликається лише після першого завантаження фільтрів

const handleStartDateChange = (date) => {
  if (!date || isNaN(date.getTime())) {
    console.warn("⚠️ Некоректна дата! Оновлення скасовано.");
    return;
  }

  setFilters((prevFilters) => {
    const updatedFilters = { ...prevFilters, start_date: date.toISOString() };

    if (!prevFilters.allow_extended_interval) {
      updatedFilters.end_date = new Date(date.getTime() + 24 * 60 * 60 * 1000).toISOString();
    }

    saveFiltersInSessionStorage(updatedFilters);
    return updatedFilters;
  });
};
                                                                       

const handleEndDateChange = (newDate) => {
  setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, end_date: newDate.toISOString() };
      saveFiltersInSessionStorage(updatedFilters);
      return updatedFilters;
  });
}

useEffect(() => {
  if (filters.start_date) {
    setStartDate(new Date(filters.start_date));
  }
  if (filters.end_date) {
    setEndDate(new Date(filters.end_date));
  }
}, [filters]);

const handleOnlyActiveChange = () => {
  setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, onlyActive: !prevFilters.onlyActive };
      sessionStorage.setItem("filters", JSON.stringify(updatedFilters)); // Зберігаємо в Session Storage
      saveFiltersToBackend(updatedFilters); // Зберігаємо на бекенді
      return updatedFilters;
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
      const handleShowInRouteChange = () => {
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters, show_in_route: !prevFilters.show_in_route };
            return updatedFilters;
        });
    };
    const handleShowIncludedChange = () => {
      setFilters((prevFilters) => {
          const updatedFilters = { ...prevFilters, show_included: !prevFilters.show_included };
          saveFiltersInSessionStorage(updatedFilters);
          return updatedFilters;
      });
  };
  const handleAllowMixedDirectionsChange = () => {
    setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters, allow_mixed_directions: !prevFilters.allow_mixed_directions };
        saveFiltersInSessionStorage(updatedFilters);
        return updatedFilters;
    });
};
const handleAllowExtendedIntervalChange = () => {
  setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, allow_extended_interval: !prevFilters.allow_extended_interval };
      if (!updatedFilters.allow_extended_interval) {
          updatedFilters.end_date = new Date(new Date(updatedFilters.start_date).getTime() + 24 * 60 * 60 * 1000).toISOString();
      }
      saveFiltersInSessionStorage(updatedFilters);
      return updatedFilters;
  });
};
const getRowStyle = (params) => {
  if (params.data.included_in_route) {
      return { color: 'green' };
  }
  if (params.data.included_in_list) {
      return { color: 'blue'};
  }
  const sameDayRequests = passengerRequests.filter(req => 
      req.passenger === params.data.passenger && 
      req.direction === params.data.direction &&

      req.is_active === true &&

      ((req.direction === "WORK_TO_HOME" && req.departure_time && params.data.departure_time && formatDateToCompareDay(req.departure_time) === formatDateToCompareDay(params.data.departure_time)) ||
      (req.direction === "HOME_TO_WORK" && req.arrival_time && params.data.arrival_time && formatDateToCompareDay(req.arrival_time) === formatDateToCompareDay(params.data.arrival_time)))
    );
  if (sameDayRequests.length > 1) {
      return { color: 'red'};
  }
  return {};
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
            <button className="nav-button" onClick={fetchFilters}>🔄 {t("Update Filters")}</button>
            {error && <p className="error">⚠️ {error}</p>}
            <button onClick={clearSavedFilters} className="nav-button">
                {t("clear_filters")}
            </button>

            <div className="filter-container">
                <label>{t("start_time")}</label>
                <input type="datetime-local" 
                value={filters.start_date ? new Date(filters.start_date).toISOString().slice(0, 16) : ""}
                onChange={(e) => handleStartDateChange(new Date(e.target.value))}
                className="form-control" />
                
                <label>{t("end_time")}</label>
                <input type="datetime-local"
                value={filters.end_date ? new Date(filters.end_date).toISOString().slice(0, 16) : ""}
                onChange={(e) => handleEndDateChange(new Date(e.target.value))}
                className="form-control"
                disabled={!filters.allow_extended_interval} />

                <input
                type="text"
                placeholder={t("Search..." )}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control"
                style={{ marginBottom: "10px" }}
             />
                <label>
                    <input  type="checkbox"
                    checked={filters.allow_extended_interval}
                    onChange={handleAllowExtendedIntervalChange} />
                    {t("allow_extended_interval")}
                </label>
                
                <label>
                    <input type="checkbox"
                    checked={filters.allow_mixed_directions}
                    onChange={handleAllowMixedDirectionsChange} />
                    {t("allow_mixed_directions")}
                </label>
                
                <label>
                    <input type="checkbox"
                    checked={filters.show_included}
                    onChange={handleShowIncludedChange} />
                    {t("show_included_in_list")}
                </label>
                
                <label>
                    <input type="checkbox"
                    checked={filters.show_in_route}
                    onChange={handleShowInRouteChange} />
                    {t("show_included_in_route")}
                </label>
                <label>
               <input
                   type="checkbox"
                   checked={filters.onlyActive}
                   onChange={handleOnlyActiveChange}
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
                {filters.allow_mixed_directions && (
                  <label>
                    <input
                     type="radio"
                      name="directionFilter"
                      checked={directionFilter === "ALL"}
                      onChange={() => handleDirectionChange("ALL")}
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
                    getRowStyle={getRowStyle}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
        </div>
        </div>
    );
}

export default RequestsGrouping;