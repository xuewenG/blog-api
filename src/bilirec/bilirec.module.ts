import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { BilirecController } from './bilirec.controller'
import { BilirecProcessor } from './bilirec.processor'
import { PushModule } from '../push/push.module'
import { RedisModule } from '../redis/redis.module'

@Module({
  controllers: [BilirecController],
  providers: [BilirecProcessor],
  imports: [
    BullModule.registerQueue({
      name: 'bilirec',
    }),
    ConfigModule,
    RedisModule,
    PushModule,
  ],
})
export class BilirecModule {}
