import { Injectable } from '@nestjs/common'
import { Holiday } from './holiday.interafce'
import * as dayjs from 'dayjs'

@Injectable()
export class HolidayService {
  private readonly holidayList: Holiday[] = [
    {
      name: '元旦',
      date: '2024-01-01',
    },
    {
      name: '春节',
      date: '2024-02-10',
    },
    {
      name: '清明节',
      date: '2024-04-04',
    },
    {
      name: '劳动节',
      date: '2024-05-01',
    },
    {
      name: '端午节',
      date: '2024-06-08',
    },
    {
      name: '中秋节',
      date: '2024-09-15',
    },
    {
      name: '国庆节',
      date: '2024-10-01',
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
