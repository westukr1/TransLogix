import dayjs from "dayjs";

const isPlainObject = (value) =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const defaultArrayPropertyKeys = [
  "results",
  "data",
  "items",
  "values",
  "list",
  "vehicles",
  "drivers",
];

const candidateRouteEntityKeys = [
  "assigned_route",
  "assignedRoute",
  "route",
  "route_details",
  "routeDetails",
];

const candidateRouteIdKeys = [
  "assigned_route_id",
  "assigned_route_id_id",
  "assigned_route",
  "assignedRouteId",
  "assignedRoute",
  "route_id",
  "routeId",
  "route",
];

const normalizeRouteIdValue = (value) => {
  if (value === null || value === undefined) {
    return null;
  }

  if (isPlainObject(value)) {
    if (value.id !== undefined && value.id !== null) {
      return String(value.id);
    }

    if (value.route_id !== undefined && value.route_id !== null) {
      return String(value.route_id);
    }

    if (value.routeId !== undefined && value.routeId !== null) {
      return String(value.routeId);
    }

    return null;
  }

  const normalized = String(value).trim();
  return normalized.length ? normalized : null;
};

const ensureCandidateArray = (candidate, predicate, arrayPropertyKeys = defaultArrayPropertyKeys) => {
  if (!candidate) {
    return [];
  }

  if (Array.isArray(candidate)) {
    return candidate;
  }

  if (isPlainObject(candidate)) {
    if (predicate(candidate)) {
      return [candidate];
    }

    for (const key of arrayPropertyKeys) {
      const nested = candidate[key];
      if (Array.isArray(nested)) {
        return nested;
      }
    }
  }

  return [];
};

const createIdentityFn = (fields) => (item) => {
  if (!isPlainObject(item)) {
    return JSON.stringify(item);
  }

  for (const field of fields) {
    const value = item[field];
    if (value !== undefined && value !== null && String(value).length > 0) {
      return `${field}:${value}`;
    }
  }

  return JSON.stringify(item);
};

const collectEntities = (
  source,
  {
    predicate,
    directKeys,
    identityFields,
    arrayPropertyKeys = defaultArrayPropertyKeys,
  }
) => {
  if (!source) {
    return [];
  }

  if (Array.isArray(source)) {
    return source.filter(predicate);
  }

  const collected = [];

  for (const key of directKeys) {
    const candidate = source[key];
    const candidateArray = ensureCandidateArray(candidate, predicate, arrayPropertyKeys);
    if (candidateArray.length) {
      collected.push(...candidateArray.filter(predicate));
    }
  }

  const visited = new WeakSet();

  const traverse = (value) => {
    if (!value || typeof value !== "object") {
      return;
    }

    if (visited.has(value)) {
      return;
    }

    visited.add(value);

    if (Array.isArray(value)) {
      const matches = value.filter(predicate);
      if (matches.length) {
        collected.push(...matches);
      }

      value.forEach((item) => {
        if (typeof item === "object" && item !== null) {
          traverse(item);
        }
      });
      return;
    }

    if (predicate(value)) {
      collected.push(value);
    }

    for (const nestedValue of Object.values(value)) {
      if (!nestedValue || typeof nestedValue !== "object") {
        continue;
      }

      const candidateArray = ensureCandidateArray(
        nestedValue,
        predicate,
        arrayPropertyKeys
      );
      if (candidateArray.length) {
        collected.push(...candidateArray.filter(predicate));
      }

      traverse(nestedValue);
    }
  };

  traverse(source);

  const identityFn = createIdentityFn(identityFields);
  const uniqueMap = new Map();

  for (const item of collected) {
    const identity = identityFn(item);
    if (!uniqueMap.has(identity)) {
      uniqueMap.set(identity, item);
    }
  }

  return Array.from(uniqueMap.values());
};

const getRouteIdFromRouteObject = (route) => {
  if (!route) {
    return null;
  }

  if (isPlainObject(route)) {
    return (
      normalizeRouteIdValue(route.id) ??
      normalizeRouteIdValue(route.route_id) ??
      normalizeRouteIdValue(route.routeId)
    );
  }

  return normalizeRouteIdValue(route);
};

export const extractAssignedRouteFromDetails = (details) => {
  if (!isPlainObject(details)) {
    return null;
  }

  for (const key of candidateRouteEntityKeys) {
    const candidate = details[key];
    if (isPlainObject(candidate)) {
      return candidate;
    }
  }

  return null;
};

