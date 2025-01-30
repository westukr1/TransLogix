import React, { useState, useEffect } from "react";
import "./VehicleList.css";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const VehicleList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [vehicleRowData, setVehicleRowData] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);

  useEffect(() => {
    // Fetch vehicles data from backend
    fetch("http://localhost:8000/api/vehicles/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Vehicles Data:", data);
        setVehicleRowData(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Error fetching vehicles:", error));

    // Fetch fuel types from backend
    fetch("http://localhost:8000/api/fuel-types/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fuel Types:", data);
        setFuelTypes(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Error fetching fuel types:", error));
  }, []);

  const updateFuelType = (vehicleId, fuelTypeId) => {
    fetch("http://localhost:8000/api/vehicles/update-fuel-type/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vehicle_id: vehicleId,
        fuel_type_id: fuelTypeId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update fuel type");
        }
        return response.json();
      })
      .then(() => {
        // Refresh the table data after successful update
        fetch("http://localhost:8000/api/vehicles/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setVehicleRowData(Array.isArray(data) ? data : []);
          })
          .catch((error) => console.error("Error refreshing vehicles:", error));
      })
      .catch((error) => console.error("Error updating fuel type:", error));
  };

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

  const saveVehiclesBulk = () => {
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

    fetch("http://localhost:8000/api/vehicles/bulk-update/", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update vehicles");
        }
        return response.json();
      })
      .then((data) => {
        alert(t("vehicles_updated_successfully"));
      })
      .catch((error) => console.error("Network error:", error));
  };

  return (
    <div className="vehicle-list">
      <h2>{t("vehicles")}</h2>
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
