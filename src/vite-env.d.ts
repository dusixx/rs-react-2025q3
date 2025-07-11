/* eslint-disable @typescript-eslint/consistent-type-definitions */
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

// to get TypeScript IntelliSense for user-defined env variables that are prefixed with VITE_
// interface (not type!)
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_CTP_PROJECT_KEY: string;
  readonly VITE_CTP_CLIENT_ID: string;
  readonly VITE_CTP_CLIENT_SECRET: string;
  readonly VITE_CTP_API_URL: string;
  readonly VITE_CTP_IMPORT_URL: string;
  readonly VITE_CTP_AUTH_URL: string;
  readonly VITE_CTP_SCOPES: string;
  readonly VITE_CTP_ANONYMOUS_ID: string;
  readonly VITE_DB_RAW_DATA_SRC_PATH: string;
  readonly VITE_CTP_IMPORT_CONTAINER_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