export const extractAssignedRouteIdFromDetails = (details) => {
  if (!details) {
    return null;
  }

  const explicitRoute = extractAssignedRouteFromDetails(details);
  const explicitRouteId = getRouteIdFromRouteObject(explicitRoute);
  if (explicitRouteId) {
    return explicitRouteId;
  }

  for (const key of candidateRouteIdKeys) {
    const candidate = details[key];
    const normalized = normalizeRouteIdValue(candidate);
    if (normalized) {
      return normalized;
    }
  }

  return null;
};

export const extractRouteIdentifier = (route) => getRouteIdFromRouteObject(route);

export const getRouteDriverName = (route) => {
  if (!isPlainObject(route)) {
    return null;
  }

  const directName =
    typeof route.driver_name === "string" && route.driver_name.trim().length
      ? route.driver_name
      : typeof route.driverName === "string" && route.driverName.trim().length
      ? route.driverName
      : null;

  if (directName) {
    return directName;
  }

  const driverCandidate =
    route.driver ?? route.driver_details ?? route.driverDetails ?? null;

  if (!driverCandidate) {
    return null;
  }

  if (typeof driverCandidate === "string") {
    const normalized = driverCandidate.trim();
    return normalized.length ? normalized : null;
  }

  if (!isPlainObject(driverCandidate)) {
    return null;
  }

  if (
    typeof driverCandidate.full_name === "string" &&
    driverCandidate.full_name.trim().length
  ) {
    return driverCandidate.full_name;
  }

  const nameParts = [
    driverCandidate.first_name ?? driverCandidate.firstName ?? "",
    driverCandidate.last_name ?? driverCandidate.lastName ?? "",
  ]
    .map((part) => (typeof part === "string" ? part.trim() : ""))
    .filter((part) => part.length);

  if (nameParts.length) {
    return nameParts.join(" ");
  }

  return null;
};

export const getRouteVehicleName = (route) => {
  if (!isPlainObject(route)) {
    return null;
  }

  const directName =
    typeof route.vehicle_name === "string" && route.vehicle_name.trim().length
      ? route.vehicle_name
      : typeof route.vehicleName === "string" && route.vehicleName.trim().length
      ? route.vehicleName
      : null;

  if (directName) {
    return directName;
  }

  const vehicleCandidate =
    route.vehicle ?? route.vehicle_details ?? route.vehicleDetails ?? null;

  if (!vehicleCandidate) {
    return null;
  }

  if (typeof vehicleCandidate === "string") {
    const normalized = vehicleCandidate.trim();
    return normalized.length ? normalized : null;
  }

  if (!isPlainObject(vehicleCandidate)) {
    return null;
  }

  const parts = [
    vehicleCandidate.make ?? vehicleCandidate.brand ?? "",
    vehicleCandidate.model ?? "",
    vehicleCandidate.license_plate ?? vehicleCandidate.licensePlate ?? "",
  ]
    .map((part) => (typeof part === "string" ? part.trim() : ""))
    .filter((part) => part.length);

  if (parts.length) {
    return parts.join(" ");
  }

  if (
    typeof vehicleCandidate.name === "string" &&
    vehicleCandidate.name.trim().length
  ) {
    return vehicleCandidate.name;
  }

  return null;
};

const isVehicleLike = (value) => {
  if (!isPlainObject(value)) {
    return false;
  }

  const indicatorKeys = [
    "vehicle_id",
    "vehicleId",
    "transport_vehicle_id",
    "transportVehicleId",
    "license_plate",
    "licensePlate",
  ];

  const descriptiveKeys = ["make", "model", "capacity", "fuel_type", "fuelType"];

  return (
    indicatorKeys.some((key) => key in value) &&
    descriptiveKeys.some((key) => key in value)
  );
};

export const extractVehiclesFromDetails = (details) =>
  collectEntities(details, {
    predicate: isVehicleLike,
    directKeys: [
      "transport_vehicles",
      "transportVehicles",
      "vehicles",
      "assigned_vehicles",
      "assignedVehicles",
      "transport_vehicle_details",
      "transportVehicleDetails",
      "vehicle_details",
      "vehicleDetails",
    ],
    identityFields: [
      "vehicle_id",
      "vehicleId",
      "transport_vehicle_id",
      "transportVehicleId",
      "license_plate",
      "licensePlate",
      "id",
    ],
  });

const isDriverLike = (value) => {
  if (!isPlainObject(value)) {
    return false;
  }

  const indicatorKeys = [
    "driver_id",
    "driverId",
    "license_number",
    "licenseNumber",
    "available_for_trip",
    "availableForTrip",
  ];

  const nameKeys = ["first_name", "last_name", "name", "full_name", "fullName"];

  return indicatorKeys.some((key) => key in value) &&
    nameKeys.some((key) =>
      typeof value[key] === "string" && value[key].trim().length > 0
    );
};

