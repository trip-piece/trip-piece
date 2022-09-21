const tripApis = {
  trip: "/api/trip",
  aTrip: (tripId: number | undefined): string => `/api/trip/${tripId}`,
};

export default tripApis;
