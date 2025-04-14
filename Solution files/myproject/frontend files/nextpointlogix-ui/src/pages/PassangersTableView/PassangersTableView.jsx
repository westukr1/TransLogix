import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import SelectAllCheckbox from "../../components/SelectAllCheckbox";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./PassangersTableView.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ToggleSwitch from "../../components/ToggleSwitch";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../config/apiConfig";

// Форма для додавання пасажира
const PassengerForm = ({ onClose, onSave }) => {
  const { t } = useTranslation(); // Додаємо переклад
  const [passengerData, setPassengerData] = useState({
    firstName: "",
    lastName: "",
    department: "",
    pickupAddresses: [
      {
        country: "",
        region: "",
        city: "",
        district: "",
        street: "",
        house_number: "",
        latitude: "",
        longitude: "",
        point_type: "pickup",
      },
    ],
    dropoffAddresses: [
      {
        country: "",
        region: "",
        city: "",
        district: "",
        street: "",
        house_number: "",
        latitude: "",
        longitude: "",
        point_type: "dropoff",
      },
    ],
    workAddresses: [
      {
        country: "Україна",
        region: "",
        city: "",
        district: "",
        street: "",
        house_number: "",
        latitude: "",
        longitude: "",
        point_type: "work",
      },
    ], // Новий тип "Робота"
    phoneNumber: "",
    email: "",
  });
};

