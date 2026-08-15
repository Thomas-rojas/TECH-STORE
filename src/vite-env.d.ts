/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_DESCRIPTION: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_CURRENCY: string
  readonly VITE_LOCALE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
