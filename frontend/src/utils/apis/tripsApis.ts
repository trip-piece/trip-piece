const tripApis = {
  trip: "/trip",
  aTrip: (tripId: number | undefined): string => `/trip/${tripId}/detail`,
  upcomingTrip: (todayDate: string | undefined): string => `/trip/${todayDate}`,
};

export default tripApis;
