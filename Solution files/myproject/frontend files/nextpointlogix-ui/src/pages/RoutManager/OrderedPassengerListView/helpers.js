import dayjs from "dayjs";

export const extractVehiclesFromDetails = (details) => {
  if (!details) {
    return [];
  }

  if (Array.isArray(details)) {
    return details;
  }

  const candidates = [
    details.transport_vehicles,
    details.vehicles,
    details.assigned_vehicles,
    details.assignedVehicles,
    details.transportVehicles,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }

  return [];
};

export const extractDriversFromDetails = (details) => {
  if (!details) {
    return [];
  }

  if (Array.isArray(details)) {
    return details;
  }

  const candidates = [
    details.drivers,
    details.assigned_drivers,
    details.assignedDrivers,
    details.transport_drivers,
    details.transportDrivers,
    details.driverAssignments,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }

  return [];
};

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
      const value = details[key];

      if (Array.isArray(value)) {
        return { data: value, found: true };
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
