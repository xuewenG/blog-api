import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'
import { EventType } from './bilirec.interface'
import { FangtangService } from '../push/fangtang/fangtang.service'
import { RedisService } from '../redis/redis.service'

const REDIS_KEY = {
  BILIREC_LIVING: (roomId: number) => `BILIREC_LIVING_${roomId}`,
  BILIREC_STOP_LIVE_TIMER_ID: (roomId: number) =>
    `BILIREC_STOP_LIVE_TIMER_ID_${roomId}`,
}

@Processor('bilirec')
export class BilirecProcessor {
  constructor(
    private fangtangService: FangtangService,
    private redisService: RedisService,
  ) {}

  @Process('event')
  async handleTranscode(job: Job) {
    const event = job.data
    if (!event) {
      return
    }

    const eventType = event.EventType
    const name = event.EventData.Name
    const roomId = event.EventData.RoomId

    if (eventType === EventType.StreamStarted) {
      Logger.log(`consume StreamStarted event - ${name}`)

      Logger.log('clear timer')
      const oldTimerId =
        Number(
          await this.redisService.get(
            REDIS_KEY.BILIREC_STOP_LIVE_TIMER_ID(roomId),
          ),
        ) || 0
      if (oldTimerId) {
        clearTimeout(oldTimerId)
      }
      await this.redisService.set(
        REDIS_KEY.BILIREC_STOP_LIVE_TIMER_ID(roomId),
        '',
      )

      Logger.log('get live status')
      const living = await this.redisService.get(
        REDIS_KEY.BILIREC_LIVING(roomId),
      )
      Logger.log(`live status=${living}`)
      if (living === 'true') {
        return
      }

      Logger.log('send StreamStarted message')
      await this.redisService.set(REDIS_KEY.BILIREC_LIVING(roomId), 'true')
      await this.fangtangService.send(`${name}开播啦`)
    } else if (eventType === EventType.StreamEnded) {
      Logger.log(`consume StreamEnded event - ${name}`)

      Logger.log('clear timer')
      const oldTimerId =
        Number(
          await this.redisService.get(
            REDIS_KEY.BILIREC_STOP_LIVE_TIMER_ID(roomId),
          ),
        ) || 0
      if (oldTimerId) {
        clearTimeout(oldTimerId)
      }

      Logger.log('set timer')
      const timerId = setTimeout(async () => {
        Logger.log('send StreamEnded message')
        await this.redisService.set(REDIS_KEY.BILIREC_LIVING(roomId), 'false')
        await this.fangtangService.send(`${name}下播啦`)
      }, 60 * 1000)
      await this.redisService.set(
        REDIS_KEY.BILIREC_STOP_LIVE_TIMER_ID(roomId),
        `${timerId}`,
      )
    } else {
      Logger.log(`unknown event, eventType=${eventType}`)
    }
  }
}
