import React, { useState, useEffect, useCallback  } from "react";
import "./GroupingListToRoute.css";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "../../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../../config/apiConfig";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import OrderedPassengerList from "../OrderedPassengerListView/OrderedPassengerList";
import RouteComparisonModal from "./RouteComparisonModal";
import RouteMapModal from "./RouteMapModal"; 
import RequestsGrouping from './RequestsGrouping';



dayjs.extend(utc);

const GroupingListToRoute = (onRefreshRequests) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const tomorrow = dayjs()
    .add(1, "day")
    .startOf("day")
    .format("DD-MM-YYYY HH:mm");
  const endOfTomorrow = dayjs()
    .add(1, "day")
    .endOf("day")
    .format("DD-MM-YYYY HH:mm");

  const [startDate, setStartDate] = useState(
    dayjs().add(1, "day").startOf("day")
  );
  const [endDate, setEndDate] = useState(dayjs().add(2, "day").startOf("day"));

  const userLanguage = localStorage.getItem("i18nextLng") || "en"; // Задайте за замовчуванням "en"
  
  const [passengerData, setPassengerData] = useState([]);
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [allRequests, setAllRequests] = useState([]);
  const [unselectedRequests, setUnselectedRequests] = useState([]);
  // const [selectedRequests, setSelectedRequests] = useState([]);
  
  const [directionFilter, setDirectionFilter] = useState("WORK_TO_HOME");
  const [allowMixedDirections, setAllowMixedDirections] = useState(false);
  const [allowExtendedInterval, setAllowExtendedInterval] = useState(false);
  const [showAllRequests, setShowAllRequests] = useState(false);
  const [routeSettings, setRouteSettings] = useState(null);
  const [showIncludedInList, setShowIncludedInList] = useState(false);
  const [showIncludedInRoute, setShowIncludedInRoute] = useState(false);
  const [isRouteCalculated, setIsRouteCalculated] = useState(false);
  const [passengerLists, setPassengerLists] = useState([]);

  const [selectedListDetails, setSelectedListDetails] = useState(null);
  const [selectedListPassengers, setSelectedListPassengers] = useState([]);
  const [modalData, setModalData] = useState({ show: false });
  const [showMapModal, setShowMapModal] = useState(false);
  const [violationModal, setViolationModal] = useState({ show: false, violations: [] });

  const [standardRoute, setStandardRoute] = useState([]);
  const [optimizedRoute, setOptimizedRoute] = useState([]);
  const stopDetails = location.state?.stopDetails || [];
  const token = localStorage.getItem('access_token'); 
  const [passengerRequests, setPassengerRequests] = useState({ left: [], right: [] });
  const [filters, setFilters] = useState(JSON.parse(sessionStorage.getItem("filters")) || {});
  const [availableRequests, setAvailableRequests] = useState([]);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const sessionId = localStorage.getItem("session_id") || "bd1e7f30-12d3-4b56-92a3-bc46e2c84cda";
  localStorage.setItem("session_id", sessionId);
 
  
 useEffect(() => {
  const storedFilters = JSON.parse(sessionStorage.getItem("filters"));
  
  if (Array.isArray(storedFilters?.requests) && storedFilters.requests.length > 0) {
    setSelectedRequests(storedFilters.requests);
    setPassengerRequests(prev => ({
      ...prev,
      right: storedFilters.requests,
    }));
    console.log("🔁 Відновлено заявки з sessionStorage:", storedFilters.requests);
  } else {
    console.warn("⚠️ storedFilters.requests не є масивом або порожній:", storedFilters?.requests);
    setSelectedRequests([]);  // Додатково - очистити якщо помилковий тип
  }

  const stored = sessionStorage.getItem("savedPassengerListFilters");
  if (stored) {
    const parsed = JSON.parse(stored);
    if (parsed.start_date) setStartDate(dayjs(parsed.start_date));
    if (parsed.end_date) setEndDate(dayjs(parsed.end_date));
    setFilters(parsed);
    console.log("🔁 Відновлено фільтри для списків з sessionStorage:", parsed);
  }
}, []);

  
  
  useEffect(() => {
    const stored = sessionStorage.getItem("savedPassengerListFilters");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.start_date) {
        setStartDate(dayjs(parsed.start_date));
      }
      if (parsed.end_date) {
        setEndDate(dayjs(parsed.end_date));
      }
      setFilters(parsed);
      console.log("🔁 Відновлено фільтри для списків з sessionStorage:", parsed);
    }
  }, []);
  
  const syncSelectedRequests = (updatedRequests) => {
    // Зберігаємо у sessionStorage окремо (для логів, якщо потрібно)
    sessionStorage.setItem("selectedRequests", JSON.stringify(updatedRequests));
  
    // Отримуємо фільтри з sessionStorage
    const storedFilters = JSON.parse(sessionStorage.getItem("filters")) || {};
  
    // Формуємо заявки у форматі з sequence_number
    const formattedRequests = updatedRequests.map((request, index) => ({
      id: request.id,
      sequence_number: index + 1,
      pickup_latitude: request.pickup_latitude || "0.000000",
      pickup_longitude: request.pickup_longitude || "0.000000"
    }));
  
    const updatedFilters = {
      ...storedFilters,
      requests: formattedRequests
    };
  
    // Зберігаємо назад у sessionStorage
    sessionStorage.setItem("filters", JSON.stringify(updatedFilters));
  
    // [Optional] - Виводимо в консоль для налагодження
    console.log("🧩 Синхронізовано selectedRequests та filters.requests:", updatedFilters.requests);
  };
  

// 2️⃣ Отримання заявок пасажирів (фільтрованих)
// useEffect(() => {
//   fetchPassengerRequests();handleIsActiveChange
// }, [filters]);
const fetchPassengerRequests = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.getFilteredTripRequests);
      if (response.ok) {
          const data = await response.json();
          setPassengerRequests(data);
      }
  } catch (error) {
      console.error("❌ Error fetching requests data:", error);
  }
};


// 3️⃣ Отримання повної інформації про заявки із тимчасового списку
// const fetchSelectedRequests = useCallback(async (selectedRequestIds) => {
//   if (!selectedRequestIds || selectedRequestIds.length === 0) {
//       console.log("⚠️ Тимчасовий список порожній.");
//       return;
//   }

//   console.log("📤 Запит на отримання повної інформації про заявки:", selectedRequestIds);

//   try {
//       const response = await axios.post(
//           "http://localhost:8000/api/get_passenger_requests_details/",
//           { request_ids: selectedRequestIds },
//           {
//               headers: {
//                   Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//                   "Content-Type": "application/json",
//               },
//           }
//       );

//       if (response.data.error) {
//           console.error("❌ Список неактуальний:", response.data.error);
//           alert("⛔ Тимчасовий список втратив актуальність.");
//           await deleteTemporaryList();
//           return;
//       }

//       console.log("✅ Отримані заявки у правильному порядку:", response.data);
//       setPassengerRequests(prevState => ({ ...prevState, right: response.data }));
//   } catch (error) {
//       console.error("❌ Помилка при отриманні повної інформації про заявки:", error);
//   }
// }, [token]);

// 4️⃣ Отримання фільтрів при завантаженні сторінки

// 5️⃣ Виклик запиту `fetchPassengerRequests` тільки після отримання фільтрів



// const fetchRequests = async (filters) => {
//   try {
//       const response = await axios.get('http://localhost:8000/api/filtered-passenger-trip-requests/', {
//           params: filters,
//           headers: { Authorization: `Bearer ${token}` }
//       });
//       const leftList = response.data.filter(req => !req.included_in_list);
//       const rightList = response.data.filter(req => req.included_in_list);
//       setPassengerRequests({ left: leftList, right: rightList });
//   } catch (error) {
//       console.error('Error fetching passenger requests:', error);
//   }
// };

  const [routeDetails, setRouteDetails] = useState({
    distance: null,
    duration: null,
    stops: null,
    passengers: null,
    startAddress: null,
    endAddress: null,
  });





// 4️⃣ Видалення тимчасового списку
// const deleteTemporaryList = async (sessionId) => {
//   try {
//       console.log(`🗑️ Видаляємо тимчасовий список: ${sessionId}`);
//       await axios.delete(`http://localhost:8000/api/temp-lists/delete/`, {
//           params: { session_id: sessionId },
//           headers: { Authorization: `Bearer ${token}` }
//       });
//       console.log("✅ Тимчасовий список успішно видалено.");
//   } catch (error) {
//       console.error("❌ Помилка при видаленні тимчасового списку:", error);
//   }
// };

// 5️⃣ Збереження дефолтних фільтрів


// const saveFilters = async (newFilters) => {
  
//   try {
//       await axios.post('http://localhost:8000/api/temp-lists/save_list/', {
//           filter_params: newFilters
//       }, {
//           headers: { Authorization: `Bearer ${token}` }
//       });
//       console.log("✅ Нові фільтри збережено успішно.");
     
