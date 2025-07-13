/* eslint-disable @typescript-eslint/consistent-type-definitions */
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

// to get TypeScript IntelliSense for user-defined env variables that are prefixed with VITE_
// interface (not type!)
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
