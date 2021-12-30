export async function getSchedules(googleAccessToken: string) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${googleAccessToken}`,
    },
  };

  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=2021-01-01T00:00:00Z",
    requestOptions,
  );

  if (!response.ok) {
    throw new Error("Problem fetching data");
  }

  return response.json();
}