//   } catch (error) {
//       console.error('Error saving filters:', error);
//   }
// };

  // useEffect(() => {
  //   fetchRequests();
  // }, [searchQuery, showIncludedInList, showIncludedInRoute]);

  // // Відновлення вибраних заявок із sessionStorage при завантаженні сторінки
  // useEffect(() => {
  //   try {
  //     // Отримуємо вибрані заявки з sessionStorage
  //     const storedRequests = sessionStorage.getItem("selectedRequests");
  //     const parsedRequests = storedRequests ? JSON.parse(storedRequests) : [];
  
  //     setSelectedRequests(parsedRequests);
  
  //     // Отримуємо фільтри з sessionStorage
  //     const storedFilters = sessionStorage.getItem("filters");
  //     const parsedFilters = storedFilters ? JSON.parse(storedFilters) : {};
  
  //     if (Object.keys(parsedFilters).length > 0) {
  //       setSearchQuery(parsedFilters.searchQuery || "");
  
  //       // Перетворюємо `startDate` і `endDate` у `dayjs()` об'єкти, якщо вони не є `dayjs()`
  //       setStartDate(parsedFilters.startDate ? dayjs(parsedFilters.startDate) : dayjs().startOf("day"));
  //       setEndDate(parsedFilters.endDate ? dayjs(parsedFilters.endDate) : dayjs().endOf("day"));
  
  //       setDirectionFilter(parsedFilters.directionFilter || "");
  //       setShowIncludedInList(parsedFilters.showIncludedInList || false);
  //       setShowIncludedInRoute(parsedFilters.showIncludedInRoute || false);
  //     }
  
  //     // Викликаємо fetchRequests тільки якщо parsedRequests є масивом
  //     if (Array.isArray(parsedRequests)) {
  //       fetchRequests(parsedRequests.map(req => req.id));
  //     }
  //   } catch (error) {
  //     console.error("❌ Error parsing data from sessionStorage:", error);
  //     setSelectedRequests([]);
  //     setStartDate(dayjs().startOf("day")); // Додаємо безпечне значення
  //     setEndDate(dayjs().endOf("day")); // Додаємо безпечне значення
  //   }
  // }, []);
  
  
// тимчасово закосітив цю функцію, щоб спробувати аналогічну
  // const fetchRequests = () => {
  //   // console.log("🔑 Token:", localStorage.getItem("access_token"));
  //   console.log("📤 Запит на отримання списку заявок з фільтрами:");
  //   let storedRequests = [];
  //   try {
  //     storedRequests = JSON.parse(sessionStorage.getItem("selectedRequests")) || [];
  //   } catch (error) {
  //     console.error("❌ Error parsing selectedRequests from sessionStorage:", error);
  //     storedRequests = [];
  //   }
  
  //   const selectedIds = storedRequests.map(req => req.id);
  
  //   // const storedRequests = JSON.parse(sessionStorage.getItem("selectedRequests")) || [];
  //   // const selectedIds = storedRequests.map(req => req.id);
  
  //   const start = dayjs(startDate).format("YYYY-MM-DD HH:mm:ss");
  //   const end = dayjs(endDate).format("YYYY-MM-DD HH:mm:ss");
  
  //   const filters = {
  //     direction: directionFilter,
  //     included_in_list: showIncludedInList ? true : undefined,
  //     included_in_route: showIncludedInRoute ? true : undefined,
  //   };
  
  //   axios.get(`http://localhost:8000/api/filtered-passenger-trip-requests/`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //     },
  //     params: {
  //       start_date: start,
  //       end_date: end,
  //       search: searchQuery,
  //       ...filters,
  //       ids_exclude: selectedIds.length > 0 ? selectedIds.join(",") : undefined
  //     }
  //   }).then(response => {
  //     setUnselectedRequests(response.data);
  //   });
  
  //   axios.get(`http://localhost:8000/api/filtered-passenger-trip-requests/`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //     },
  //     params: {
  //       start_date: start,
  //       end_date: end,
  //       search: searchQuery,
  //       ...filters,
  //       ids_include: selectedIds.length > 0 ? selectedIds.join(",") : undefined
  //     }
  //   }).then(response => {
  //     setSelectedRequests(response.data);
  //   });
  // };
  
  
  // //  // Оновлення списку вибраних заявок
  //  const updateSelectedRequests = (requestId) => {
  //   let storedData = sessionStorage.getItem("selectedRequests") ? JSON.parse(sessionStorage.getItem("selectedRequests")) : [];
  //   const isSelected = storedData.some(req => req.id === requestId);

  //   if (isSelected) {
  //     storedData = storedData.filter(req => req.id !== requestId); // Видаляємо з вибраних
  //   } else {
  //     storedData.push({ id: requestId }); // Додаємо у вибрані
  //   }

  //   sessionStorage.setItem("selectedRequests", JSON.stringify(storedData));
  //   // fetchPassengerRequests(); // Оновлюємо таблиці після зміни
  // };
  
// додано 20.03 - новий механізм роботи лівої таблиці через бекенд.

const handleCheckboxClick = async (requestId, isChecked) => {
  let storedData = sessionStorage.getItem("selectedRequests") ? JSON.parse(sessionStorage.getItem("selectedRequests")) : [];
  
  if (isChecked) {
      storedData.push({ id: requestId });
  } else {
      storedData = storedData.filter(req => req.id !== requestId);
  }

  sessionStorage.setItem("selectedRequests", JSON.stringify(storedData));

  // Викликаємо оновлення правої таблиці після вибору у лівій таблиці
  await fetchUpdatedRequests(storedData.map(req => req.id));
};

//  Ця функція відпрацьовує але вона неправильна!!! 

const fetchUpdatedRequests = async () => {
  try {
    const filtersData = JSON.parse(sessionStorage.getItem("filters"));

    if (!filtersData || !filtersData.requests) {
      console.warn("⚠️ Дані фільтрів або список заявок відсутній у sessionStorage.");
      setPassengerRequests(prevState => ({ ...prevState, right: [] }));
      setSelectedRequests([]); // 💥 очищаємо також
      return;
    }

    const storedRequestsFull = filtersData.requests;
    const storedRequestIds = storedRequestsFull.map(req => req.id);

    if (storedRequestIds.length === 0) {
      console.warn("⚠️ Тимчасовий список порожній.");
      setPassengerRequests(prevState => ({ ...prevState, right: [] }));
      setSelectedRequests([]); // 💥 очищаємо також
      return;
    }

    const requestDetailsResponse = await axios.get(API_ENDPOINTS.getFilteredTripRequests, {
      params: {
        ids_include: storedRequestIds.join(","),
      },
    });
    const responseData = requestDetailsResponse.data;

if (!Array.isArray(responseData)) {
  console.warn("❌ Очікувався масив, але отримано:", responseData);
  setPassengerRequests(prevState => ({ ...prevState, right: [] }));
  return;
}
    const enrichedRequests = storedRequestsFull.map(storedRequest => {
      const detailedRequest = requestDetailsResponse.data.find(req => req.id === storedRequest.id);
      return detailedRequest ? { ...detailedRequest, ...storedRequest } : storedRequest;
    });

    console.log("🔄 Об'єднані заявки:", enrichedRequests);

    setPassengerRequests(prevState => ({
      ...prevState,
      right: enrichedRequests.sort((a, b) => a.sequence_number - b.sequence_number),
    }));
    const sortedRequests = enrichedRequests.sort((a, b) => a.sequence_number - b.sequence_number);

console.log("📦 Запис у таблицю праворуч (setPassengerRequests.right):", sortedRequests);
setPassengerRequests(prevState => ({
  ...prevState,
  right: sortedRequests,
}));

console.log("📌 Запис у selectedRequests:", sortedRequests);
// 💥 ОНОВЛЮЄМО ПРАВУ ТАБЛИЦЮ!
setSelectedRequests(sortedRequests);

    console.log("📦 Запис у таблицю праворуч (setPassengerRequests.right):", sortedRequests);
    // 💥 ОНОВЛЮЄМО ПРАВУ ТАБЛИЦЮ!
    setSelectedRequests(enrichedRequests.sort((a, b) => a.sequence_number - b.sequence_number));

  } catch (error) {
    console.error("❌ Помилка при оновленні заявок:", error);
  }
};
useEffect(() => {
  const interval = setInterval(() => {
    const filters = JSON.parse(sessionStorage.getItem("filters")) || {};
    const storedRequests = filters.requests || [];
    const storedIds = storedRequests.map((r) => r.id).sort().join(",");

    if (window.__lastSyncedRightIds !== storedIds) {
      console.log("🔁 [Right Table] Заявки у sessionStorage змінились → оновлюємо selectedRequests");
      console.log("📋 Новий список selectedRequests:", storedRequests);

      window.__lastSyncedRightIds = storedIds;
      setSelectedRequests(storedRequests); // ⬅️ оновлюємо локальний state
      fetchUpdatedRequests(); // ⬅️ оновлюємо праву таблицю (з повними даними)
    }
  }, 1000);

  return () => clearInterval(interval);
}, []);


