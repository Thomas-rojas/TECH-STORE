function readEnv(key: keyof ImportMetaEnv, fallback = ''): string {
  return import.meta.env[key] ?? fallback
}

const apiBase =
  readEnv('VITE_API_BASE_URL') || readEnv('VITE_API_URL') || ''

export const env = {
  appName: readEnv('VITE_APP_NAME', 'ImportCAS'),
  appDescription: readEnv('VITE_APP_DESCRIPTION', 'Tu acceso directo a la tecnología en Colombia'),
  apiBaseUrl: apiBase,
  currency: readEnv('VITE_CURRENCY', 'COP'),
  locale: readEnv('VITE_LOCALE', 'es-CO'),
  isApiEnabled: Boolean(apiBase),
} as const
