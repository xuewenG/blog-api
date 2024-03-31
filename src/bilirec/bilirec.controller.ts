import { All, Body, Controller } from '@nestjs/common'
import { Event } from './bilirec.interface'
import { BilirecService } from './bilirec.service'
import { ResultUtil } from '../util/result'

@Controller('/bilirec')
export class BilirecController {
  constructor(private bilirecService: BilirecService) {}

  @All('/webhook')
  public async webhook(@Body() event: Event) {
    const id = event.EventId
    if (!id) {
      return ResultUtil.error('invalid event')
    }

    this.bilirecService.addEvent(event)
    this.bilirecService.next()
  }
}
