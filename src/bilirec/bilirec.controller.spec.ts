import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { BilirecController } from './bilirec.controller'
import { BilirecService } from './bilirec.service'
import { RedisModule } from '../redis/redis.module'
import { PushModule } from '../push/push.module'

describe('BilirecController', () => {
  let controller: BilirecController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BilirecController],
      providers: [BilirecService],
      imports: [ConfigModule, RedisModule, PushModule],
    }).compile()

    controller = module.get<BilirecController>(BilirecController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
