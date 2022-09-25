const tripApis = {
  trip: "/trip",
  aTrip: (tripId: number | undefined): string => `/trip/${tripId}`,
  upcomingTrip: (todayDate: string | undefined): string => `/trip/${todayDate}`,
};

export default tripApis;
