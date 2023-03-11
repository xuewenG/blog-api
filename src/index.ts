import 'reflect-metadata'
import { CorsOptions } from 'cors'
import express from 'express'
import { useExpressServer } from 'routing-controllers'
import { serverConfig } from './config'
import { HolodayController } from './controller/holidayController'
import { globalExceptionHandler } from './exception'

const app = express()

// use routing-controllers
const corsOptions: CorsOptions = {
  origin: serverConfig.corsOrigin,
}
useExpressServer(app, {
  cors: corsOptions,
  defaultErrorHandler: false,
  routePrefix: serverConfig.contextPath,
  controllers: [HolodayController],
})
// exception handler
globalExceptionHandler(app)

const port = serverConfig.port
app.listen(port, () => {
  console.log(`Server running at: http://127.0.0.1:${port}`)
})

process.on('SIGTERM', () => {
  process.exit(0)
})
