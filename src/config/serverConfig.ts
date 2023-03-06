const env = process.env

export const serverConfig = {
  port: env.PORT || 8081,
  contextPath: env.CONTEXT_PATH || '/blog',
  corsOrigin: (env.CORS_ORIGIN || '').split(',').filter(origin => origin)
}