const updateRouteRequestsInStorage = (updatedSelections) => {
  const stored = sessionStorage.getItem("filters");
  if (!stored) {
    console.warn("❌ sessionStorage.filters відсутній");
    return;
  }

  const rawFilters = JSON.parse(stored);

  const session_id = rawFilters.session_id || localStorage.getItem("session_id");

  // Витягуємо всі поля, крім session_id та requests → це і є filter_params
  const { requests: _, session_id: __, ...filter_params } = rawFilters;

  if (!session_id || Object.keys(filter_params).length === 0) {
    console.warn("⚠️ Не можна зберегти: відсутній session_id або порожні filter_params");
    return;
  }

  const updatedRequests = updatedSelections.map((request, index) => ({
    id: request.id,
    sequence_number: index + 1,
    pickup_latitude: request.pickup_latitude || "0.000000",
    pickup_longitude: request.pickup_longitude || "0.000000",
  }));

  const updatedFilters = {
    session_id,
    filter_params,
    requests: updatedRequests,
  };

  console.log("✅ Переформатовані фільтри перед збереженням:", updatedFilters);

  sessionStorage.setItem("filters", JSON.stringify({ ...filter_params, requests: updatedRequests, session_id }));

  setFilters(updatedFilters); // опційно, якщо потрібно зберігати в state

  saveRouteFiltersToBackend(updatedFilters, updatedRequests);
};



const saveRouteFiltersToBackend = async (filtersToSave, requestsToSave) => {
  if (!filtersToSave.session_id || !filtersToSave.filter_params) {
    console.warn("⚠️ Збереження неможливе: відсутні session_id або filter_params");
    return;
  }

  try {
    await axios.post(API_ENDPOINTS.saveTempList, {
      ...filtersToSave,
      requests: requestsToSave,
    });
    console.log("✅ Фільтри та заявки маршруту збережено.");
  } catch (error) {
    console.error("❌ Помилка при збереженні маршрутного списку:", error);
  }
};



// const fetchAndUpdateRequests = async (selectedRequestIds) => {
//   if (!selectedRequestIds || selectedRequestIds.length === 0) {
//       setPassengerRequests(prevState => ({ ...prevState, right: [] }));
//       return;
//   }

//   try {
//       const response = await axios.post(
//           "http://localhost:8000/api/get_passenger_requests_details/",
//           { request_ids: selectedRequestIds },
//           {
//               headers: {
//                   Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//                   "Content-Type": "application/json",
//               },
//           }
//       );

//       if (response.data.error) {
//           alert("⛔ Тимчасовий список втратив актуальність.");
//           return;
//       }

//       // Оновлення правої таблиці
//       setPassengerRequests(prevState => ({
//         ...prevState,
//         right: enrichedRequests.sort((a, b) => a.sequence_number - b.sequence_number),
//       }));
      
//       // 💥 Додати оце:
//       setSelectedRequests(enrichedRequests.sort((a, b) => a.sequence_number - b.sequence_number));
//   } catch (error) {
//       console.error("❌ Помилка при отриманні даних заявок:", error);
//   }
// };

  

// Функція для отримання налаштувань
const fetchRouteSettings = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.getRouteSettings);
    setRouteSettings(response.data);
  } catch (error) {
    console.error("❌ Error fetching route settings:", error);
  }
};

useEffect(() => {
  fetchRouteSettings();
}, []);

const checkRouteRestrictions = (routeSettings, selectedRequests) => {
  const violations = [];

  console.log("🧩 Виконання перевірки обмежень...", routeSettings);

  // 1. Кількість пасажирів
  const passengerCount = selectedRequests.length;
  console.log("👥 Кількість пасажирів:", passengerCount);
  if (routeSettings.min_passengers && passengerCount < routeSettings.min_passengers) {
    violations.push("min_passengers");
    console.warn("🚫 Порушено: min_passengers");
  }
  if (routeSettings.max_passengers && passengerCount > routeSettings.max_passengers) {
    violations.push("max_passengers");
    console.warn("🚫 Порушено: max_passengers");
  }

  // 2. Змішані напрямки
  const directions = new Set(selectedRequests.map(r => r.request_type));
  console.log("🔀 Напрямки у вибраних заявках:", [...directions]);
  if (!routeSettings.allow_mixed_directions && directions.size > 1) {
    violations.push("allow_mixed_directions");
    console.warn("🚫 Порушено: allow_mixed_directions");
  }

  // 3. Робочі адреси
  const workAddresses = new Set(
    selectedRequests
      .filter(r => r.request_type === "to_work")
      .map(r => `${r.dropoff_latitude},${r.dropoff_longitude}`)
  );
  console.log("🏢 Унікальні адреси роботи:", [...workAddresses]);
  if (!routeSettings.allow_multiple_work_addresses && workAddresses.size > 1) {
    violations.push("allow_multiple_work_addresses");
    console.warn("🚫 Порушено: allow_multiple_work_addresses");
  }

  // 4. Перевірка дати
  const uniqueDates = new Set(selectedRequests.map(r => r.date));
  console.log("📅 Унікальні дати заявок:", [...uniqueDates]);
  if (routeSettings.date_interval === 0 && uniqueDates.size > 1) {
    violations.push("date_interval");
    console.warn("🚫 Порушено: date_interval");
  }

  // 5. Час прибуття
  if (routeSettings.arrival_time_tolerance && selectedRequests[0].arrival_time) {
    const firstTime = new Date(`1970-01-01T${selectedRequests[0].arrival_time}`);
    const tolerance = routeSettings.arrival_time_tolerance;
    for (let r of selectedRequests) {
      const time = new Date(`1970-01-01T${r.arrival_time}`);
      const diff = Math.abs((time - firstTime) / 60000);
      if (diff > tolerance) {
        violations.push("arrival_time_tolerance");
        console.warn("🚫 Порушено: arrival_time_tolerance", r.arrival_time);
        break;
      }
    }
  }

  // 6. Кількість зупинок
  const uniqueStops = new Set(selectedRequests.map(r => `${r.pickup_latitude},${r.pickup_longitude}`));
  console.log("🛑 Унікальні зупинки:", [...uniqueStops]);
  if (routeSettings.max_stops && uniqueStops.size > routeSettings.max_stops) {
    violations.push("max_stops");
    console.warn("🚫 Порушено: max_stops");
  }

  return {
    isValid: violations.length === 0,
    violated: violations
  };
};
  const fetchPassengerLists = async () => {
    try {
      if (!filters) {
        console.error("⚠️ `filters` не визначено! Використовуємо дефолтні значення.");
        return;
      }
  
      // Додаємо перевірку, чи `filters.start_date` та `filters.end_date` існують та мають правильний формат
      const formattedStartDate =
        filters.start_date && dayjs(filters.start_date).isValid()
          ? dayjs(filters.start_date).format("YYYY-MM-DDTHH:mm:ss")
          : null;
  
      const formattedEndDate =
        filters.end_date && dayjs(filters.end_date).isValid()
          ? dayjs(filters.end_date).format("YYYY-MM-DDTHH:mm:ss")
          : null;
  
      console.log("📤 Відправка фільтрів:", {
        estimated_start_time__gte: formattedStartDate,
        estimated_end_time__lte: formattedEndDate,
        direction: filters.direction || null,
        is_active: filters.is_active ?? null,
        start_city__icontains: filters.start_city || null,
        search: filters.search_query || null,
      });
  
      const response = await axios.get(API_ENDPOINTS.getOrderedPassengerLists, {
        params: {
          estimated_start_time__gte: formattedStartDate,
          estimated_end_time__lte: formattedEndDate,
          direction: filters.direction || null,
          is_active: filters.is_active ?? null,
          start_city__icontains: filters.start_city || null,
          search: filters.search_query || null,
        },
      });
  
      console.log("📥 Отримані дані (тут повинні бути збережені списки пасажирів):", response.data);
      setPassengerLists(Array.isArray(response.data) ? response.data : []);

    } catch (error) {
      console.error(
        "❌ Помилка при отриманні списку пасажирів:",
        error.response?.data || error
      );
    }
  };
  

  useEffect(() => {
    const formattedStart = dayjs(startDate).format("YYYY-MM-DDTHH:mm:ss");
    const formattedEnd = dayjs(endDate).format("YYYY-MM-DDTHH:mm:ss");
  
    if (
      filters?.start_date !== formattedStart ||
      filters?.end_date !== formattedEnd
    ) {
      const updatedFilters = {
        ...filters,
        start_date: formattedStart,
        end_date: formattedEnd,
      };
  
      setFilters(updatedFilters); // ✅ оновлюємо state
      sessionStorage.setItem("savedPassengerListFilters", JSON.stringify(updatedFilters)); // ✅ зберігаємо
  
      console.log("✅ Оновлено filters та sessionStorage!");
    } else {
      console.log("⏸️ Filters не змінені — оновлення не потрібне.");
    }
  }, [startDate, endDate]);
  
  
  
  useEffect(() => {
    console.log("📌 Виклик fetchPassengerLists із sessionStorage фільтрами:", filters);
    if (filters?.start_date && filters?.end_date) {
      fetchPassengerLists();
    }
  }, [filters]);
  

  const fetchListDetails = async (listId) => {
    try {
      const response = await axios.get(API_ENDPOINTS.getOrderedPassengerListDetails(listId));
      setSelectedListDetails(response.data);
      setSelectedListPassengers(response.data.passenger_requests || []);
    } catch (error) {
      console.error("Error fetching list details:", error);
    }
  };

  const handleListDoubleClick = async (listId) => {
    try {
      console.log(`🔵 Details button clicked for list ID: ${listId}`);
  
      const response = await axios.get(API_ENDPOINTS.getOrderedPassengerListDetails(listId));
  
      console.log("✅ List details received:", response.data);
  
      setSelectedListDetails(response.data);
      setSelectedListPassengers(response.data.trip_requests || []);
      console.log("✅ Passenger trip requests:", response.data.trip_requests);
    } catch (error) {
      console.error("❌ Error fetching list details:", error);
    }
  };
  

  const applyFilters = (data) => {
    const filteredData = data.filter((request) => {
      if (directionFilter === "ALL") {
        return true; // Показуємо всі заявки
      }
      if (request.direction !== directionFilter) {
        return false;
      }
      if (!showIncludedInList && request.included_in_list) {
        return false;
      }
      if (!showIncludedInRoute && request.included_in_route) {
        return false;
      }
      const requestDate = new Date(
        request.departure_time || request.arrival_time
      );
      return (
        allowExtendedInterval ||
        (requestDate >= startDate && requestDate <= endDate)
      );
    });
    setUnselectedRequests(filteredData);
  };


  

  const handleDeselect = (id) => {
    setIsRouteCalculated(false);
  
    const deselectedRequest = selectedRequests.find((r) => r.id === id);
    if (!deselectedRequest) return;
  
    // 🔄 Формуємо новий масив заявок, які залишились
    const updatedSelectedRequests = selectedRequests
      .filter((r) => r.id !== id)
      .map((req, index) => ({
        ...req,
        sequence_number: index + 1, // Перерахунок
      }));
  
    // ✅ Оновлюємо праву таблицю (відображення)
    setSelectedRequests(updatedSelectedRequests);
  
    // ✅ Додаємо назад у список "невідібраних"
    setUnselectedRequests([
      ...unselectedRequests,
      {
        ...deselectedRequest,
        is_selected: false,
        sequence_number: null,
      },
    ]);
  
    // ✅ Оновлюємо sessionStorage і зберігаємо на бекенді
    syncSelectedRequests(updatedSelectedRequests);
    updateRouteRequestsInStorage(updatedSelectedRequests);
    // updateRouteRequestsInStorage();
  };
  
  

  // const handleReorder = (id, direction) => {
  //   setIsRouteCalculated(false); // Маршрут тепер вимагає перерахунку
  //   setSelectedRequests((prevRequests) => {
  //     const index = prevRequests.findIndex((r) => r.id === id);
  //     if (
  //       index === -1 ||
  //       (direction === "up" && index === 0) ||
  //       (direction === "down" && index === prevRequests.length - 1)
  //     ) {
  //       return prevRequests;
  //     }
  
  //     const newRequests = [...prevRequests];
  //     const [movedItem] = newRequests.splice(index, 1);
  //     newRequests.splice(
  //       direction === "up" ? index - 1 : index + 1,
  //       0,
  //       movedItem
  //     );
  
  //     const reordered = newRequests.map((req, idx) => ({
  //       ...req,
  //       sequence_number: idx + 1,
  //     }));
  
  //     // ✅ Зберігаємо оновлений порядок у sessionStorage
  //     syncSelectedRequests(reordered);
  
  //     return reordered;
  //   });
  // };
  
