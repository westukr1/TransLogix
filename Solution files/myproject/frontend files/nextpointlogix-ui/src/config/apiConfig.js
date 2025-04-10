const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  token: `${BASE_URL}/api/token/`,
  refreshToken: `${BASE_URL}/api/token/refresh/`,
  login: `${BASE_URL}/login/`,
  createUser: `${BASE_URL}/api/users/`,
  changePassword: `${BASE_URL}/api/change-password/`,
  forgotPassword: `${BASE_URL}/api/forgot-password/`,
  getUserRoles: `${BASE_URL}/api/getUserRoles/`,
  allowedApps: `${BASE_URL}/api/allowed-apps/`,
  googleMapsKey: `${BASE_URL}/api/google-maps-key/`,
  getActiveTempList: `${BASE_URL}/api/temp-lists/get_active_list/`,
  saveTempList: `${BASE_URL}/api/temp-lists/save_list/`,
  deleteExpiredTempLists: `${BASE_URL}/api/delete-expired-lists/`,
  getFilteredTripRequests: `${BASE_URL}/api/filtered-passenger-trip-requests/`,
  updateTripRequestStatus: (id) => `${BASE_URL}/api/passenger-trip-requests/${id}/update-status/`,
  getSettings: `${BASE_URL}/api/get-settings/`,
  updateSettings: `${BASE_URL}/api/update-settings/`,
  getRoutes: `${BASE_URL}/api/routes/`,
  getPassengers: `${BASE_URL}/api/passengers/`,
  getPassengerRequestsDetails: `${BASE_URL}/api/passenger-requests/details/`,
  getVehicles: `${BASE_URL}/api/vehicles/`,
  createPassenger: `${BASE_URL}/api/passengers/create/`,
  updatePassenger: (id) => `${BASE_URL}/api/passengers/${id}/update/`,
  toggleActivePassenger: (id) => `${BASE_URL}/api/passengers/${id}/toggle-active/`,
  toggleSelectPassenger: (id) => `${BASE_URL}/api/passengers/${id}/toggle-select/`,
  toggleSelectAllPassengers: `${BASE_URL}/api/passengers/toggle-select-all/`,
  updatePassengerAddresses: (id) => `${BASE_URL}/api/passenger/${id}/addresses/update/`,
  getPassengerAddresses: (id) => `${BASE_URL}/api/passenger/${id}/addresses/`,
  updateCoordinates: (id) => `${BASE_URL}/api/coordinate-points/${id}/update-coordinates/`,
  getOrderedPassengerListDetails: (id) => `${BASE_URL}/api/ordered-passenger-list/${id}/`,
  getOrderedPassengerLists: `${BASE_URL}/api/ordered-passenger-list/`,
  getOrderedPassengerListDetails: (id) => `${BASE_URL}/api/ordered-passenger-list/${id}/`,
  calculateRoute: `${BASE_URL}/api/calculate-route/`,
  createOrderedPassengerList: `${BASE_URL}/api/ordered-passenger-list/create_ordered_list/`,
  deleteOrderedPassengerList: (id) => `${BASE_URL}/api/ordered-passenger-list/${id}/delete/`,
  getOrderedPassengerListDetails: (id) => `${BASE_URL}/api/ordered-passenger-list/${id}/`,
  getOrderedPassengerLists: `${BASE_URL}/api/ordered-passenger-list/`,
  updateSettings: `${BASE_URL}/api/update-settings/`,
  
};