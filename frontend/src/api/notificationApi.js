import axios from "axios";
import { Log } from "../middleware/logger.js";

const BASE_URL =
  "http://4.224.186.213/evaluation-service";

export async function fetchNotifications(
  page = 1,
  limit = 10,
  type = ""
) {
  try {

    await Log(
      "frontend",
      "info",
      "api",
      `Fetching notifications page ${page}`
    );

    const token =
      localStorage.getItem("access_token");

    const response = await axios.get(
      `${BASE_URL}/notifications`,
      {
        params: {
          page,
          limit,
          notification_type:
            type || undefined,
        },

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await Log(
      "frontend",
      "info",
      "api",
      "Notifications fetched successfully"
    );

    return response.data.notifications;

  } catch (error) {

    await Log(
      "frontend",
      "error",
      "api",
      error.message
    );

    throw error;
  }
}