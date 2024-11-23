import { Injectable } from '@nestjs/common'
import { Holiday } from './holiday.interafce'
import * as dayjs from 'dayjs'

@Injectable()
export class HolidayService {
  private readonly holidayList: Holiday[] = [
    {
      name: '元旦',
      date: '2025-01-01',
    },
    {
      name: '春节',
      date: '2025-01-28',
    },
    {
      name: '清明节',
      date: '2025-04-04',
    },
    {
      name: '劳动节',
      date: '2025-05-01',
    },
    {
      name: '端午节',
      date: '2025-05-31',
    },
    {
      name: '中秋节、国庆节',
      date: '2025-10-01',
    },
  ]

  public next() {
    const today = dayjs()
    return this.holidayList.find(holiday => dayjs(holiday.date).isAfter(today))
  }

  public rest() {
    const today = dayjs()
    return this.holidayList.filter(holiday =>
      dayjs(holiday.date).isAfter(today),
    )
  }
}
