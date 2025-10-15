const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  // token: `${BASE_URL}/api/token/`,
  // refreshToken: `${BASE_URL}/api/token/refresh/`,
  // login: `${BASE_URL}/login/`,
  // createUser: `${BASE_URL}/api/users/`,
  // changePassword: `${BASE_URL}/api/change-password/`,
  // forgotPassword: `${BASE_URL}/api/forgot-password/`,
  // getUserRoles: `${BASE_URL}/api/getUserRoles/`,
  // allowedApps: `${BASE_URL}/api/allowed-apps/`,
  // googleMapsKey: `${BASE_URL}/api/google-maps-key/`,
  // getActiveTempList: `${BASE_URL}/api/temp-lists/get_active_list/`,
  // saveTempList: `${BASE_URL}/api/temp-lists/save_list/`,
  // deleteExpiredTempLists: `${BASE_URL}/api/delete-expired-lists/`,
  // getFilteredTripRequests: `${BASE_URL}/api/filtered-passenger-trip-requests/`,
  // updateTripRequestStatus: (id) => `${BASE_URL}/api/passenger-trip-requests/${id}/update-status/`,
  
  // getRoutes: `${BASE_URL}/api/routes/`,
  // getPassengers: `${BASE_URL}/api/passengers/`,
  // getPassengerRequestsDetails: `${BASE_URL}/api/passenger-requests/details/`,
  // getVehicles: `${BASE_URL}/api/vehicles/`,
  // createPassenger: `${BASE_URL}/api/passengers/create/`,
  // updatePassenger: (id) => `${BASE_URL}/api/passengers/${id}/update/`,
  // toggleActivePassenger: (id) => `${BASE_URL}/api/passengers/${id}/toggle-active/`,

  // toggleSelectAllPassengers: `${BASE_URL}/api/passengers/toggle-select-all/`,
  // updatePassengerAddresses: (id) => `${BASE_URL}/api/passenger/${id}/addresses/update/`,
  // getPassengerAddresses: (id) => `${BASE_URL}/api/passenger/${id}/addresses/`,
  // updateCoordinates: (id) => `${BASE_URL}/api/coordinate-points/${id}/update-coordinates/`,
  // getOrderedPassengerListDetails: (id) => `${BASE_URL}/api/ordered-passenger-list/${id}/`,
  // getOrderedPassengerLists: `${BASE_URL}/api/ordered-passenger-list/`,
  // getOrderedPassengerListDetails: (id) => `${BASE_URL}/api/ordered-passenger-list/${id}/`,
  // calculateRoute: `${BASE_URL}/api/calculate-route/`,
  // createOrderedPassengerList: `${BASE_URL}/api/ordered-passenger-list/create_ordered_list/`,
  // deleteOrderedPassengerList: (id) => `${BASE_URL}/api/ordered-passenger-list/${id}/delete/`,
  // getOrderedPassengerListDetails: (id) => `${BASE_URL}/api/ordered-passenger-list/${id}/`,
  // getOrderedPassengerLists: `${BASE_URL}/api/ordered-passenger-list/`,
  // updateSettings: `${BASE_URL}/api/update-settings/`,
  // getDrivers: `${BASE_URL}/api/drivers/`,
  // bulkUpdateDrivers: `${BASE_URL}/api/drivers/bulk-update/`,
  // getSettings: `${BASE_URL}/api/get-settings/`,
  // calculateRoute: `${BASE_URL}/api/calculate-route/`,

  // updateFuelType: `${BASE_URL}/api/vehicles/update-fuel-type/`,
  // bulkUpdateVehicles: `${BASE_URL}/api/vehicles/bulk-update/`,
  // createDriver: `${BASE_URL}/drivers/create/`,
  // updateDriver: (id) => `${BASE_URL}/drivers/${id}/update/`,
  // toggleActiveDriver: (id) => `${BASE_URL}/drivers/${id}/toggle-active/`,
  // createVehicle: `${BASE_URL}/vehicles/`,
  // updateVehicle: (id) => `${BASE_URL}/vehicles/${id}/update/`,
  // toggleActiveVehicle: (id) => `${BASE_URL}/vehicles/${id}/toggle-active/`,
  // getFuelTypes: `${BASE_URL}/api/fuel-types/`,
  // getVehicleTypes: `${BASE_URL}/api/vehicle-types/`,
  // getVehicleDetails: (id) => `${BASE_URL}/api/vehicles/${id}/`,
  // getDriverDetails: (id) => `${BASE_URL}/api/drivers/${id}/`,
  // getRoutes: `${BASE_URL}/api/routes/`,
  // createRoute: `${BASE_URL}/api/routes/create/`,
  // updateRoute: (id) => `${BASE_URL}/api/routes/${id}/update/`,
  // getPassengerDetails: (id) => `${BASE_URL}/api/passengers/${id}/`,
  // getCoordinatePoint: (id) => `${BASE_URL}/api/coordinate-points/${id}/`,

  // repeatTripRequests: `${BASE_URL}/api/passenger-trip-requests/repeat/`,
  
 
  // updateTripRequestStatus: (id) => `${BASE_URL}/api/passenger-trip-requests/${id}/update-status/`,
  // createTripRequest: `${BASE_URL}/api/passenger-trip-requests/create/`,
  // createPassenger: `${BASE_URL}/api/passengers/create/`,
  // updatePassenger: (id) => `${BASE_URL}/api/passengers/${id}/update/`,
  // getGoogleMapsKey: `${BASE_URL}/api/google-maps-key/`,
  // getPassengerAddresses: (id) => `${BASE_URL}/api/passenger/${id}/addresses/`,
  // getHouseNumber: (id) => `${BASE_URL}/api/coordinate-point/${id}/house-number/`,

  // updatePassengerAddresses: (id) => `${BASE_URL}/api/passenger/${id}/addresses/update/`,
  // updateCoordinates: (id) => `${BASE_URL}/api/coordinate-points/${id}/update-coordinates/`,

  // getCountries: `${BASE_URL}/api/countries/`,
  // getRegions: (countryId) => `${BASE_URL}/api/regions/${countryId}/`,
  // getDistricts: (regionId) => `${BASE_URL}/api/districts/${regionId}/`,
  // checkHasPickupAddress: (id) => `${BASE_URL}/api/passengers/${id}/has-pickup-address/`,
  // createCoordinatePoint: `${BASE_URL}/api/coordinate/create/`,
  // togglePassengerActive: (id) => `${BASE_URL}/api/passengers/${id}/toggle-active/`,
  // togglePassengerSelect: (id) => `${BASE_URL}/api/passengers/${id}/toggle-select/`,
  // toggleSelectAll: `${BASE_URL}/api/passengers/toggle-select-all/`,
  // toggleCoordinateActive: (id) => `${BASE_URL}/api/coordinate-points/${id}/toggle-active/`,
  // getFilteredRoutes: `${BASE_URL}/api/filtered-routes/`,
  
  // getPassengers: (isActive) => `${BASE_URL}/api/passengers/?is_active=${isActive}`,
  // getFilteredRoutes: `${BASE_URL}/api/filtered-routes/`,
  // getAllRoutes: `${BASE_URL}/api/routes/`,
  // getGoogleMapsKey: `${BASE_URL}/api/google-maps-key/`,
  // getDrivers: `${BASE_URL}/api/drivers`,
  // getVehicles: `${BASE_URL}/api/vehicles`,
  // createAssignment: `${BASE_URL}/api/assignments`,
  // getVehicles: `${BASE_URL}/api/vehicles/`,
  
  // getFuelTypes: `${BASE_URL}/api/fuel-types/`,
  // updateVehicleFuelType: `${BASE_URL}/api/vehicles/update-fuel-type/`,
  // bulkUpdateVehicles: `${BASE_URL}/api/vehicles/bulk-update/`,
  // bulkUpdateDrivers: `${BASE_URL}/api/drivers/bulk-update/`,
  // getDriverById: (id) => `${BASE_URL}/api/drivers/${id}/`,
  // getFuelTypes: `${BASE_URL}/api/fuel-types/`,
  // getDriverVehicles: (id) => `${BASE_URL}/drivers/${id}/vehicles/`,
  // getVehicles: `${BASE_URL}/api/vehicles/`,
  // updateDriver: (id) => `${BASE_URL}/drivers/update/${id}/`,
  // assignVehicle: (id) => `${BASE_URL}/driver/${id}/assign-vehicle/`,
  // removeVehicleAssignment: `${BASE_URL}/api/vehicles/remove-assignment/`,
  // updateVehicleFuelType: `${BASE_URL}/api/vehicles/update-fuel-type/`,
  // bulkUpdateVehicles: `${BASE_URL}/api/vehicles/bulk-update/`,
  // getAssignedDriversForVehicle: (id) => `${BASE_URL}/vehicles/${id}/assigned-drivers/`,
  // getDrivers: `${BASE_URL}/api/drivers/`,
  // getAssignedDriversForVehicle: (id) => `${BASE_URL}/vehicles/${id}/assigned-drivers/`,

  // getAssignedDrivers: (vehicleId) => `${BASE_URL}/vehicles/${vehicleId}/assigned-drivers/`,
  // getVehicleById: (id) => `${BASE_URL}/api/vehicles/${id}/`,
  // getDrivers: `${BASE_URL}/api/drivers/`,
  // getFuelTypes: `${BASE_URL}/api/fuel-types/`,
  // updateVehicle: (id) => `${BASE_URL}/api/vehicles/${id}/update/`,
  // bulkUpdateDrivers: `${BASE_URL}/api/drivers/bulk-update/`,
  // assignDriverToVehicle: (vehicleId) => `${BASE_URL}/vehicles/${vehicleId}/assign-driver/`,
  // removeDriverFromVehicle: (vehicleId) => `${BASE_URL}/vehicles/${vehicleId}/remove-driver/`,


    // ===== Auth =====
    token: `${BASE_URL}/api/token/`,
    refreshToken: `${BASE_URL}/api/token/refresh/`,
    googleMapsKey: `${BASE_URL}/api/google-maps-key/`,
    getUserInfo: `${BASE_URL}/api/me/`,

    // ===== Settings =====
    getSettings: `${BASE_URL}/api/get-settings/`,
    updateSettings: `${BASE_URL}/api/update-settings/`,
    
    // ===== Passengers =====
    getPassengers: (isActive = true) => `${BASE_URL}/api/passengers/?is_active=${isActive}`,
    getPassengerDetails: (id) => `${BASE_URL}/api/passengers/${id}/`,
    createPassenger: `${BASE_URL}/api/passengers/create/`,
    updatePassenger: (id) => `${BASE_URL}/api/passengers/${id}/update/`,
    togglePassengerActive: (id) => `${BASE_URL}/api/passengers/${id}/toggle-active/`,
    togglePassengerSelect: (id) => `${BASE_URL}/api/passengers/${id}/toggle-select/`,
    toggleSelectAllPassengers: `${BASE_URL}/api/passengers/toggle-select-all/`,
    hasPickupAddress: (id) => `${BASE_URL}/api/passengers/${id}/has-pickup-address/`,
    getPassengerAddresses: (id) => `${BASE_URL}/api/passengers/${id}/addresses/`,
    updatePassengerAddresses: (id) => `${BASE_URL}/api/passenger/${id}/addresses/update/`,
    getHouseNumber: (pointId) => `${BASE_URL}/api/coordinate-point/${pointId}/house-number/`,
    filteredCoordinates: () => `${BASE_URL}/api/filtered-coordinates/`,

    // ===== Drivers =====
    getDrivers: `${BASE_URL}/api/drivers/`,
    getDriverById: (id) => `${BASE_URL}/api/drivers/${id}/`,
    bulkUpdateDrivers: `${BASE_URL}/api/drivers/bulk-update/`,
    getAssignedDrivers: (vehicleId) => `${BASE_URL}/vehicles/${vehicleId}/assigned-drivers/`,
    assignDriverToVehicle: (vehicleId) => `${BASE_URL}/vehicles/${vehicleId}/assign-driver/`,
    removeDriverFromVehicle: (vehicleId) => `${BASE_URL}/vehicles/${vehicleId}/remove-driver/`,
  
    // ===== Vehicles =====
    getVehicles: `${BASE_URL}/api/vehicles/`,
    vehicleAssignmentStatus: `${BASE_URL}/api/vehicle-assignment-status/`,
    
    updateVehicle: (id) => `${BASE_URL}/vehicles/${id}/`,
    updateVehicleFuelType: `${BASE_URL}/api/vehicles/update-fuel-type/`,
    bulkUpdateVehicles: `${BASE_URL}/api/vehicles/bulk-update/`,
    getVehicleById: (id) => `${BASE_URL}/vehicles/${id}/`,
    getAssignedDrivers: (vehicleId) => `${BASE_URL}/vehicles/${vehicleId}/assigned-drivers/`,

  
    // ===== Routes =====
    getRoutes: `${BASE_URL}/api/routes/`,
    getRouteDetails: (id) => `${BASE_URL}/api/routes/${id}/`,
    getRouteByOrderedList: (listId) => `${BASE_URL}/api/routes/by-ordered-list/${listId}/`,
    getFilteredRoutes: `${BASE_URL}/api/filtered-routes/`,
    calculateRoute: `${BASE_URL}/api/optimize/`,  // ✅ новий правильний endpoint

  
    // ===== Trip Requests =====
    createTripRequest: `${BASE_URL}/api/passenger-trip-requests/create/`,
    getFilteredTripRequests: `${BASE_URL}/api/filtered-passenger-trip-requests/`,
    updateTripStatus: (id) => `${BASE_URL}/api/passenger-trip-requests/${id}/update-status/`,
    updateTripRequestStatus: (id) => `${BASE_URL}/api/passenger-trip-requests/${id}/update-status/`,
  
    // ===== Address Points =====
    toggleCoordinateActive: (id) => `${BASE_URL}/api/coordinate-points/${id}/toggle-active/`,
    updateCoordinates: (id) => `${BASE_URL}/api/coordinate-points/${id}/update-coordinates/`,
    getCoordinatePoints: `${BASE_URL}/api/coordinate-points/`,
    getFilteredCoordinates: `${BASE_URL}/api/filtered-coordinates/`,
    createCoordinatePoint: `${BASE_URL}/api/coordinate/create/`,
  
    // ===== Fuel Types =====
    getFuelTypes: `${BASE_URL}/api/fuel-types/`,
  
    // ===== Region/City Reference =====
    getCountries: `${BASE_URL}/api/countries/`,
    getRegions: (countryId) => `${BASE_URL}/api/regions/${countryId}/`,
    getDistricts: (regionId) => `${BASE_URL}/api/districts/${regionId}/`,
    getCities: (districtId) => `${BASE_URL}/api/cities/${districtId}/`,
  
    // ===== Temporary Filters & Lists =====
    
    getActiveTempList: `${BASE_URL}/api/temp-lists/get_active_list/`,
    deleteExpiredTempList: `${BASE_URL}/api/temp-lists/delete_expired/`,
    saveTempList: `${BASE_URL}/api/temp-lists/save_list/`,
    getRouteSettings: `${BASE_URL}/api/get-settings/`,

  
    // ===== Ordered Lists =====
    createOrderedPassengerList: `${BASE_URL}/api/ordered-passenger-list/create_ordered_list/`,
    getOrderedPassengerList: (listId) => `${BASE_URL}/api/ordered-passenger-list/${listId}/`,
    getOrderedPassengerLists: `${BASE_URL}/api/ordered-passenger-list/`,
    filteredPassengerTripRequests: `${BASE_URL}/api/filtered-passenger-trip-requests/`,
    deleteOrderedPassengerList: (listId) => `${BASE_URL}/api/ordered-passenger-list/${listId}/delete/`,
    createOrderedPassengerList: `${BASE_URL}/api/ordered-passenger-list/create_ordered_list/`,
    deleteOrderedPassengerList: (id) => `${BASE_URL}/api/ordered-passenger-list/${id}/delete/`,
    getOrderedPassengerListDetails: (id) => `${BASE_URL}/api/ordered-passenger-list/${id}/`,
    updateTempListSequence: `${BASE_URL}/api/temp-lists/update_sequence/`,

    // ===== Assignments =====
    getDriverVehicles: (driverId) => `${BASE_URL}/drivers/${driverId}/vehicles/`,
    assignVehicle: (driverId) => `${BASE_URL}/driver/${driverId}/assign-vehicle/`,
    removeVehicleAssignment: `${BASE_URL}/api/vehicles/remove-assignment/`

  
};