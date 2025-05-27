import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { BullModule } from '@nestjs/bull'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BilirecModule } from '../bilirec/bilirec.module'
import { BlogModule } from '../blog/blog.module'
import { PushModule } from '../push/push.module'
import { RedisModule } from '../redis/redis.module'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    BilirecModule,
    BlogModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          redis: {
            host: configService.get<string>('REDIS_HOST'),
            port: Number(configService.get<string>('REDIS_PORT')),
            password: configService.get<string>('REDIS_PASSWORD'),
          },
        }
      },
    }),
    PushModule,
    RedisModule,
  ],
})
export class AppModule {}