const handleFilterChange = (e) => {
  const { name, value } = e.target;
  let updatedFilters = { ...filters };

  if (name === "start_date" || name === "end_date") {
      const formattedDate = value
          ? dayjs(value).format("YYYY-MM-DD HH:mm:ss")
          : "";
      updatedFilters[name] = formattedDate;

      if (
          name === "start_date" &&
          dayjs(formattedDate).isAfter(dayjs(filters.end_date))
      ) {
          updatedFilters.end_date = dayjs(formattedDate)
              .endOf("day")
              .format("YYYY-MM-DD HH:mm:ss");
      }

      if (
          name === "end_date" &&
          dayjs(formattedDate).isBefore(dayjs(filters.start_date))
      ) {
          updatedFilters.start_date = dayjs(formattedDate)
              .startOf("day")
              .format("YYYY-MM-DD HH:mm:ss");
      }
  } else {
      updatedFilters[name] = value;
  }

  console.log("Оновлені фільтри (форматовані дати):", updatedFilters);
  setFilters(updatedFilters);

  // ❗ Якщо фільтр змінюється, знову робимо маршрут не розрахованим
  setIsRouteCalculated(false);
};

  
  // Оновлення фільтрів для нижньої таблиці згідно з верхнім фільтром часу
  const handleSyncWithStorage = () => {
    const savedFilters = JSON.parse(sessionStorage.getItem("filters"));
    if (savedFilters && savedFilters.start_date && savedFilters.end_date) {
      setStartDate(dayjs(savedFilters.start_date));
      setEndDate(dayjs(savedFilters.end_date));
      setFilters((prev) => ({
        ...prev,
        start_date: savedFilters.start_date,
        end_date: savedFilters.end_date,
      }));
    }
  };
  
 
  

  // Форматування часу у всіх таблицях
  const formatDateTime = (params) =>
    params.value ? dayjs(params.value).format("DD-MM-YYYY HH:mm") : "";
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
  
  const getRowStyle = (params) => {
    const { sequence_number } = params.data;
    const maxSequence = Math.max(
      ...selectedRequests.map((req) => req.sequence_number || 0)
    );
    if (sequence_number === 1 || sequence_number === maxSequence) {
      return { border: "2px solid black", fontWeight: "bold" };
    }
    return null;
  };

  const calculateRoute = async () => {
    if (selectedRequests.length < 2) {
      alert(t("minimum_points_required"));
      return;
    }
  
    const direction = directionFilter;
    const origin = `${selectedRequests[0].pickup_latitude},${selectedRequests[0].pickup_longitude}`;
    const destination = `${selectedRequests[selectedRequests.length - 1].dropoff_latitude},${selectedRequests[selectedRequests.length - 1].dropoff_longitude}`;
    const waypoints = selectedRequests.slice(1, -1).map(r =>
      direction === "HOME_TO_WORK"
        ? `${r.pickup_latitude},${r.pickup_longitude}`
        : `${r.dropoff_latitude},${r.dropoff_longitude}`
    );
  
    console.log("📤 Відправка запиту на розрахунок маршруту (все на бекенді)");
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(API_ENDPOINTS.calculateRoute, {
        origin,
        destination,
        waypoints,
        language: userLanguage,
        passenger_count: selectedRequests.length,
        direction,
        selected_requests: selectedRequests,  // 👉 бекенд отримає весь масив
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const { standard_route, optimized_route, optimization_applied, optimized_order } = response.data;
      if (!standard_route) {
        alert("Помилка: Дані маршруту не отримані.");
        return;
      }
  
      const formatAddress = (address) => {
        if (!address || typeof address !== "string") return "";
        const parts = address.split(",");
        if (parts.length >= 3) {
          return `${parts[2].trim()}, ${parts[0].trim()}, ${parts[1].trim()}`;
        }
        return address;
      };
      
  
      const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = Math.round(minutes % 60);
        return `${hours}h ${remainingMinutes}m`;
      };
  sessionStorage.setItem("route_calculation_data", JSON.stringify({
  standardRoute: {
    distance: Math.round(standard_route.total_distance),
    duration: formatDuration(standard_route.total_duration),
    stops: standard_route.stops,
    startAddress: formatAddress(standard_route.start_address),
    endAddress: formatAddress(standard_route.end_address),
  },
  optimizedRoute: optimization_applied ? {
    distance: Math.round(optimized_route.total_distance),
    duration: formatDuration(optimized_route.total_duration),
    stops: optimized_route.stops,
    startAddress: formatAddress(optimized_route.start_address),
    endAddress: formatAddress(optimized_route.end_address),
  } : null,
  optimizationApplied: optimization_applied,
  overrideStandardWithOptimized: false
}));
      setModalData({
        show: true,
        standardRoute: {
          distance: Math.round(standard_route.total_distance),
          duration: formatDuration(standard_route.total_duration),
          stops: standard_route.stops,
          startAddress: formatAddress(standard_route.start_address),
          endAddress: formatAddress(standard_route.end_address),
        },
        optimizedRoute: optimization_applied ? {
          distance: Math.round(optimized_route.total_distance),
          duration: formatDuration(optimized_route.total_duration),
          stops: optimized_route.stops,
          startAddress: formatAddress(optimized_route.start_address),
          endAddress: formatAddress(optimized_route.end_address),
        } : null,
        optimizedOrder: optimized_order || null,
        optimizationApplied: optimization_applied,
        direction: direction,
      });
  
      setStandardRoute(standard_route || []);
      setOptimizedRoute(optimized_route || []);
    } catch (error) {
      console.error("❌ Помилка при розрахунку маршруту:", error);
      alert(t("error_calculating_route"));
    }
  };
  

    
  // Функція прийняття стандартного маршруту
