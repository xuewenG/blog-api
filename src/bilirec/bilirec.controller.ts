import { InjectQueue } from '@nestjs/bull'
import { All, Body, Controller, Query } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Queue } from 'bull'
import { Event } from './bilirec.interface'
import { ResultUtil } from '../util/result'

@Controller('/bilirec')
export class BilirecController {
  constructor(
    private configService: ConfigService,
    @InjectQueue('bilirec') private queue: Queue,
  ) {}

  @All('/webhook')
  public async webhook(@Query('token') token: string, @Body() event: Event) {
    if (token !== this.configService.get('BILIREC_TOKEN')) {
      return ResultUtil.error('invalid token')
    }

    const id = event.EventId
    if (!id) {
      return ResultUtil.error('invalid event')
    }

    this.queue.add('event', event)
  }
}
