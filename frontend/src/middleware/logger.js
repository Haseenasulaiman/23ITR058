import axios from "axios";

const VALID_STACKS = [
  "backend",
  "frontend",
];

const VALID_LEVELS = [
  "debug",
  "info",
  "warn",
  "error",
  "fatal",
];

const VALID_PACKAGES = [
  "api",
  "component",
  "hook",
  "page",
  "state",
  "style",
  "auth",
  "config",
  "middleware",
  "utils",
];

export async function Log(
  stack,
  level,
  packageName,
  message
) {
  try {
    if (!VALID_STACKS.includes(stack)) {
      throw new Error("Invalid stack");
    }

    if (!VALID_LEVELS.includes(level)) {
      throw new Error("Invalid level");
    }

    if (!VALID_PACKAGES.includes(packageName)) {
      throw new Error("Invalid package");
    }

    const token = localStorage.getItem(
      "access_token"
    );

    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Logging failed");
  }
}