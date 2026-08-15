function readEnv(key: keyof ImportMetaEnv, fallback = ''): string {
  return import.meta.env[key] ?? fallback
}

export const env = {
  appName: readEnv('VITE_APP_NAME', 'TITAN'),
  appDescription: readEnv('VITE_APP_DESCRIPTION', 'Tienda de tecnología'),
  apiBaseUrl: readEnv('VITE_API_BASE_URL'),
  currency: readEnv('VITE_CURRENCY', 'USD'),
  locale: readEnv('VITE_LOCALE', 'es-ES'),
  isApiEnabled: Boolean(readEnv('VITE_API_BASE_URL')),
} as const
