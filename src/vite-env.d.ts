/* eslint-disable @typescript-eslint/consistent-type-definitions */
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

type PartialWithRequired<T, K extends keyof T> = Pick<Required<T>, K> & Partial<T>;

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
