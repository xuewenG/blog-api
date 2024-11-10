import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { BarkService } from './bark/bark.service'
import { FangtangService } from './fangtang/fangtang.service'

@Module({
  providers: [BarkService, FangtangService],
  imports: [ConfigModule.forRoot()],
  exports: [BarkService, FangtangService],
})
export class PushModule {}
