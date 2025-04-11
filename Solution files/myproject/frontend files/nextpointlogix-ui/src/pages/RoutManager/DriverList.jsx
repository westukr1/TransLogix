import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./DriverList.css";
import axios from "../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../config/apiConfig";


const DriverList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [driverRowData, setDriverRowData] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.getDrivers);
        console.log("Список водіїв:", response.data);
        // setDriverRowData(response.data); // якщо потрібно
      } catch (error) {
        console.error("❌ Помилка отримання списку водіїв:", error);
      }
    };
    fetchDrivers();
  }, []);
  

  const driverColumnDefs = [
    {
      headerName: t("driver_id"),
      field: "driver_id",
      editable: false,
      width: 80,
    },
    {
      headerName: t("last_name"),
      field: "last_name",
      editable: true,
      width: 120,
    },
    {
      headerName: t("first_name"),
      field: "first_name",
      editable: true,
      width: 120,
    },
    {
      headerName: t("phone_number"),
      field: "phone_number",
      editable: true,
      width: 120,
    },
    { headerName: t("email"), field: "email", editable: true, width: 150 },
    {
      headerName: t("license_number"),
      field: "license_number",
      editable: true,
      width: 150,
    },
    { headerName: t("active"), field: "active", editable: true, width: 100 },
  ];

  const onDriverRowDoubleClicked = (event) => {
    const driverId = event.data.driver_id;
    navigate(`/driver-edit/${driverId}`);
  };

// 🔄 Масове збереження водіїв
const saveDriversBulk = () => {
  axios.put(API_ENDPOINTS.bulkUpdateDrivers, driverRowData)
    .then((response) => {
      alert(t("drivers_updated_successfully"));
    })
    .catch((error) => console.error("Error updating drivers:", error));
};


  return (
    <div className="driver-list">
      <h2>{t("drivers")}</h2>
      <button className="save-button" onClick={saveDriversBulk}>
        {t("save_driver_data")}
      </button>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          columnDefs={driverColumnDefs}
          rowData={driverRowData}
          singleClickEdit={true}
          onRowDoubleClicked={onDriverRowDoubleClicked}
          onCellValueChanged={(event) => {
            const updatedData = [...driverRowData];
            updatedData[event.rowIndex] = event.data;
            setDriverRowData(updatedData);
          }}
        />
      </div>
    </div>
  );
};

export default DriverList;
