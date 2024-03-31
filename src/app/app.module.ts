import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BilirecModule } from '../bilirec/bilirec.module'
import { BlogModule } from '../blog/blog.module'
import { PushModule } from '../push/push.module'
import { RedisModule } from '../redis/redis.module'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [BilirecModule, BlogModule, PushModule, RedisModule],
})
export class AppModule {}
