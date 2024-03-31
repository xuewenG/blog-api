import { Module } from '@nestjs/common'
import { HolidayController } from './holiday/holiday.controller'
import { HolidayService } from './holiday/holiday.service'

@Module({
  controllers: [HolidayController],
  providers: [HolidayService],
})
export class BlogModule {}