// Таблиця з пасажирами
const PassengersTableView = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // Підключаємо функцію перекладу та i18n
  // Отримуємо мову з LocalStorage під час завантаження компонента
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  const [passengersRowData, setPassengersRowData] = useState([]);
  const [routesRowData, setRoutesRowData] = useState([]);
  const [filteredRoutesRowData, setFilteredRoutesRowData] = useState([]);
  const [locationsRowData, setLocationsRowData] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [showForm, setShowForm] = useState(false); // Ініціалізація стану для форми
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [selectedPassengerNames, setSelectedPassengerNames] = useState([]);
  const [filterBySelected, setFilterBySelected] = useState(true);
  const [isActiveFilter, setIsActiveFilter] = useState(true); // Додаємо стан для фільтру активності
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 15))
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 15))
  );
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  // const [startDate, setStartDate] = useState(new Date(Date.now() - 15 * 24 * 60 * 60 * 1000));
  // const [endDate, setEndDate] = useState(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000));
  // const [filteredRoutesRowData, setFilteredRoutesRowData] = useState([]);
  const [showActiveOnly, setShowActiveOnly] = useState(true);

  const handleToggleActive = async (passengerId, currentValue) => {
    const confirmation = window.confirm(
      currentValue ? t("are_you_sure_deactivate") : t("are_you_sure_activate")
    );
    if (!confirmation) return;

    setPassengersRowData(prevData =>
      prevData.map(row =>
        row.id === passengerId ? { ...row, is_active: !currentValue } : row
      )
    );

    try {
      const response = await axios.post(
        API_ENDPOINTS.togglePassengerActive(passengerId),
        { is_active: !currentValue }
      );
      setPassengersRowData(prevData =>
        prevData.map(row =>
          row.id === passengerId ? { ...row, is_active: response.data.is_active } : row
        )
      );
    } catch (error) {
      console.error("Error updating active status:", error);
      setPassengersRowData(prevData =>
        prevData.map(row =>
          row.id === passengerId ? { ...row, is_active: currentValue } : row
        )
      );
    }
  };

  const handleCheckboxChange = async (passengerId, currentValue) => {
    try {
      const response = await axios.post(
        API_ENDPOINTS.togglePassengerSelect(passengerId),
        { is_selected: !currentValue }
      );

      setPassengersRowData(prevData =>
        prevData.map(row =>
          row.id === passengerId
            ? { ...row, is_selected: response.data.is_selected }
            : row
        )
      );

      if (filterBySelected) {
        filterBySelectedPassengers();
      }
    } catch (error) {
      console.error("Error updating selection status:", error);
    }
  };
 

  const handleSelectAll = async (checked) => {
    setSelectAllChecked(checked);

    const updatedData = passengersRowData.map((row) => ({
      ...row,
      is_selected: checked,
    }));
    setPassengersRowData(updatedData);

    try {
      const response = await axios.post(
        API_ENDPOINTS.toggleSelectAll,
        { is_selected: checked }
      );

      if (filterBySelected) {
        filterBySelectedPassengers();
      }

      if (response.status === 200) {
        console.log("toggle SelectAll selected");
      } else {
        throw new Error("Failed to update selection status for all passengers");
      }
    } catch (error) {
      console.error(
        "Error updating selection status for all passengers:",
        error
      );
      setPassengersRowData((prevData) =>
        prevData.map((row) => ({
          ...row,
          is_selected: !checked,
        }))
      );
    }
  };


  // Функція для форматування адреси пасажира
  const formatAddress = (passenger) => {
    if (passenger) {
      const { country, region, district, city, street, house_number } =
        passenger;
      const formattedAddress = [
        street,
        house_number,
        city,
        region,
        district,
        country,
      ]
        .filter(Boolean)
        .join(", ");
      return formattedAddress || "Адреса не вказана";
    }
    return "Адреса не вказана";
  };

  const filterBySelectedPassengers = () => {
    const selectedPassengerIds = passengersRowData
      .filter((passenger) => passenger.is_selected)
      .map((passenger) => passenger.id);

    setRoutesRowData(
      routesRowData.filter((route) =>
        selectedPassengerIds.includes(route.passenger_id)
      )
    );
    setLocationsRowData(
      locationsRowData.filter((location) =>
        selectedPassengerIds.includes(location.passenger_id)
      )
    );
  };
  const toggleFilterBySelected = () => {
    setFilterBySelected((prev) => !prev);
  };
  useEffect(() => {
    if (filterBySelected) {
      filterBySelectedPassengers();
    } else {
      fetchRoutes();
      fetchLocations();
    }
  }, [filterBySelected, passengersRowData]);

  const handleRowDoubleClick = (passenger) => {
    console.log("Передані дані пасажира:", passenger); // Логування об'єкта з даними пасажира
    navigate(`/edit-passenger/${passenger.id}`, {
      state: { passengerData: passenger },
    });
  };

  const fetchCoordinates = async () => {
    const isActiveParam = showActiveOnly ? "true" : "";
    const endpoint = filterBySelected
      ? API_ENDPOINTS.filteredCoordinates(isActiveParam)
      : API_ENDPOINTS.allCoordinates(isActiveParam);

    console.log("showActiveOnly:", showActiveOnly);
    console.log("filterBySelected:", filterBySelected);
    console.log("Fetching from endpoint:", endpoint);

    try {
      const response = await axios.get(endpoint);
      let data = response.data;

      if (!Array.isArray(data)) {
        console.error("Data format is not an array:", data);
        data = [];
      }

      const formattedData = data.map((point) => ({
        point_type: point.point_type || "",
        latitude: point.latitude || "",
        longitude: point.longitude || "",
        country: point.country || "",
        region: point.region || "",
        city: point.city || "",
        district: point.district || "",
        street: point.street || "",
        house_number: point.house_number || "",
        created_by: point.created_by || "",
        owner: point.owner || "",
        owner_id: point.owner_id || "",
        owner_first_name: point.owner_first_name || "",
        owner_last_name: point.owner_last_name || "",
        id: point.id || "",
        is_active: point.is_active || false,
      }));

      setLocationsRowData(formattedData);
    } catch (error) {
      console.error("Error fetching coordinate points:", error);
      setLocationsRowData([]);
    }
  };
  const handleToggleCoordinateActive = async (coordinatePointId, currentValue) => {
    const confirmation = window.confirm(
      currentValue ? t("are_you_sure_deactivate") : t("are_you_sure_activate")
    );
    if (!confirmation) return;

    console.log("Toggling active status for coordinatePointId:", coordinatePointId);
    setLocationsRowData(prevData =>
      prevData.map(row =>
        row.id === coordinatePointId ? { ...row, is_active: !currentValue } : row
      )
    );

    try {
      const response = await axios.post(
        API_ENDPOINTS.toggleCoordinateActive(coordinatePointId),
        { is_active: !currentValue }
      );

      setLocationsRowData(prevData =>
        prevData.map(row =>
          row.id === coordinatePointId ? { ...row, is_active: response.data.is_active } : row
        )
      );
    } catch (error) {
      console.error("Error updating active status:", error);
      setLocationsRowData(prevData =>
        prevData.map(row =>
          row.id === coordinatePointId ? { ...row, is_active: currentValue } : row
        )
      );
    }
  };

  const handleAddressRowDoubleClick = (address) => {
    const { id: coordinatePointId, owner_id: passengerId } = address; // Використовуємо owner_id замість passenger_id
    console.log(
      "Navigating with passengerId:",
      passengerId,
      "and coordinatePointId:",
      coordinatePointId
    );
    navigate(`/edit-passenger-addresses`, {
      state: { passengerId, coordinatePointId },
    });
  };

  // Оновлені назви колонок відповідно до полів з SQL
  const [passengersColumnDefs] = useState([
    {
      field: "is_selected",
      headerName: "select",
      width: 30,
      headerComponentFramework: (params) => (
        <SelectAllCheckbox
          selectAllChecked={selectAllChecked}
          onToggleSelectAll={handleSelectAll}
        />
      ),
      cellRenderer: (params) => (
        <input
          type="checkbox"
          checked={params.data.is_selected}
          onChange={() =>
            handleCheckboxChange(params.data.id, params.data.is_selected)
          }
        />
      ),
    },
    { field: "last_name", headerName: t("last_name") },
    { field: "first_name", headerName: t("first_name") },
    { field: "phone_number", headerName: t("phone_number") },
    { field: "department", headerName: t("department") },

    // Кожен компонент адреси виводимо в окремій колонці
    {
      field: "pickup_address.city",
      headerName: t("city"),
      valueGetter: (params) => params.data.city || "",
    },
    {
      field: "pickup_address.street",
      headerName: t("street"),
      valueGetter: (params) => params.data.street || "",
    },
    {
      field: "pickup_address.house_number",
      headerName: t("house_number"),
      valueGetter: (params) => params.data.house_number || "",
    },

    {
      field: "pickup_address.district",
      headerName: t("district"),
      valueGetter: (params) => params.data.district || "",
    },
    {
      field: "pickup_address.region",
      headerName: t("region"),
      valueGetter: (params) => params.data.region || "",
    },
    {
      field: "pickup_address.country",
      headerName: t("country"),
      valueGetter: (params) => params.data.country || "",
    },
    {
      field: "pickup_address.latitude",
      headerName: t("latitude"),
      valueGetter: (params) => params.data.latitude || "",
    },
    {
      field: "pickup_address.longitude",
      headerName: t("longitude"),
      valueGetter: (params) => params.data.longitude || "",
    },

    { field: "email", headerName: t("email") },
    {
      field: "id",
      headerName: "ID",
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }, // Вирівнювання по центру
    },
    {
      field: "is_active",
      headerName: t("active"),
      cellRenderer: (params) => (
        <ToggleSwitch
          checked={params.data.is_active}
          onChange={() =>
            handleToggleActive(params.data.id, params.data.is_active)
          }
        />
      ),
      width: 100,
    },
  ]);

  const handleSavePassenger = (data, close) => {
    // Логіка для збереження пасажира в базу даних
    console.log("Saving passenger:", data);
    if (close) {
      setShowForm(false);
    }
  };

  const [routesColumnDefs] = useState([
    { field: "route_number", headerName: t("route_number") },
    { field: "origin", headerName: t("origin") },
    { field: "destination", headerName: t("destination") },
    { field: "date", headerName: t("date") },
    // Адреса початкової точки
    {
      headerName: t("start_location"),
      children: [
        { field: "start_city", headerName: t("city"), filter: true },
        { field: "start_street", headerName: t("street"), filter: true },
        { field: "start_house", headerName: t("house_number"), filter: true },
      ],
    },

    // Адреса кінцевої точки
    {
      headerName: t("end_location"),
      children: [
        { field: "end_city", headerName: t("city"), filter: true },
        { field: "end_street", headerName: t("street"), filter: true },
        { field: "end_house", headerName: t("house_number"), filter: true },
      ],
    },
    {
      field: "distance",
      headerName: t("distance"),
      filter: true,
      valueFormatter: (params) => `${parseFloat(params.value).toFixed(2)} km`, // Форматування для distance
    },
    {
      field: "estimated_time",
      headerName: t("estimated_time"),
      filter: true,
      valueFormatter: (params) => {
        const hours = Math.floor(params.value / 60);
        const minutes = params.value % 60;
        return `${hours}h ${minutes}m`; // Конвертація estimated_time
      },
    },
  ]);

  const [locationsColumnDefs] = useState([
    { field: "point_type", headerName: t("point_type") },
    {
      field: "latitude",
      headerName: t("latitude"),
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }, // Вирівнювання по центру
    },
    {
      field: "longitude",
      headerName: t("longitude"),
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }, // Вирівнювання по центру
    },
    { field: "country", headerName: t("country") },
    { field: "region", headerName: t("region") },
    { field: "city", headerName: t("city") },
    { field: "district", headerName: t("district") },
    { field: "street", headerName: t("street") },
    {
      field: "house_number",
      headerName: t("house_number"),
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }, // Вирівнювання по центру
    },
    // { field: 'created_by', headerName: t('created_by') }, відновити, коли будуть додані додатки пасажира

    { field: "owner_first_name", headerName: t("owner") },
    { field: "owner_last_name", headerName: t("last_name") },
    {
      field: "owner_id",
      headerName: t("owner_id"),
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    { field: "id", headerName: t("point_id") },
    {
      field: "is_active",
      headerName: t("active"),
      cellRenderer: (params) => (
        <ToggleSwitch
          checked={params.data.is_active}
          onChange={() =>
            handleToggleCoordinateActive(params.data.id, params.data.is_active)
          }
        />
      ),
      width: 100,
    },
  ]);

  const fetchRoutes = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.getFilteredRoutes);
      const data = response.data;
      setRoutesRowData(data);
      setFilteredRoutesRowData(data);
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };
  // Фільтрація маршрутів за діапазоном дат
  useEffect(() => {
    const filteredData = routesRowData.filter((route) => {
      const routeDate = new Date(route.date);
      return routeDate >= startDate && routeDate <= endDate;
    });
    setFilteredRoutesRowData(filteredData);
  }, [startDate, endDate, routesRowData]);

  const fetchLocations = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.filteredCoordinates());
      const data = response.data;
      setLocationsRowData(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  // Оновлена функція fetchPassengers для завантаження з фільтром is_active
  const fetchPassengers = async (isActive = isActiveFilter) => {
    try {
      const response = await axios.get(API_ENDPOINTS.getPassengers(isActive));
      const data = response.data;
      console.log("Fetched passengers:", data);
      setPassengersRowData(data);
    } catch (error) {
      console.error("Error fetching passengers:", error);
    }
  };
  // Функція для перемикання фільтра активності
  const toggleIsActiveFilter = () => {
    setIsActiveFilter((prev) => !prev);
  };
  // Викликаємо fetchPassengers при завантаженні компонента або зміні фільтра isActive
  useEffect(() => {
    fetchPassengers();
    console.log(`Fetching passengers with is_active = ${isActiveFilter}`);
  }, [isActiveFilter]);

  // Завантаження даних маршрутів з урахуванням фільтрації
  useEffect(() => {
    const fetchRoutes = async () => {
      const endpoint = filterBySelected
        ? API_ENDPOINTS.getFilteredRoutes
        : API_ENDPOINTS.getAllRoutes;
  
      try {
        const response = await axios.get(endpoint);
        const data = response.data;
  
        if (Array.isArray(data)) {
          const formattedData = data.map((route) => ({
            route_number: route.route_number,
            origin: route.start_point?.city || "",
            destination: route.end_point?.city || "",
            start_city: route.start_point?.city || "",
            start_street: route.start_point?.street || "",
            start_house: route.start_point?.house_number || "",
            end_city: route.end_point?.city || "",
            end_street: route.end_point?.street || "",
            end_house: route.end_point?.house_number || "",
            date: route.date,
            distance: route.distance,
            estimated_time: route.estimated_time,
          }));
          setRoutesRowData(formattedData);
        } else {
          console.error("Data format is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };
  
    fetchRoutes();
  }, [filterBySelected, passengersRowData]);
  
  useEffect(() => {
    console.log("useEffect triggered. Current values:", {
      showActiveOnly,
      filterBySelected,
      passengersRowData,
    });

    fetchCoordinates();
  }, [showActiveOnly, filterBySelected, passengersRowData]);

  
  // Функція для оновлення імен вибраних пасажирів
  const updateSelectedPassengerNames = () => {
    const selectedNames = passengersRowData
      .filter((passenger) => passenger.is_selected)
      .map((passenger) => `${passenger.first_name} ${passenger.last_name}`);
    setSelectedPassengerNames(selectedNames);
  };

  useEffect(() => {
    // Викликаємо функцію для оновлення імен, коли змінюється фільтрація або список пасажирів
    updateSelectedPassengerNames();
  }, [filterBySelected, passengersRowData]);

  // Заголовки для таблиць з урахуванням фільтрації
  const passengerRoutesTitle = filterBySelected
    ? `${t("passenger_routes_filtered")}: ${selectedPassengerNames.join(", ")}`
    : t("passenger_routes_filtered");
  const coordinatePointsTitle = filterBySelected
    ? `${t("coordinate_points_filtered")}: ${selectedPassengerNames.join(", ")}`
    : t("coordinate_points_filtered");

  return (
    <div className="passenger-table-view">
      <div className="ptw-header">
        <div className="logo">
          <img src="/logo.png" alt="NextPointLogix" />
        </div>
        <div className="nav-buttons">
          <button className="nav-button" onClick={() => window.history.back()}>
            {t("back")}
          </button>
        </div>
      </div>

      <div className="passenger-table-content" style={{ height: 1000 }}>
        <div className="passenger-left-column">
          <h2> </h2>
          <Link to="/create-passenger" className="ptv-add-passenger-button">
            {t("add_passenger")}
          </Link>{" "}
          {/* Виправлено для навігації */}
        </div>

        <div
          className="passenger-right-column"
          style={{ height: 1000, width: "90%", overflowX: "auto" }}
        >
          {/* Відображаємо форму або таблиці залежно від стану */}
          {showForm ? (
            <PassengerForm
              onClose={() => setShowForm(false)}
              onSave={handleSavePassenger}
            />
          ) : (
            <>
              <div className="passenger-upper-right">
                <h2>{t("passenger_list")}</h2>
                <div className="select-all-container">
                  <label className="small-font">
                    <input
                      type="checkbox"
                      checked={selectAllChecked}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                    {t("select_all")}
                  </label>
                  <label className="small-font">
                    <input
                      type="checkbox"
                      checked={filterBySelected}
                      onChange={toggleFilterBySelected}
                    />
                    {t("filter_by_selected")}
                  </label>
                  <label className="small-font">
                    <input
                      type="checkbox"
                      checked={isActiveFilter}
                      onChange={() => setIsActiveFilter(!isActiveFilter)}
                    />
                    {t("Show_Active")}
                  </label>
                </div>
                <div
                  className="ag-theme-alpine"
                  style={{ height: "30%", width: "100%", overflowX: "auto" }}
                >
                  <AgGridReact
                    headerHeight={20} // Висота заголовків
                    rowHeight={20}
                    rowData={passengersRowData}
                    columnDefs={passengersColumnDefs}
                    onRowDoubleClicked={(params) =>
                      handleRowDoubleClick(params.data)
                    }
                    defaultColDef={{
                      sortable: true,
                      filter: true,
                      flex: 1,
                      minWidth: 100,
                    }}
                    animateRows={true}
                    sortingOrder={["desc", "asc"]}
                    pagination={true} // Додаємо пагінацію
                    paginationPageSize={10} // Кількість рядків на сторінку
                  />
                </div>
              </div>

              <div className="passenger-upper-right">
                <h2>{passengerRoutesTitle}</h2>
                {/* Фільтр за діапазоном дат */}
                <div
                  style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}
                >
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Start Date"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="End Date"
                  />
                </div>
                <div
                  className="ag-theme-alpine"
                  style={{ height: "30%", width: "100%", overflowX: "auto" }}
                >
                  <AgGridReact
                    headerHeight={20} // Висота заголовків
                    rowHeight={20}
                    rowData={filteredRoutesRowData}
                    columnDefs={routesColumnDefs}
                    defaultColDef={{
                      sortable: true,
                      filter: true,
                      flex: 1,
                      minWidth: 100,
                    }}
                    animateRows={true}
                    sortingOrder={["desc", "asc"]}
                    // Додаємо параметри пагінації
                    pagination={true}
                    paginationPageSize={10} // 10 записів на сторінку
                  />
                </div>
              </div>

              <div className="passenger-upper-right">
                <h2>{coordinatePointsTitle}</h2>
                <label className="small-font">
                  <input
                    type="checkbox"
                    checked={showActiveOnly}
                    onChange={(e) => setShowActiveOnly(e.target.checked)}
                  />
                  {t("show_active_only")}
                </label>
                <div
                  className="ag-theme-alpine"
                  style={{ height: "30%", width: "100%", overflowX: "auto" }}
                >
                  <AgGridReact
                    headerHeight={20} // Висота заголовків
                    rowHeight={20}
                    rowData={locationsRowData}
                    columnDefs={locationsColumnDefs}
                    onRowDoubleClicked={(params) =>
                      handleAddressRowDoubleClick(params.data)
                    }
                    defaultColDef={{
                      sortable: true,
                      filter: true,
                      flex: 1,
                      minWidth: 100,
                    }}
                    animateRows={true}
                    sortingOrder={["desc", "asc"]}
                    // Додаємо параметри пагінації
                    pagination={true}
                    paginationPageSize={10} // 10 записів на сторінку
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PassengersTableView;
