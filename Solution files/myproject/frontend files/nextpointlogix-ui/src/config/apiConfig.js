const normalizeApiBaseUrl = (value) => {
  const baseUrl = (value || '/api').trim().replace(/\/+$/, '');

  if (!baseUrl || baseUrl === '/api' || baseUrl.endsWith('/api')) {
    return baseUrl || '/api';
  }

  return `${baseUrl}/api`;
};

export const API_BASE_URL = normalizeApiBaseUrl(process.env.REACT_APP_API_BASE_URL);

export const apiUrl = (path = '') => {
  const endpointPath = String(path).replace(/^\/+/, '');
  return endpointPath ? `${API_BASE_URL}/${endpointPath}` : API_BASE_URL;
};

export const apiFetch = (path, options) => fetch(apiUrl(path), options);

const getPassengers = (isActive = true) => `/passengers/?is_active=${isActive}`;
getPassengers.toString = () => '/passengers/';

export const API_ENDPOINTS = {
  // Auth
  token: '/token/',
  refreshToken: '/token/refresh/',
  googleMapsKey: '/google-maps-key/',
  getGoogleMapsKey: '/google-maps-key/',
  getUserInfo: '/me/',

  // Settings
  getSettings: '/get-settings/',
  updateSettings: '/update-settings/',

  // Passengers
  getPassengers,
  getPassengerDetails: (id) => `/passengers/${id}/`,
  createPassenger: '/passengers/create/',
  updatePassenger: (id) => `/passengers/${id}/update/`,
  togglePassengerActive: (id) => `/passengers/${id}/toggle-active/`,
  togglePassengerSelect: (id) => `/passengers/${id}/toggle-select/`,
  toggleSelectAll: '/passengers/toggle-select-all/',
  toggleSelectAllPassengers: '/passengers/toggle-select-all/',
  hasPickupAddress: (id) => `/passengers/${id}/has-pickup-address/`,
  checkHasPickupAddress: (id) => `/passengers/${id}/has-pickup-address/`,
  getPassengerAddresses: (id) => `/passengers/${id}/addresses/`,
  updatePassengerAddresses: (id) => `/passenger/${id}/addresses/update/`,

  // Drivers
  getDrivers: '/drivers/',
  getDriverById: (id) => `/drivers/${id}/`,
  createDriver: '/drivers/create/',
  updateDriver: (id) => `/drivers/update/${id}/`,
  bulkUpdateDrivers: '/drivers/bulk-update/',
  getDriverVehicles: (driverId) => `/drivers/${driverId}/vehicles/`,
  assignVehicle: (driverId) => `/driver/${driverId}/assign-vehicle/`,
  removeVehicleAssignment: '/vehicles/remove-assignment/',
  getAssignedDriversForVehicle: (vehicleId) => `/vehicles/${vehicleId}/assigned-drivers/`,

  // Vehicles
  getVehicles: '/vehicles/',
  createVehicle: '/vehicles/',
  updateVehicle: (id) => `/vehicles/${id}/`,
  getVehicleById: (id) => `/vehicles/${id}/`,
  vehicleAssignmentStatus: '/vehicle-assignment-status/',
  updateFuelType: '/vehicles/update-fuel-type/',
  updateVehicleFuelType: '/vehicles/update-fuel-type/',
  bulkUpdateVehicles: '/vehicles/bulk-update/',
  getAssignedDrivers: (vehicleId) => `/vehicles/${vehicleId}/assigned-drivers/`,
  assignDriverToVehicle: (vehicleId) => `/vehicles/${vehicleId}/assign-driver/`,
  removeDriverFromVehicle: (vehicleId) => `/vehicles/${vehicleId}/remove-driver/`,

  // Routes
  getRoutes: '/routes/',
  getAllRoutes: '/routes/',
  getRouteDetails: (id) => `/routes/${id}/`,
  getRouteByOrderedList: (listId) => `/routes/by-ordered-list/${listId}/`,
  getFilteredRoutes: '/filtered-routes/',
  calculateRoute: '/optimize/',
  createRoute: '/routes/create/',

  // Trip Requests
  createTripRequest: '/passenger-trip-requests/create/',
  repeatTripRequests: '/passenger-trip-requests/repeat/',
  getFilteredTripRequests: '/filtered-passenger-trip-requests/',
  filteredPassengerTripRequests: '/filtered-passenger-trip-requests/',
  updateTripStatus: (id) => `/passenger-trip-requests/${id}/update-status/`,
  updateTripRequestStatus: (id) => `/passenger-trip-requests/${id}/update-status/`,

  // Address Points
  getCoordinatePoint: (id) => `/coordinate-points/${id}/`,
  getCoordinatePoints: '/coordinate-points/',
  allCoordinates: (isActive) => `/coordinate-points/?is_active=${isActive}`,
  getFilteredCoordinates: '/filtered-coordinates/',
  filteredCoordinates: () => '/filtered-coordinates/',
  createCoordinatePoint: '/coordinate/create/',
  updateCoordinates: (id) => `/coordinate-points/${id}/update-coordinates/`,
  toggleCoordinateActive: (id) => `/coordinate-points/${id}/toggle-active/`,
  toggleCoordinatePointActive: (id) => `/coordinate-points/${id}/toggle-active/`,
  getHouseNumber: (pointId) => `/coordinate-point/${pointId}/house-number/`,

  // Reference Data
  getFuelTypes: '/fuel-types/',
  getCountries: '/countries/',
  getRegions: (countryId) => `/regions/${countryId}/`,
  getDistricts: (regionId) => `/districts/${regionId}/`,
  getCities: (districtId) => `/cities/${districtId}/`,

  // Temporary Filters & Lists
  getActiveTempList: '/temp-lists/get_active_list/',
  deleteExpiredTempList: '/temp-lists/delete_expired/',
  saveTempList: '/temp-lists/save_list/',
  updateTempListSequence: '/temp-lists/update_sequence/',
  getRouteSettings: '/get-settings/',

  // Ordered Lists
  createOrderedPassengerList: '/ordered-passenger-list/create_ordered_list/',
  getOrderedPassengerList: (listId) => `/ordered-passenger-list/${listId}/`,
  getOrderedPassengerLists: '/ordered-passenger-list/',
  getOrderedPassengerListDetails: (id) => `/ordered-passenger-list/${id}/`,
  deleteOrderedPassengerList: (id) => `/ordered-passenger-list/${id}/delete/`,

  // Assignments
  createAssignment: '/assignments',
};
