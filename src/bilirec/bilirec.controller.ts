import { All, Body, Controller, Query } from '@nestjs/common'
import { Event } from './bilirec.interface'
import { BilirecService } from './bilirec.service'
import { ResultUtil } from '../util/result'
import { ConfigService } from '@nestjs/config'

@Controller('/bilirec')
export class BilirecController {
  constructor(
    private configService: ConfigService,
    private bilirecService: BilirecService,
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

    this.bilirecService.addEvent(event)
    this.bilirecService.next()
  }
}
