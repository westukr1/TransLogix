import React, { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import dayjs from "dayjs";

const PassengerRequestsTable = ({ passengerRequests, fetchPassengerRequests, handleIsActiveChange, filters, directionFilter }) => {

    useEffect(() => {
        fetchPassengerRequests();
    }, [filters]);

    const formatDateToCompareDay = (isoString) => dayjs(isoString).format("YYYY-MM-DD");

    const getRowStyle = (params) => {
        if (params.data.included_in_route) {
            return { color: 'green' };
        }
        if (params.data.included_in_list) {
            return { color: 'blue' };
        }
        const sameDayRequests = passengerRequests.filter(req =>
            req.passenger === params.data.passenger &&
            req.direction === params.data.direction &&
            req.is_active === true &&
            ((req.direction === "WORK_TO_HOME" && req.departure_time && params.data.departure_time && formatDateToCompareDay(req.departure_time) === formatDateToCompareDay(params.data.departure_time)) ||
                (req.direction === "HOME_TO_WORK" && req.arrival_time && params.data.arrival_time && formatDateToCompareDay(req.arrival_time) === formatDateToCompareDay(params.data.arrival_time)))
        );
        if (sameDayRequests.length > 1) {
            return { color: 'red' };
        }
        return {};
    };

    const columnDefs = [
        { headerName: "ID", field: "id", width: 60 },
        {
            headerName: "Active",
            field: "is_active",
            width: 60,
            cellRenderer: (params) => (
                <input
                    type="checkbox"
                    checked={params.value}
                    onChange={(e) => {
                        const isChecked = e.target.checked;
                        const action = isChecked ? "activate" : "deactivate";
                        if (window.confirm(`Are you sure you want to ${action} the request?`)) {
                            handleIsActiveChange(params.data.id, isChecked);
                        }
                    }}
                />
            ),
        },
        { headerName: "Passenger", field: "passenger", width: 100 },
        { headerName: "First Name", field: "passenger_first_name", width: 120 },
        { headerName: "Last Name", field: "passenger_last_name", width: 120 },
        { headerName: "Phone", field: "passenger_phone", width: 120 },
        { headerName: "Direction", field: "direction", width: 100 },
        {
            headerName: "Departure",
            children: [
                { headerName: "Time", field: "departure_time", width: 150, valueFormatter: (params) => params.value ? dayjs(params.value).format("DD-MM-YYYY HH:mm") : "" },
                { headerName: "City", field: "pickup_city", width: 100 },
                { headerName: "Street", field: "pickup_street", width: 150 },
                { headerName: "House", field: "pickup_house", width: 60 }
            ],
        },
        {
            headerName: "Arrival",
            children: [
                { headerName: "Time", field: "arrival_time", width: 150, valueFormatter: (params) => params.value ? dayjs(params.value).format("DD-MM-YYYY HH:mm") : "" },
                { headerName: "City", field: "dropoff_city", width: 100 },
                { headerName: "Street", field: "dropoff_street", width: 150 },
                { headerName: "House", field: "dropoff_house", width: 50 }
            ],
        }
    ];

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                rowData={passengerRequests}
                columnDefs={columnDefs}
                getRowStyle={getRowStyle}
                pagination={true}
                paginationPageSize={10}
            />
        </div>
    );
};

export default PassengerRequestsTable;