export const extractDriversFromDetails = (details) =>
  collectEntities(details, {
    predicate: isDriverLike,
    directKeys: [
      "drivers",
      "assigned_drivers",
      "assignedDrivers",
      "transport_drivers",
      "transportDrivers",
      "driverAssignments",
      "available_drivers",
      "availableDrivers",
    ],
    identityFields: [
      "driver_id",
      "driverId",
      "license_number",
      "licenseNumber",
      "id",
    ],
  });

export const extractAvailableDriversFromDetails = (details) => {
  if (!details) {
    return { data: [], found: false };
  }

  const candidateKeys = [
    "available_drivers",
    "availableDrivers",
    "drivers_available_for_trip",
    "driversAvailableForTrip",
  ];

  for (const key of candidateKeys) {
    if (Object.prototype.hasOwnProperty.call(details, key)) {
      const value = ensureCandidateArray(details[key], isDriverLike);

      if (value.length) {
        return { data: value.filter(isDriverLike), found: true };
      }

      return { data: [], found: true };
    }
  }

  return { data: [], found: false };
};

const parseBooleanLike = (value) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    if (value === 1) {
      return true;
    }

    if (value === 0) {
      return false;
    }
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["true", "1", "yes", "available", "active", "free"].includes(normalized)) {
      return true;
    }

    if (["false", "0", "no", "unavailable", "inactive", "busy"].includes(normalized)) {
      return false;
    }
  }

  return null;
};

export const getDriverAvailabilityFromFields = (driver) => {
  if (!driver || typeof driver !== "object") {
    return null;
  }

  const availabilityFields = [
    "available_at_trip_time",
    "availableAtTripTime",
    "available_for_trip",
    "availableForTrip",
    "available_during_trip",
    "availableDuringTrip",
    "is_available_for_trip",
    "isAvailableForTrip",
    "is_available",
    "isAvailable",
    "available",
    "active",
    "is_active",
  ];

  for (const field of availabilityFields) {
    if (Object.prototype.hasOwnProperty.call(driver, field)) {
      const parsed = parseBooleanLike(driver[field]);
      if (parsed !== null) {
        return parsed;
      }
    }
  }

  if (typeof driver.status === "string") {
    const normalized = driver.status.trim().toLowerCase();
    if (["available", "active", "free"].includes(normalized)) {
      return true;
    }

    if (["busy", "unavailable", "inactive", "assigned"].includes(normalized)) {
      return false;
    }
  }

  return null;
};

export const isDriverAvailableForTrip = (driver, details) => {
  const directAvailability = getDriverAvailabilityFromFields(driver);
  if (directAvailability !== null) {
    return directAvailability;
  }

  const availabilityWindows = driver?.availability_windows || driver?.availabilityWindows;

  if (
    Array.isArray(availabilityWindows) &&
    availabilityWindows.length > 0 &&
    details?.estimated_start_time &&
    details?.estimated_end_time
  ) {
    const tripStart = dayjs(details.estimated_start_time);
    const tripEnd = dayjs(details.estimated_end_time);

    if (tripStart.isValid() && tripEnd.isValid()) {
      return availabilityWindows.some((window) => {
        if (!window || typeof window !== "object") {
          return false;
        }

        const startCandidate =
          window.start ?? window.from ?? window.start_time ?? window.startTime;
        const endCandidate = window.end ?? window.to ?? window.end_time ?? window.endTime;

        const startMoment = startCandidate ? dayjs(startCandidate) : null;
        const endMoment = endCandidate ? dayjs(endCandidate) : null;

        if (startMoment?.isValid() && endMoment?.isValid()) {
          return (
            (startMoment.isBefore(tripStart) || startMoment.isSame(tripStart)) &&
            (endMoment.isAfter(tripEnd) || endMoment.isSame(tripEnd))
          );
        }

        if (startMoment?.isValid() && !endMoment) {
          return startMoment.isBefore(tripStart) || startMoment.isSame(tripStart);
        }

        if (!startMoment && endMoment?.isValid()) {
          return endMoment.isAfter(tripEnd) || endMoment.isSame(tripEnd);
        }

        return false;
      });
    }
  }

  return true;
};

export const formatDateTime = (value) =>
  value && dayjs(value).isValid() ? dayjs(value).format("YYYY-MM-DD HH:mm") : "-";
