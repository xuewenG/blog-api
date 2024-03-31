import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { BilirecController } from './bilirec.controller'
import { BilirecService } from './bilirec.service'
import { PushModule } from '../push/push.module'
import { RedisModule } from '../redis/redis.module'

@Module({
  controllers: [BilirecController],
  providers: [BilirecService],
  imports: [ConfigModule, RedisModule, PushModule],
})
export class BilirecModule {}
