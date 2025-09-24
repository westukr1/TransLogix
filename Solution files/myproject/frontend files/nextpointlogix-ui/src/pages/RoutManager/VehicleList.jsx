import React, { useState, useEffect } from "react";
import "./VehicleList.css";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../config/apiConfig";

const VehicleList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [vehicleRowData, setVehicleRowData] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);

  useEffect(() => {
    // Fetch vehicles data from backend
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.getVehicles);
        setVehicleRowData(Array.isArray(response.data) ? response.data : [])
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
  
    const fetchFuelTypes = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.getFuelTypes);
        setFuelTypes(response.data);
      } catch (error) {
        console.error("Error fetching fuel types:", error);
      }
    };

    fetchVehicles();
    fetchFuelTypes();
  }, []);

  const updateFuelType = async (vehicleId, fuelTypeId) => {
    try {
      await axios.post(API_ENDPOINTS.updateFuelType, {
        vehicle_id: vehicleId,
        fuel_type_id: fuelTypeId,
      });

      const refresh = await axios.get(API_ENDPOINTS.getVehicles);
      setVehicleRowData(Array.isArray(refresh.data) ? refresh.data : []);
    } catch (error) {
      console.error("Error updating fuel type:", error);
    }
  };
  // setVehicleRowData(Array.isArray(data) ? data : []);
  const vehicleColumnDefs = [
    {
      headerName: t("vehicle_id"),
      field: "vehicle_id",
      editable: false,
      width: 30,
    },
    {
      headerName: t("license_plate"),
      field: "license_plate",
      editable: true,
      width: 100,
    },
    { headerName: t("make"), field: "make", editable: true, width: 100 },
    { headerName: t("model"), field: "model", editable: true, width: 100 },
    {
      headerName: t("capacity"),
      field: "capacity",
      editable: true,
      width: 100,
    },
    {
      headerName: t("fuel_type"),
      field: "fuel_type",
      editable: true,
      width: 220,
      valueFormatter: (params) => {
        return params.value?.type || ""; // Display `type` if the object exists
      },
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: fuelTypes.map((fuel) => fuel.type), // Array of fuel type names
      },
      onCellValueChanged: (params) => {
        const selectedFuel = fuelTypes.find(
          (fuel) => fuel.type === params.newValue
        );
        if (selectedFuel) {
          updateFuelType(params.data.vehicle_id, selectedFuel.fuel_type_id);
        }
      },
    },
    { headerName: t("year"), field: "year", editable: true, width: 100 },
    {
      headerName: t("engine_volume"),
      field: "engine_volume",
      editable: true,
      width: 100,
    },
    {
      headerName: t("city_fuel_consumption"),
      field: "city_fuel_consumption",
      editable: true,
      width: 100,
    },
    {
      headerName: t("highway_fuel_consumption"),
      field: "highway_fuel_consumption",
      editable: true,
      width: 100,
    },
    {
      headerName: t("registered_to"),
      field: "registered_to",
      editable: true,
      width: 200,
    },
    {
      headerName: t("license_plate_format"),
      field: "license_plate_format",
      editable: true,
      width: 100,
    },
    {
      headerName: t("chassis_number"),
      field: "chassis_number",
      editable: true,
      width: 150,
    },
    { headerName: t("active"), field: "active", editable: true, width: 100 },
    {
      headerName: t("image_url"),
      field: "image_url",
      editable: true,
      width: 100,
    },
  ];

  const onVehicleRowDoubleClicked = (event) => {
    const vehicleId = event.data.vehicle_id;
    navigate(`/vehicle-edit/${vehicleId}`);
  };

  const saveVehiclesBulk = async (vehicleId, fuelTypeId) => {
    
    const payload = vehicleRowData.map((vehicle) => ({
      vehicle_id: vehicle.vehicle_id,
      license_plate: vehicle.license_plate,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      capacity: vehicle.capacity,
      fuel_type_id: vehicle.fuel_type?.fuel_type_id || null,
      chassis_number: vehicle.chassis_number,
      city_fuel_consumption: vehicle.city_fuel_consumption,
      highway_fuel_consumption: vehicle.highway_fuel_consumption,
      registered_to: vehicle.registered_to,
      license_plate_format: vehicle.license_plate_format,
      engine_volume: vehicle.engine_volume,
      active: vehicle.active,
      image_url: vehicle.image_url,
    }));

    console.log("Sending vehicles payload:", payload);

    try {
      await axios.put(API_ENDPOINTS.bulkUpdateVehicles, payload);
      alert(t("vehicles_updated_successfully"));
    } catch (error) {
      console.error("❌ Network error while updating vehicles:", error);
    }
  };

  return (
    <div className="vehicle-list">
      <h3>{t("vehicles")}</h3>
      <button className="save-button" onClick={saveVehiclesBulk}>
        {t("save_vehicle_data")}
      </button>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          columnDefs={vehicleColumnDefs}
          rowData={vehicleRowData}
          singleClickEdit={true}
          onRowDoubleClicked={onVehicleRowDoubleClicked}
          onCellValueChanged={(event) => {
            const updatedData = [...vehicleRowData];
            updatedData[event.rowIndex] = event.data;
            setVehicleRowData(updatedData);
          }}
        />
      </div>
    </div>
  );
};

export default VehicleList;
