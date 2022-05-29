import axios from "axios";
import { resolve } from "path";

const timeout = import.meta.env.VITE_FINANCE_PLANNER_API_TIMEOUT;
const baseURL = import.meta.env.VITE_FINANCE_PLANNER_API_BASE_URL;

export const apiFinancePlanner = axios.create({
  baseURL: baseURL,
  timeout: timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

apiFinancePlanner.interceptors.request.use(
  (config) => {
    config = {
      ...config,
      headers: {
        ...config.headers,
        Authorization: localStorage.getItem("token") as string,
      },
    };
    return Promise.resolve(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Adicionar um interceptador de resposta
apiFinancePlanner.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Caso o usuário esteja desautorizado ou desautenticado, seu token é removido e ele é redirecionado para a página de login
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.setItem("isAuth", "false");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
