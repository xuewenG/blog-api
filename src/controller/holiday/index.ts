import moment from 'moment'
import { Get, JsonController } from 'routing-controllers'
import { ResultUtil } from '../../util/result'
import { holidayList } from './holiday'

@JsonController('/holiday')
export class HolodayController {
  @Get('/next')
  next() {
    const today = moment()
    const nextHoliday = holidayList.find(holiday =>
      moment(holiday.date).isAfter(today)
    )
    if (!nextHoliday) {
      return ResultUtil.error('next holiday not found')
    }
    return ResultUtil.success(nextHoliday)
  }
  @Get('/rest')
  rest() {
    const today = moment()
    const restHolidayList = holidayList.filter(holiday =>
      moment(holiday.date).isAfter(today)
    )
    if (!restHolidayList) {
      return ResultUtil.error('next holiday not found')
    }
    return ResultUtil.success(restHolidayList)
  }
}
