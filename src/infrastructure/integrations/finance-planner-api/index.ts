import axios from "axios";

const timeout = import.meta.env.VITE_FINANCE_PLANNER_API_TIMEOUT;
const baseURL = import.meta.env.VITE_FINANCE_PLANNER_API_BASE_URL;

const token = localStorage.getItem("token");

export const apiFinancePlanner = axios.create({
  baseURL: baseURL,
  timeout: timeout,
  headers: {
    "Content-Type": "application/json",
    authorization: token ? token : "",
  },
});

// Adicionar um interceptador de resposta
apiFinancePlanner.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Caso o usuário esteja desautorizado ou desautenticado, seu token é removido e ele é redirecionado para a página de login
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
