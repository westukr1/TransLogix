
import React, { useEffect, useMemo, useState } from "react";


import { useTranslation } from "react-i18next";



import { useNavigate } from "react-router-dom";



import DatePicker from "react-datepicker";



import "react-datepicker/dist/react-datepicker.css";



import { AgGridReact } from "ag-grid-react";



import "ag-grid-community/styles/ag-grid.css";



import "ag-grid-community/styles/ag-theme-alpine.css";



import axios from "../../utils/axiosInstance";



import { API_ENDPOINTS } from "../../config/apiConfig";



import dayjs from "dayjs";
import { DAY_IN_MS, getInitialDateRange } from "../../utils/dateRange";



import "./PassengerList.css";

const DATE_RANGE_STORAGE_KEY = "passengerListDateRange";

const PassengerList = ({ passengers }) => {



  const { t } = useTranslation();



  const navigate = useNavigate();
  const initialDateRange = useMemo(() => getInitialDateRange(), []);
  const userLanguage = localStorage.getItem("i18nextLng") || "en"; // Задайте за замовчуванням "en"

  const [startDate, setStartDate] = useState(initialDateRange.start);
  const [endDate, setEndDate] = useState(initialDateRange.end);

  const [passengerData, setPassengerData] = useState([]);



  const [requests, setRequests] = useState([]);



  const [searchQuery, setSearchQuery] = useState("");



  const [loading, setLoading] = useState(false);



  const [allRequests, setAllRequests] = useState([]);



  const [unselectedRequests, setUnselectedRequests] = useState([]);



  const [selectedRequests, setSelectedRequests] = useState([]);



  const [directionFilter, setDirectionFilter] = useState("WORK_TO_HOME");



  const [allowMixedDirections, setAllowMixedDirections] = useState(false);



  const [allowExtendedInterval, setAllowExtendedInterval] = useState(false);



  const [showAllRequests, setShowAllRequests] = useState(false);



  const [routeSettings, setRouteSettings] = useState(null);



  const [routeDetails, setRouteDetails] = useState({



    distance: null,



    duration: null,



    stops: null,



    passengers: null,



    startAddress: null,



    endAddress: null,
  });
  useEffect(() => {
    const storedRange = sessionStorage.getItem(DATE_RANGE_STORAGE_KEY);

    if (storedRange) {
      try {
        const parsedRange = JSON.parse(storedRange);
        if (parsedRange.startDate && parsedRange.endDate) {
          setStartDate(new Date(parsedRange.startDate));
          setEndDate(new Date(parsedRange.endDate));
        }
      } catch (error) {
        console.error("Failed to parse stored date range:", error);
      }
    }

    setDatesInitialized(true);
  }, []);

  useEffect(() => {
    if (!datesInitialized || !startDate || !endDate) {
      return;
    }

    sessionStorage.setItem(
      DATE_RANGE_STORAGE_KEY,
      JSON.stringify({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      })
    );
  }, [startDate, endDate, datesInitialized]);

  // 🔄 Отримання налаштувань маршруту
  useEffect(() => {
    const fetchRouteSettings = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.getSettings);
        setRouteSettings(response.data);
      } catch (error) {
        console.error("Error fetching route settings:", error);
      }
    };

    fetchRouteSettings();
  }, []);

  const fetchRequests = () => {



    const start = dayjs(startDate).format("YYYY-MM-DD HH:mm:ss");



    const end = dayjs(endDate).format("YYYY-MM-DD HH:mm:ss");



    console.log("Відправка запиту на бекенд:", {



      start_date: start,



      end_date: end,



    });



    axios
      .get(API_ENDPOINTS.getFilteredTripRequests, {
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
        setSelectedRequests([]);
        applyFilters(data);
      })
      .catch((error) => console.error("Error fetching requests data:", error));
  };


  const applyFilters = (data) => {



    const filteredData = data.filter((request) => {



      if (directionFilter === "ALL") {



        return true; // Показуємо всі заявки



      }



      if (request.direction !== directionFilter) {



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



  useEffect(() => {



    fetchRequests();



  }, [



    startDate,



    endDate,



    searchQuery,



    directionFilter,



    allowMixedDirections,



    allowExtendedInterval,



  ]);



  const handleStartDateChange = (date) => {
    if (!date) {
      return;
    }

    setStartDate(date);



    if (!allowExtendedInterval) {

      setEndDate(new Date(date.getTime() + DAY_IN_MS));

    }



  };



  const handleEndDateChange = (date) => {
    if (!date) {
      return;
    }

    setEndDate(date);



  };



  const toggleAllowExtendedInterval = () => {



    setAllowExtendedInterval((prev) => {



      const next = !prev;



      if (!next) {



        setEndDate(new Date(startDate.getTime() + DAY_IN_MS));



      }



      return next;



    });



  };



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



    const origin = `${selectedRequests[0].pickup_latitude},${selectedRequests[0].pickup_longitude}`;



    const destination = `${



      selectedRequests[selectedRequests.length - 1].dropoff_latitude



    },${selectedRequests[selectedRequests.length - 1].dropoff_longitude}`;



    const waypoints = selectedRequests



      .slice(1, -1)



      .map(



        (request) => `${request.pickup_latitude},${request.pickup_longitude}`



      );



      try {



        const response = await axios.post(API_ENDPOINTS.calculateRoute, {



          origin,



          destination,



          waypoints,



          language: userLanguage,



        }



      );



      const formatAddress = (address) => {



        const parts = address.split(",");



        if (parts.length >= 3) {



          const Street = parts[0].trim(); // Номер будинку та вулиця



          const house = parts[1].trim();



          const city = parts[2].trim(); // Місто



          return `${city}, ${Street}, ${house}`;



        }



        return address; // Якщо формат не відповідає очікуваному



      };



      const formatDuration = (minutes) => {



        const hours = Math.floor(minutes / 60); // Цілі години



        const remainingMinutes = Math.round(minutes % 60); // Округлення хвилин



        return `${hours}h ${remainingMinutes}m`;



      };



      setRouteDetails({



        distance: Math.round(response.data.distance),



        duration: formatDuration(response.data.duration),



        stops: response.data.stops,



        passengers: selectedRequests.length,



        startAddress: formatAddress(response.data.start_address),



        endAddress: formatAddress(response.data.end_address),



      });



      alert(t("route_calculated"));



    } catch (error) {



      console.error("Error calculating route:", error);



      alert(t("error_calculating_route"));



    }



  };



  return (



    <div className="rm-passenger-list">



      <div className="passenger-requests-controls">



        <label htmlFor="passenger-list-search">{t("search_by_name")}</label>



      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={t("enter_name_or_last_name")}
        className="form-control"
        style={{ marginBottom: "20px" }}
      />
      <div className="date-range-picker">
        <div className="date-picker-field">
          <label>{t("start_date")}</label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            showTimeSelect
            timeIntervals={15}
            timeFormat="HH:mm"
            dateFormat="dd.MM.yyyy HH:mm"
            className="date-picker-input"
          />
        </div>
        <div className="date-picker-field">
          <label>{t("end_date")}</label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            showTimeSelect
            timeIntervals={15}
            timeFormat="HH:mm"
            dateFormat="dd.MM.yyyy HH:mm"
            className="date-picker-input"
          />
        </div>
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



      </div>



      <div



        className="ag-theme-alpine"



        style={{ height: "50%", marginTop: "20px" }}



      >



        <AgGridReact



          key={JSON.stringify(unselectedRequests)}



          rowData={unselectedRequests}



          columnDefs={[



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



  );



};



export default PassengerList;



