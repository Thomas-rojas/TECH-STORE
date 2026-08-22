import { createApp } from './app'
import { env } from './config/env'

const app = createApp()

app.listen(env.PORT, () => {
  console.log(`ImportCAS API listening on http://localhost:${env.PORT}`)
  console.log(`CORS origins: ${env.CORS_ORIGINS}`)
})
