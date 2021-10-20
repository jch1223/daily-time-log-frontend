export async function createUser(googleAccessToken: string, email: string) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${googleAccessToken}`,
    },
    body: JSON.stringify({
      email,
    }),
  };

  const response = await fetch(`${process.env.REACT_APP_API_SERVER}/users/sign-up`, requestOptions);

  if (!response.ok) {
    throw new Error("Problem fetching data");
  }

  return response.json();
}
