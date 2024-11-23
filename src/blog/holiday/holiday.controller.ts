import { Controller, Get } from '@nestjs/common'
import { ResultUtil } from '../../util/result'
import { HolidayService } from './holiday.service'

@Controller('/blog/holiday')
export class HolidayController {
  constructor(private holidayService: HolidayService) {}

  @Get('/next')
  next() {
    const holiday = this.holidayService.next()
    if (!holiday) {
      return ResultUtil.error('next holiday not found')
    }
    return ResultUtil.success(holiday)
  }

  @Get('/rest')
  rest() {
    const holidayList = this.holidayService.rest()
    return ResultUtil.success(holidayList)
  }
}
