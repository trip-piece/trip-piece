const tripApis = {
  trip: "/trip",
  aTrip: (tripId: number | undefined): string => `/trip/${tripId}`,
};

export default tripApis;
