import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)
  const env = process.env

  app.enableCors({
    origin: (env.CORS_ORIGIN || '').split(',').filter(origin => !!origin),
  })

  const port = Number(env.PORT) || 8080
  await app.listen(port)
}

bootstrap()
