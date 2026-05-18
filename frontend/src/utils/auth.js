import axios from "axios";

export async function getAuthToken() {
  try {
    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/auth",
      {
        email: "haseenas.23it@kongu.edu",
        name: "haseena s",
        rollNo: "23itr058",
        accessCode: "RyZBcy",
        clientID: "510fe388-3354-4306-bc24-0ef6b55e1de3",
        clientSecret: "QEGYjkFdUjXJgGWJ"

      }
    );

    localStorage.setItem(
      "access_token",
      response.data.access_token
    );

    return response.data.access_token;
  } catch (error) {
    throw error;
  }
}