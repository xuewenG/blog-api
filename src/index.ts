import cors, { CorsOptions } from 'cors'
import express from 'express'
import { useExpressServer } from 'routing-controllers'
import { serverConfig } from './config'
import { HolodayController } from './controller'
import { globalExceptionHandler } from './exception'

const app = express()

// use exception handler
globalExceptionHandler(app)
// use cors
const corsOptions: CorsOptions = {
  origin: serverConfig.corsOrigin
}
app.use(cors(corsOptions))
// use json
app.use(express.json())
// use routing-controllers
useExpressServer(app, {
  routePrefix: serverConfig.contextPath,
  controllers: [HolodayController]
})

app.listen(serverConfig.port)

process.on('SIGTERM', () => {
  process.exit(0)
})
