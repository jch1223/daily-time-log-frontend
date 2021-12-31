import { useServer } from "../../config/api";

export async function logIn<T>(body: T) {
  if (useServer) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cors: "cors",
      body: JSON.stringify({
        ...body,
      }),
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/users/sign-in`,
      requestOptions,
    );

    if (!response.ok) {
      throw new Error("Problem fetching data");
    }

    return response.json();
  }

  const themeMode = localStorage.get("themeMode") || "light";

  return {
    data: {
      themeMode,
    },
  };
}