const acceptStandardRoute = () => {
  if (!modalData.standardRoute) {
    console.error("❌ Дані стандартного маршруту відсутні.");
    return;
  }

  console.log("🛣 Використано маршрут користувача:", modalData.standardRoute);

  setRouteDetails({
    distance: modalData.standardRoute.distance,
    duration: modalData.standardRoute.duration,
    stops: modalData.standardRoute.stops,
    passengers: selectedRequests.length,
    startAddress: modalData.standardRoute.startAddress,
    endAddress: modalData.standardRoute.endAddress,
    
  });

  setModalData({ show: false }); // Закриваємо вікно
  // 🔹 Додаємо можливість збереження списку після підтвердження маршруту
  setIsRouteCalculated(true);

  const savedRouteData = sessionStorage.getItem("route_calculation_data");
if (savedRouteData) {
  try {
    const parsed = JSON.parse(savedRouteData);
    const updated = {
      ...parsed,
      standardRoute: modalData.optimizedRoute,     // замінюємо
      optimizedRoute: null,                        // очищаємо
      overrideStandardWithOptimized: true,         // щоб на мапі показати заміну
    };
    sessionStorage.setItem("route_calculation_data", JSON.stringify(updated));
    console.log("✅ Оновлено sessionStorage з прийнятим оптимізованим маршрутом.");
  } catch (e) {
    console.error("❌ Помилка при оновленні sessionStorage:", e);
  }
}
};

// Функція прийняття оптимізованого маршруту
// Юзер може виконувати цю послідовність дій скільки завгодно разів:
// 1. Формувати список відібраних заявок пасажирів (додавати, віднімати, змінювати порядок).
// 2. Відправляти сформований список на перевірку.
// 3. Щоразу дані для перевірки беруться з таблиці у тому порядку, який є актуальним після змін юзера.



// Якщо юзер вносить зміни у список (додає/видаляє заявки чи змінює порядок), кнопка збереження стає неактивною
useEffect(() => {
  setIsRouteCalculated(false);
}, [selectedRequests]);

// Функція відкриття модального вікна карти
const handleShowMap = () => {
  navigate("/route-map", {
    state: {
      savedRequests: selectedRequests,
      standardRoute: standardRoute,
      optimizedRoute: optimizedRoute,
      direction: directionFilter,
    },
  });
};
//Тимчасово закоментимо щоб виявити помилку
useEffect(() => {
  try {
    const storedRequests = sessionStorage.getItem("selectedRequests");
    const parsedRequests = storedRequests ? JSON.parse(storedRequests) : [];
    setSelectedRequests(parsedRequests);

    const storedRequestIds = sessionStorage.getItem("selectedRequestIds");
    const parsedRequestIds = storedRequestIds ? JSON.parse(storedRequestIds) : [];

    const storedStandardRoute = sessionStorage.getItem("standardRoute");
    const parsedStandardRoute = storedStandardRoute ? JSON.parse(storedStandardRoute) : null;

    const storedOptimizedRoute = sessionStorage.getItem("optimizedRoute");
    const parsedOptimizedRoute = storedOptimizedRoute ? JSON.parse(storedOptimizedRoute) : null;

    if (location.state?.savedRequests) {
      console.log("🔄 Відновлюємо selectedRequests із location.state");
      setSelectedRequests(location.state.savedRequests);
    } else {
      console.log("🔄 Відновлюємо selectedRequests із sessionStorage");
      setSelectedRequests(parsedRequests);
      syncSelectedRequests(parsedRequests);

    }

    // if (parsedRequestIds.length > 0) {
    //   console.log("📌 Викликаємо fetchPassengerRequests(filters) із фільтром:", filters);
    //   fetchPassengerRequests(filters);
    // }
    
    if (parsedStandardRoute) {
      setStandardRoute(parsedStandardRoute);
    }

    if (parsedOptimizedRoute) {
      setOptimizedRoute(parsedOptimizedRoute);
    }
    fetchUpdatedRequests();
  } catch (error) {
    console.error("❌ Помилка парсингу даних із sessionStorage:", error);
    setSelectedRequests([]);
  }
}, []);



const clearSessionStorage = () => {
  console.log("🗑 Очищення sessionStorage при виході з сторінки...");
  sessionStorage.removeItem("selectedRequests");
  sessionStorage.removeItem("selectedRequestIds");
  sessionStorage.removeItem("directionFilter");
  sessionStorage.removeItem("filters");
};
const handleClearList = () => {
  clearTemporaryPassengerRequests(); // ✅ очищення sessionStorage + бекенд

  // 🧹 Очистити дані маршруту
  setRouteDetails({
    distance: null,
    duration: null,
    stops: null,
    passengers: null,
    startAddress: null,
    endAddress: null,
  });

  
};


const clearTemporaryPassengerRequests = () => {
  const filters = JSON.parse(sessionStorage.getItem("filters")) || {};
  filters.requests = [];
  sessionStorage.setItem("filters", JSON.stringify(filters));
  console.log("🧼 Тимчасовий список заявок очищено");

  // Очистити також на бекенді
  axios.post(API_ENDPOINTS.saveTempList, {
    session_id: sessionId,
    filter_params: filters,
    requests: [],
    expires_at: new Date(Date.now() + 86400000).toISOString(),
  }).then(() => {
    console.log("🧼 Тимчасовий список очищено і на бекенді");
  }).catch(err => {
    console.error("❌ Помилка при очищенні тимчасового списку:", err);
  });
};

  // Очищення sessionStorage тільки при виході на інші сторінки, окрім RouteMapModal
  // useEffect(() => {
  //   return () => {
  //     const allowedRoutes = ["/grouping-list-to-route", "/route-map"];
  //     if (!allowedRoutes.includes(location.pathname)) {
  //       console.log("🗑 Очистка при виході на інші сторінки:", location.pathname);
  //       sessionStorage.removeItem("selectedRequests");
  //       sessionStorage.removeItem("selectedRequestIds");
  //     }
  //   };
  // }, [location.pathname]);
  


const filteredRequests = allRequests.filter(
  (req) => !selectedRequests.some((selected) => selected.id === req.id)
);

