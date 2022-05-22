import axios from "axios";

const timeout = import.meta.env.VITE_FINANCE_PLANNER_API_TIMEOUT;
const baseURL = import.meta.env.VITE_FINANCE_PLANNER_API_BASE_URL;

export const apiFinancePlanner = axios.create({
  baseURL: baseURL,
  timeout: timeout,
  headers: {
    "Content-Type": "application/json",

    authorization:
      localStorage.getItem("token") != null
        ? (localStorage.getItem("token") as string)
        : "",
  },
});
