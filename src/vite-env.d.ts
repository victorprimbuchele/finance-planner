/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // more env variables...
  VITE_FINANCE_PLANNER_API_BASE_URL: string;
  VITE_FINANCE_PLANNER_API_TIMEOUT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
