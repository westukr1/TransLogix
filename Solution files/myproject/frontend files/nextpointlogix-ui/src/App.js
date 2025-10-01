import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OperatorUI from "./components/OperatorUI";
import Calendar from "./pages/Calendar/Calendar";

import FuelManagement from "./pages/FuelManagement/FuelManagement";
import MapOfRoutes from "./pages/MapOfRoutes/MapOfRoutes";
import PlanningScreen from "./pages/RoutManager/PlanningScreen";
import RouteMapModal from './pages/RoutManager/PassengersGroupingView/RouteMapModal'; 

import VehicleRegistration from "./pages/VehicleAndDriverRegistration/VehicleRegistration";
import DriverRegistration from "./pages/VehicleAndDriverRegistration/DriverRegistration";
import TransportRequest from "./pages/TransportRequests/TransportRequest";
import DevelopersTools from "./pages/DevelopersTools/DevelopersTools";


// Ваш новий компонент

// Імпорт шаблонів
import SingleColumnTemplate from "./templates/SingleColumnTemplate";
import TwoColumnTemplate from "./templates/TwoColumnTemplate";
import TwoColumnSplitTemplate from "./templates/TwoColumnSplitTemplate";
import TwoColumnSplitThreeTemplate from "./templates/TwoColumnSplitThreeTemplate";
import ThreeColumnTemplate from "./templates/ThreeColumnTemplate";
import RoutesTableView from "./pages/RoutesTableView/RoutesTableView";
import PassangersTableView from "./pages/PassangersTableView/PassangersTableView";
import NewEditPassengerForm from "./pages/PassangersTableView/NewEditPassengerForm";
import CreatePassenger from "./pages/PassangersTableView/CreatePassenger";
import EditPassenger from "./pages/PassangersTableView/EditPassenger";
import EditPassengerAddresses from "./pages/PassangersTableView/EditPassengerAddresses";
import MapVerification from "./pages/PassangersTableView/MapVerification";
import ReferenceData from "./pages/ReferenceData/ReferenceData";
import DriverVehicleManagement from "./pages/DriverAndVehicleManagement/DriverVehicleManagement";
import NewAssignmentOrder from "./pages/DriverAndVehicleManagement/NewAssignmentOrder";
import VehicleEdit from "./pages/DriverAndVehicleManagement/VehicleEdit";
import DriverEdit from "./pages/DriverAndVehicleManagement/DriverEdit";
import NewPassengersTripRequest from "./pages/PassengerTripRequestView/NewPassengersTripRequest";

import PassengerTripRequestView from "./pages/PassengerTripRequestView/PassengerTripRequestView";
import PassengerSelectView from "./pages/PassengerTripRequestView/PassengerSelectView";
import PointsSelectView from "./pages/PassengerTripRequestView/PointsSelectView";
import RepeatTripView from "./pages/PassengerTripRequestView/RepeatTripView";

import GroupingListToRoute from "./pages/RoutManager/PassengersGroupingView/GroupingListToRoute";
import RequestsGrouping from './pages/RoutManager/PassengersGroupingView/RequestsGrouping';
import UserRoutesSettings from "./pages/RoutManager/UserSettingsView/UserRoutesSettings";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderedPassengerList from "./pages/RoutManager/OrderedPassengerListView/OrderedPassengerList";
import OrderedPassengerListDetails from "./pages/RoutManager/OrderedPassengerListView/OrderedPassengerListDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<OperatorUI />} />
          <Route path="/routestableview" element={<RoutesTableView />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route
            path="/driver-vehicle-management"
            element={<DriverVehicleManagement />}
          />
          <Route path="/fuel-management" element={<FuelManagement />} />
          <Route path="/map-of-routes" element={<MapOfRoutes />} />
          <Route path="/rout-manager" element={<PlanningScreen />} />
          <Route path="/transport-requests" element={<TransportRequest />} />
          <Route
            path="/vehicle-registration"
            element={<VehicleRegistration />}
          />
          <Route path="/vehicle-edit/:id" element={<VehicleEdit />} />
          <Route path="/driver-registration" element={<DriverRegistration />} />
          <Route path="/reference-data" element={<ReferenceData />} />
          <Route path="/driver-edit/:id" element={<DriverEdit />} />
          <Route path="/developers-tools" element={<DevelopersTools />} />
          {/* Додані маршрути для шаблонів */}
          <Route
            path="/template-single-column"
            element={<SingleColumnTemplate />}
          />
          <Route path="/template-two-column" element={<TwoColumnTemplate />} />
          <Route
            path="/template-two-column-split"
            element={<TwoColumnSplitTemplate />}
          />
          <Route
            path="/template-two-column-split-three"
            element={<TwoColumnSplitThreeTemplate />}
          />
          <Route
            path="/template-three-column"
            element={<ThreeColumnTemplate />}
          />
          <Route
            path="/passangers-tableview"
            element={<PassangersTableView />}
          />
          <Route path="/add-passenger" element={<NewEditPassengerForm />} />
          <Route path="/create-passenger" element={<CreatePassenger />} />
          <Route path="/edit-passenger/:id" element={<EditPassenger />} />
          <Route
            path="/edit-passenger-addresses"
            element={<EditPassengerAddresses />}
          />
          <Route path="/edit-passenger" element={<EditPassenger />} />
          <Route
            path="/passengers-table-view/map-verification"
            element={<MapVerification />}
          />
          <Route
            path="/passenger-trip-requests"
            element={<PassengerTripRequestView />}
          />
          <Route
            path="/new-passenger-trip-request"
            element={<NewPassengersTripRequest />}
          />{" "}
          <Route path="/passenger-select" element={<PassengerSelectView />} />
          <Route path="/points-select" element={<PointsSelectView />} />
          <Route path="/repeat-trip-view" element={<RepeatTripView />} />
          <Route
            path="/passengers-grouping-view/grouping-list-to-route"
            element={<GroupingListToRoute />}
          />
          <Route
            path="/user-routes-settings"
            element={<UserRoutesSettings />}
          />
          <Route
            path="/ordered-passenger-list/ordered-passenger-list"
            element={<OrderedPassengerList />}
          />
          <Route
            path="/ordered-passenger-lists/:listId"
            element={<OrderedPassengerListDetails />}
          />
          <Route path="/route-map" element={<RouteMapModal />} />
         
          <Route path="/requests-grouping" element={<RequestsGrouping />} />
        
        </Routes>

        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