// Функція закриття модального вікна карти
const handleCloseMap = () => {
  console.log("❌ Закриваємо карту...");
  setShowMapModal(false);
};
  const saveList = async () => {
    if (!isRouteCalculated || selectedRequests.length === 0) {
      alert(t("no_requests_selected"));
      return;
    }

    const token = localStorage.getItem("access_token");

    // Формуємо параметри маршруту
    const firstRequest = selectedRequests[0];
    const lastRequest = selectedRequests[selectedRequests.length - 1];

    // 🟢 Перевіряємо та встановлюємо значення `estimated_travel_time`
    const estimatedTravelTime =
      routeDetails.duration && !isNaN(routeDetails.duration)
        ? Math.round(routeDetails.duration)
        : 0; // Якщо значення `NaN`, ставимо 0

    const requestData = {
      direction: directionFilter || "WORK_TO_HOME",
      estimated_start_time: dayjs().utc().format("YYYY-MM-DD HH:mm:ss"),
      estimated_end_time: dayjs()
        .add(1, "day")
        .utc()
        .format("YYYY-MM-DD HH:mm:ss"),
      estimated_travel_time: estimatedTravelTime, // 🟢 Виправлення NaN
      estimated_wait_time: 10,
      has_both_directions: allowMixedDirections ? 1 : 0,
      route_distance_km: Math.round(routeDetails.distance || 0),
      stop_count: selectedRequests.length - 2,
      passenger_count: selectedRequests.length,
      multiple_work_addresses_allowed:
        routeSettings?.allow_multiple_work_addresses ? 1 : 0,
      is_active: 1,
      allow_copy: 1,
      allow_edit: 1,

      start_city: firstRequest.pickup_city || "Unknown",
      start_street: firstRequest.pickup_street || "Unknown",
      start_building: firstRequest.pickup_house || "", // 🟢 Уникаємо `undefined`
      start_latitude: parseFloat(firstRequest.pickup_latitude) || 0.0,
      start_longitude: parseFloat(firstRequest.pickup_longitude) || 0.0,
      start_passenger_first_name:
        firstRequest.passenger_first_name || "Unknown",
      start_passenger_last_name: firstRequest.passenger_last_name || "Unknown",
      start_passenger_id: firstRequest.passenger || null,
      start_address_type: "pickup",
      start_coordinate_id: firstRequest.pickup_point_id || null,
      start_request_id: firstRequest.id,

      end_city: lastRequest.dropoff_city || "Unknown",
      end_street: lastRequest.dropoff_street || "Unknown",
      end_building: lastRequest.dropoff_house || "", // 🟢 Уникаємо `undefined`
      end_latitude: parseFloat(lastRequest.dropoff_latitude) || 0.0,
      end_longitude: parseFloat(lastRequest.dropoff_longitude) || 0.0,
      end_passenger_first_name: lastRequest.passenger_first_name || "Unknown",
      end_passenger_last_name: lastRequest.passenger_last_name || "Unknown",
      end_passenger_id: lastRequest.passenger || null,
      end_address_type: "dropoff",
      end_coordinate_id: lastRequest.dropoff_point_id || null,
      end_request_id: lastRequest.id,

      selected_requests: selectedRequests.map((request, index) => ({
        id: request.id,
        sequence_number: index + 1,
        pickup_latitude: request.pickup_latitude || "0.000000",
        pickup_longitude: request.pickup_longitude || "0.000000",
      })),
    };

    console.log("🔵 Відправка даних для створення списку:", requestData);

    try {
      const response = await axios.post(
        API_ENDPOINTS.createOrderedPassengerList,
        requestData
      );
    
      console.log("✅ Список успішно створено:", response.data);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Затримка перед оновленням
      alert(t("list_saved"));
    
      setSelectedRequests([]);
      clearTemporaryPassengerRequests();
      setRouteDetails({
        distance: null,
        duration: null,
        stops: null,
        passengers: null,
        startAddress: null,
        endAddress: null,
      });
    
      fetchPassengerLists(); // Оновлення нижньої лівої таблиці
    } catch (error) {
      console.error("❌ Помилка при збереженні списку:", error);
      alert(t("error_saving_list"));
    }
  };

  const deleteList = async (listId) => {
    if (!window.confirm(`Видалити список ID ${listId}?`)) return;

    try {
      await axios.delete(API_ENDPOINTS.deleteOrderedPassengerList(listId));

      console.log(`✅ Список ID ${listId} успішно видалено`);
      sessionStorage.setItem("update_left_table_flag", "1"); // ⬅️ Додай це
      console.log("🔄 update_left_table_flag змінено на 1 після видалення списку");

      
      fetchPassengerLists(); // Оновлення списку
      setSelectedListDetails(null); // Очистка інформації про список
      setSelectedListPassengers([]); // Очистка таблиці "Відомості про список пасажирів"
      // fetchPassengerRequests(filters); // Оновлення таблиці "Запити пасажирів"
      
      
      if (typeof onRefreshRequests === "function") {
        onRefreshRequests(); // 🔄 Оновлюємо таблицю після видалення
      }
      
    } catch (error) {
      console.error(
        `❌ Помилка при видаленні списку ID ${listId}:`,
        error.response?.data || error
      );
      alert("Помилка при видаленні списку");
    }
  };

  const createColumnDefs = (isLeft) => {
    // console.log("isLeft:", isLeft); // Діагностика
    const columnDefs = [
      {
        headerName: t("is_selected"),
        field: "is_selected",
        width: 50,
        cellRenderer: (params) => (
          <input
          type="checkbox"
          title="remove from the list"
          checked={true} // бо у правій таблиці завжди лише відібрані
          onChange={() => handleDeselect(params.data.id)} // ⬅ ось тут головне
          />
        ),
      },
      {
        headerName: t("status"),
        field: "status",
        width: 80,
        cellRenderer: (params) => {
          const { sequence_number } = params.data;
          const maxSequence = Math.max(
            ...selectedRequests.map((req) => req.sequence_number || 0)
          );
          if (sequence_number === 1) return t("start");
          if (sequence_number === maxSequence) return t("finish");
          return "";
        },
      },
      // {
      //   headerName: t("sequence_number"),
      //   field: "sequence_number",
      //   cellRenderer: (params) => (
      //     <div style={{ display: "flex", alignItems: "center" }}>
      //       <button onClick={() => handleReorder(params.data.id, "up")}>
      //         ⬆️
      //       </button>
      //       <span style={{ margin: "0 10px" }}>
      //         {params.data.sequence_number || "-"}
      //       </span>
      //       <button onClick={() => handleReorder(params.data.id, "down")}>
      //         ⬇️
      //       </button>
      //     </div>
      //   ),
      //   width: 120,
      // },
      {
        headerName: "#",
        field: "sequence_number",
        width: 60,
        rowDrag: true,
        rowDragText: (params) => {
          if (params?.data?.passenger_first_name && params?.data?.passenger_last_name) {
            return `${params.data.passenger_first_name} ${params.data.passenger_last_name}`;
          }
          return `ID: ${params?.data?.id || "невідомо"}`;
        },
        cellRenderer: (params) => (
          <div style={{
            display: "flex",
            alignItems: "center",
            height: "20px",  // Зменшена висота
            fontSize: "0.85em",
          }}>
            {params?.data?.sequence_number || ""}
          </div>
        )
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

  const orderedPassengerColumns = [
    { headerName: t("ID"), field: "id", width: 40 },
    { headerName: t("Passenger"), field: "passenger_name", width: 120 },
    { headerName: t("Pickup Location"), field: "start_city", width: 120 },
    { headerName: t("Dropoff Location"), field: "end_city", width: 120 },
    {
      headerName: t("Route Distance (km)"),
      field: "route_distance_km",
      width: 100,
    },
  ];
  const columnDefs = [
    { headerName: t("ID"), field: "id", width: 40 },
    { headerName: t("direction"), field: "direction", width: 120 },
    {
      headerName: t("estimated_start_time"),
      field: "estimated_start_time",
      width: 120,
      valueFormatter: (params) =>
        dayjs(params.value).format("DD-MM-YYYY HH:mm"),
    },
    {
      headerName: t("End Time"),
      field: "estimated_end_time",
      width: 120,
      valueFormatter: (params) =>
        dayjs(params.value).format("DD-MM-YYYY HH:mm"),
    },
    {
      headerName: t("start_of_route"),
      children: [
        { headerName: t("start_city"), field: "start_city", width: 100 },
        { headerName: t("start_street"), field: "start_street", width: 120 },
        { headerName: t("start_building"), field: "start_building", width: 50 },
        { headerName: t("start_latitude"), field: "start_latitude", width: 70 },
        {
          headerName: t("start_longitude"),
          field: "start_longitude",
          width: 70,
        },
        {
          headerName: t("start_passenger_first_name"),
          field: "start_passenger_first_name",
          width: 70,
        },
        {
          headerName: t("start_passenger_last_name"),
          field: "start_passenger_last_name",
          width: 70,
        },
        {
          headerName: t("start_passenger_id"),
          field: "start_passenger_id",
          width: 40,
        },
        {
          headerName: t("start_address_type"),
          field: "start_address_type",
          width: 40,
        },
        {
          headerName: t("start_coordinate_id"),
          field: "start_coordinate_id",
          width: 60,
        },
        {
          headerName: t("start_request_id"),
          field: "start_request_id",
          width: 60,
        },
      ],
    },
    {
      headerName: t("end_of_route"),
      children: [
        { headerName: t("end_city"), field: "end_city", width: 100 },
        { headerName: t("end_street"), field: "end_street", width: 120 },
        { headerName: t("end_building"), field: "end_building", width: 40 },
        { headerName: t("end_latitude"), field: "end_latitude", width: 70 },
        { headerName: t("end_longitude"), field: "end_longitude", width: 70 },
        {
          headerName: t("end_passenger_first_name"),
          field: "end_passenger_first_name",
          width: 100,
        },
        {
          headerName: t("end_passenger_last_name"),
          field: "end_passenger_last_name",
          width: 100,
        },
        {
          headerName: t("end_passenger_id"),
          field: "end_passenger_id",
          width: 40,
        },
        {
          headerName: t("end_address_type"),
          field: "end_address_type",
          width: 60,
        },
        {
          headerName: t("end_coordinate_id"),
          field: "end_coordinate_id",
          width: 60,
        },
        { headerName: t("end_request_id"), field: "end_request_id", width: 60 },
      ],
    },

    {
      headerName: t("estimated_travel_time"),
      field: "estimated_travel_time",
      width: 100,
    },
    {
      headerName: t("estimated_wait_time"),
      field: "estimated_wait_time",
      width: 100,
    },
    {
      headerName: t("has_both_directionss"),
      field: "has_both_directions",
      width: 100,
    },
    {
      headerName: t("route_distance_km"),
      field: "route_distance_km",
      width: 100,
    },
    { headerName: t("stop_count"), field: "stop_count", width: 50 },
    { headerName: t("Passenger Count"), field: "passenger_count", width: 50 },
    {
      headerName: t("multiple_work_addresses_allowed"),
      field: "multiple_work_addresses_allowed",
      width: 50,
    },
    { headerName: t("is_active"), field: "is_active", width: 100 },
    // { headerName: t("allow_copy"), field: "allow_copy", width: 50 },
    // { headerName: t("allow_edit"), field: "allow_edit", width: 50 },
    // { headerName: t("created_at"), field: "created_at", width: 100 },
    // { headerName: t("updated_at"), field: "updated_at", width: 100 },
    // { headerName: t("deactivated_at"), field: "deactivated_at", width: 100 },
    {
      headerName: t("assigned_route_id_id"),
      field: "assigned_route_id_id",
      width: 100,
    },
  ];

  const handleListClick = async (listId) => {
    try {
      console.log(`🔵 Details button clicked for list ID: ${listId}`);

      const response = await axios.get(API_ENDPOINTS.getOrderedPassengerListDetails(listId));

      console.log("✅ List details received:", response.data);

      // Оновлення вибраних деталей списку
      setSelectedListDetails(response.data);

      // Переконайся, що `trip_requests` існує та є масивом
      console.log("✅ Passenger trip requests:", response.data.trip_requests);

      setSelectedListPassengers(response.data.trip_requests || []);
    } catch (error) {
      console.error("❌ Error fetching list details:", error);
    }
  };
  useEffect(() => {
    console.log("📌 Updated selectedListPassengers:", selectedListPassengers);
  }, [selectedListPassengers]);

  const selectedListInfo = selectedListDetails ? (
    <h3>
      Деталі списку: ID {selectedListDetails.id}, Напрямок:{" "}
      {selectedListDetails.start_city}, {selectedListDetails.start_street}{" "}
      {selectedListDetails.start_building} → {selectedListDetails.end_city},{" "}
      {selectedListDetails.end_street} {selectedListDetails.end_building} •
      Дистанція: {selectedListDetails.route_distance_km} km • Час в дорозі:{" "}
      {selectedListDetails.estimated_travel_time}h{" "}
      {selectedListDetails.estimated_travel_time % 60}m • Кількість зупинок:{" "}
      {selectedListDetails.stop_count} • Кількість пасажирів:{" "}
      {selectedListDetails.passenger_count}.
    </h3>
  ) : null;

  const enhancedColumnDefs = [
    {
      headerName: t("Details"),
      field: "details",
      width: 70,
      cellRenderer: (params) => (
        <button onClick={() => handleListClick(params.data.id)}>
          {t("View")}
        </button>
      ),
    },
    {
      headerName: t("Delete"),
      field: "delete",
      width: 80,
      cellRenderer: (params) => (
        <button
          onClick={() => deleteList(params.data.id)}
          style={{ color: "red", fontWeight: "bold" }}
        >
          {t("Delete")}
        </button>
      ),
    },
    ...columnDefs.map((col) => {
      if (
        [
          "start_date",
          "end_date",
          "arrival_time",
          "departure_time",
          "pickup_time_in_route",
          "dropoff_time_in_route",
          "travel_time_in_route",
          "wait_time_at_work",
        ].includes(col.field)
      ) {
        return { ...col, valueFormatter: formatDateTime };
      }
      return col;
    }),
  ];
  // Оновлення правої нижньої таблиці для відображення заявок пасажирів
  const tripRequestsColumnDefs = [
    {
      headerName: t("status"),
      field: "status",
      width: 80,
      cellRenderer: (params) => {
        return params.data.sequence_number === 1
          ? t("start")
          : params.data.sequence_number ===
            Math.max(
              ...selectedListPassengers.map((req) => req.sequence_number || 0)
            )
          ? t("finish")
          : "";
      },
    },
    { headerName: t("sequence_number"), field: "sequence_number", width: 120 },
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
    { headerName: t("direction"), field: "direction", width: 120 },
    {
      headerName: t("departure_info"),
      children: [
        {
          headerName: t("departure_time"),
          field: "departure_time",
          width: 120,
          valueFormatter: formatDateTime,
        },
        { headerName: t("pickup_city"), field: "pickup_city", width: 70 },
        { headerName: t("pickup_street"), field: "pickup_street", width: 100 },
        { headerName: t("pickup_house"), field: "pickup_house", width: 40 },
      ],
    },
    {
      headerName: t("arrival_info"),
      children: [
        {
          headerName: t("arrival_time"),
          field: "arrival_time",
          width: 120,
          valueFormatter: formatDateTime,
        },
        { headerName: t("dropoff_city"), field: "dropoff_city", width: 70 },
        {
          headerName: t("dropoff_street"),
          field: "dropoff_street",
          width: 100,
        },
        { headerName: t("dropoff_house"), field: "dropoff_house", width: 40 },
      ],
    },
    { headerName: t("passenger_id"), field: "passenger", width: 40 },
    { headerName: t("passenger_phone"), field: "passenger_phone", width: 120 },
    { headerName: t("is_active"), field: "is_active", width: 40 },
    { headerName: t("comment"), field: "comment", width: 600 },
  ];

  // Додавання стилю для виділення активного рядка
  const getRowStyle2 = (params) => {
    return params.data.id === selectedListDetails?.id
      ? { border: "2px solid black", fontWeight: "bold" }
      : {};
  };
  const applyOptimizedRoute = () => {
    if (!modalData.optimizedRoute || !modalData.optimizedOrder) {
      console.error("❌ Оптимізовані дані не знайдено.");
      return;
    }
  
    console.log("🔄 Оновлення таблиці відповідно до оптимізованого маршруту...");
    console.log("📌 Оптимізований порядок точок:", modalData.optimizedOrder);
  
    // Сортуємо `selectedRequests` у відповідності до порядку, запропонованого Google
    const sortedRequests = modalData.optimizedOrder.map((index, newIndex) => ({
      ...selectedRequests[index],
      sequence_number: newIndex + 1, // Оновлюємо порядковий номер
    }));
  
    console.log("✅ Оновлений список запитів після оптимізації:", sortedRequests);
  
    // Оновлюємо стан
    setSelectedRequests(sortedRequests);
    setModalData({ show: false }); // Закриваємо вікно
  };
  const handleBackClick = () => {
    handleClearList(); // очищує sessionStorage та стан
    navigate("/rout-manager"); // перемикає на маршрут /rout-manager
};

  const handleMainScreenClick = () => {
    handleClearList(); // очищення sessionStorage та станів
    navigate("/");     // перехід на головний екран
  };
  
  const handleRowDragEnd = async (event) => {
    const updated = [...selectedRequests];
    const dragged = event.node.data;
    const fromIndex = updated.findIndex((r) => r.id === dragged.id);
    updated.splice(fromIndex, 1);
    updated.splice(event.overIndex, 0, dragged);
  
    const reordered = updated.map((item, index) => ({
      ...item,
      sequence_number: index + 1,
    }));
  
    setSelectedRequests(reordered);
  
    // 🔄 Синхронізуємо sessionStorage
    const filters = JSON.parse(sessionStorage.getItem("filters")) || {};
    filters.requests = reordered.map((r) => ({
      id: r.id,
      sequence_number: r.sequence_number,
      pickup_latitude: r.pickup_latitude,
      pickup_longitude: r.pickup_longitude,
    }));
    sessionStorage.setItem("filters", JSON.stringify(filters));
  
    try {
      await axios.post(API_ENDPOINTS.updateTempListSequence, {
        session_id: sessionId,
        requests: reordered.map((r) => ({
          id: r.id,
          sequence_number: r.sequence_number,
        })),
      });
      console.log("✅ Список оновлено на бекенді.");
    } catch (error) {
      console.error("❌ Помилка при оновленні списку:", error);
    }
  };
  
  const handleRowDragEnter = () => {
    const ghost = document.querySelector(".ag-dnd-ghost");
    if (ghost) {
      ghost.style.display = "none"; // Сховати візуальне перетягування
    }
  };
  
  return (
    
    <div className="gltr-two-column-template">
      <div
        className="
      top-nav-bar"
      >
        <div className="logo">
          <img src="/logo.png" alt={t("logo.alt")} />
        </div>
        <h1 className="header-title">{t("grouping_list_to_route")}</h1>

        <div className="nav-buttons">
          <button className="nav-button" onClick={handleMainScreenClick}>
            {t("nav.main_screen")}
          </button>
          <button className="nav-button" onClick={handleBackClick}>
            {t("nav.back")}
          </button>
        </div>
      </div>
      <div className="gltr-template2s-content">
        {/* Left Column */}
        <div className="gltr-template2s-left-column">
        
          <div className="name-container">
            <h3>{t("passenger_trip_requests")}</h3>
            
          </div>
          
          <RequestsGrouping
    filters={filters}
    setFilters={setFilters}
    passengerRequests={passengerRequests}
    setPassengerRequests={setPassengerRequests}
    onCheckboxClick={handleCheckboxClick}
    onUpdateRightTable={fetchUpdatedRequests}
    syncSelectedRequests={syncSelectedRequests}
    onRefreshRequests={fetchPassengerRequests}
/>
        

          <div className="name-container">
            <h3>{t("ordered_passenger_list")}</h3>
          </div>

          <div style={{ marginTop: "20px" }} className="filter-container">
            {/* <label>
              {t("start_time")}:
              <input
                type="datetime-local"
                name="start_date"
                value={
                  filters.start_date
                    ? dayjs(filters.start_date).format("YYYY-MM-DDTHH:mm")
                    : ""
                }
                onChange={handleFilterChange}
              />
            </label> */}

            {/* <label>
              {t("end_time")}:
              <input
                type="datetime-local"
                name="end_date"
                value={
                  filters.end_date
                    ? dayjs(filters.end_date).format("YYYY-MM-DDTHH:mm")
                    : ""
                }
                onChange={handleFilterChange}
              />
              <div style={{ marginTop: "20px" }}> </div>
            </label> */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
  <label>Start Date:</label>
  <input
    type="datetime-local"
    value={dayjs(startDate).format("YYYY-MM-DDTHH:mm")}
    onChange={(e) => setStartDate(dayjs(e.target.value))}
  />
  <label>End Date:</label>
  <input
    type="datetime-local"
    value={dayjs(endDate).format("YYYY-MM-DDTHH:mm")}
    onChange={(e) => setEndDate(dayjs(e.target.value))}
  />
  <button onClick={handleSyncWithStorage}>Синхронізувати</button>
</div>

            <label>
              {t("direction")}:
              <select name="direction" onChange={handleFilterChange}>
                <option value="">{t("all")}</option>
                <option value="HOME_TO_WORK">{t("home_to_work")}</option>
                <option value="WORK_TO_HOME">{t("work_to_home")}</option>
              </select>
            </label>
            <label>
              {t("is_active")}:
              <select name="is_active" onChange={handleFilterChange}>
                <option value="">{t("all")}</option>
                <option value="true">{t("active")}</option>
                <option value="false">{t("inactive")}</option>
              </select>
            </label>
            <div style={{ marginTop: "20px" }}> </div>

            <label>
              {t("search_by_name")}:
              <input
                type="text"
                name="search_query"
                placeholder={t("enter_name_or_last_name")}
                onChange={handleFilterChange}
              />
            </label>
            {/* <label>
              {t("start_city")}:
              <input
                type="text"
                name="start_city"
                onChange={handleFilterChange}
              />
            </label> */}
          </div>
          <div className="grid-container">
            <div
              className="ag-theme-alpine"
              style={{ height: 500, width: "100%" }}
            >
              <AgGridReact
                rowData={passengerLists}
                columnDefs={enhancedColumnDefs}
                pagination={true}
                paginationPageSize={20}
                domLayout="normal"
                onRowDoubleClicked={handleListDoubleClick}
                getRowStyle={getRowStyle2}
               
              />
              ;
            </div>
          </div>
        </div>
        {/* Right Column */}
        <div className="gltr-template2s-right-column">
          {/* <div className="gltr-template2s-upper-right"> */}
          <div className="name-container">
            <h3>{t("new_list_summary")}</h3>
          </div>
          <div className="left-filter-container">
            {routeDetails.distance !== null ? (
              <h3>
                {t("direction")}: {routeDetails.startAddress} →{" "}
                {routeDetails.endAddress} <strong>&#8226;</strong>{" "}
                {t("distance")}: {routeDetails.distance} km{" "}
                <strong>&#8226;</strong> {t("estimated_time")}:{" "}
                {routeDetails.duration} <strong>&#8226;</strong>{" "}
                {t("stop_count")}: {routeDetails.stops.length} <strong>&#8226;</strong>{" "}
                {t("passenger_count")}: {routeDetails.passengers}
              </h3>
            ) : (
              <p>{t("no_route_data")}</p>
            )}
            <div>
            {routeSettings && (
                <div className="route-settings-summary">
                  <h3>{t("configured_route_limits")}:</h3>
                  <p>
                    {t("date_interval")}: <span style={{ color: 'yellow', fontWeight: 'bold' }}>{routeSettings.date_interval}</span> {t("days")} <strong>&#8226;</strong> 
                    {t("arrival_time_tolerance")}: <span style={{ color: 'yellow', fontWeight: 'bold' }}>{routeSettings.arrival_time_tolerance}</span> {t("minutes")} <strong>&#8226;</strong> 
                    {t("allow_mixed_directions")}: <span style={{ color: 'yellow', fontWeight: 'bold' }}>{routeSettings.allow_mixed_directions ? t("yes") : t("no")}</span> <strong>&#8226;</strong> 
                    {t("max_route_duration")}: <span style={{ color: 'yellow', fontWeight: 'bold' }}>{routeSettings.max_route_duration}</span> {t("minutes")} <strong>&#8226;</strong> 
                    {t("max_route_distance")}: <span style={{ color: 'yellow', fontWeight: 'bold' }}>{routeSettings.max_route_distance}</span> {t("km")} <strong>&#8226;</strong> 
                    {t("max_stops")}: <span style={{ color: 'yellow', fontWeight: 'bold' }}>{routeSettings.max_stops}</span> <strong>&#8226;</strong> 
                    {t("max_passengers")}: <span style={{ color: 'yellow', fontWeight: 'bold' }}>{routeSettings.max_passengers}</span> <strong>&#8226;</strong> 
                    {t("min_passengers")}: <span style={{ color: 'yellow', fontWeight: 'bold' }}>{routeSettings.min_passengers}</span> <strong>&#8226;</strong> 
                    {t("allow_multiple_work_addresses")}: <span style={{ color: 'yellow', fontWeight: 'bold' }}>{routeSettings.allow_multiple_work_addresses ? t("yes") : t("no")}</span><strong>&#8226;</strong>
                    {t("strategy")}: <span style={{ color: 'yellow', fontWeight: 'bold' }}>{t(`strategy.${routeSettings.strategy}`)}</span> <strong>&#8226;</strong>
                    {t("automatically_save")}: <span style={{ color: 'yellow', fontWeight: 'bold' }}>{routeSettings.auto_save ? t("yes") : t("no")}</span><strong>&#8226;</strong>

                  </p>
                </div>
              )}
              
            </div>
          </div>
          <div className="grid-container">
            <div
              className="ag-theme-alpine"
              style={{ height: "50%", marginTop: "20px" }}
            >
              <AgGridReact
  key={JSON.stringify(selectedRequests)}
  rowData={selectedRequests}
  columnDefs={createColumnDefs(false)}
  rowDragManaged={true}
  animateRows={true}
  getRowStyle={getRowStyle}
  pagination={false}
  getRowNodeId={(data) => data.id.toString()}
  suppressRowTransform={true}
  suppressMoveWhenRowDragging={true}
  onRowDragEnd={handleRowDragEnd}
  onRowDragEnter={handleRowDragEnter}
  domLayout="normal"
/>

            </div>
          </div>
          <div className="button-container">
          <button className="nav-button"
               onClick={handleClearList}>
              {t("clear_list")}
            </button>

          <button
                  className="nav-button"
                  onClick={() => navigate("/user-routes-settings")}
                >
                  {t("user_routes_settings")}
                </button>
            {/* <div className="route-buttons"> */}
            <button className="nav-button" onClick={calculateRoute}>
              {t("calculate_route")}
            </button>
            <button className="nav-button" onClick={handleShowMap}>
            {t("show_on_map")}
            </button>
             {/* Спливаюче вікно для порівняння маршрутів */}
             <RouteComparisonModal
  modalData={modalData}
  onClose={() => setModalData({ show: false })}
  onAcceptOptimized={acceptOptimizedRoute}
  onAcceptStandard={acceptStandardRoute}
  onShowMap={handleShowMap}
/>
{violationModal.show && (
  <div className="violation-modal">
    <h2>{t("violated_constraints")}</h2>
    <ul>
      {violationModal.violations.map((v, index) => (
        <li key={index}>{t(v)}</li>
      ))}
    </ul>
    <button onClick={() => setViolationModal({ show: false, violations: [] })}>
      {t("close")}
    </button>
  </div>
)}

{showMapModal && (
  <RouteMapModal
    modalData={modalData}
    onClose={() => setShowMapModal(false)}
  />
)}
            <button
              className="nav-button"
              onClick={saveList}
              disabled={!isRouteCalculated || selectedRequests.length === 0}
            >
              {t("save_list")}
            </button>
            {/* </div> */}
          </div>
          {/* </div> */}

          <div className="gltr-template2s-lower-right">
            <div className="name-container">
              <h3>{t("list_summary")}</h3>
            </div>
            <div style={{ marginTop: "20px" }} className="filter-container">
              {" "}
              <div>
                <p style={{ color: "white" }}>
                  <strong>ID:</strong>{" "}
                  {selectedListDetails ? selectedListDetails.id : "N/A"},{" "}
                  {selectedListInfo}
                </p>

                <p></p>
              </div>
            </div>
            <div className="grid-container">
              <div className="ag-theme-alpine" style={{ height: "50%" }}>
                {selectedListDetails && (
                  <div
                    className="ag-theme-alpine"
                    style={{ height: 300, width: "100%", color: "white" }}
                  >
                    <AgGridReact
                      key={JSON.stringify(selectedListPassengers)}
                      rowData={
                        selectedListPassengers.length
                          ? selectedListPassengers
                          : []
                      }
                      columnDefs={tripRequestsColumnDefs}
                      getRowStyle={getRowStyle2}
                      pagination
                      paginationPageSize={20}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="button-container">
              {/* <div className="route-buttons"> */}
              {/* <button className="nav-button" onClick={calculateRoute}>
                {t("calculate_route")}
              </button> */}
              {/* <button
                className="nav-button"
                onClick={saveList}
                disabled={!isRouteCalculated || selectedRequests.length === 0}
              >
                {t("save_list")}
              </button> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default GroupingListToRoute;
