import { Test, TestingModule } from '@nestjs/testing'
import { BilirecService } from './bilirec.service'
import { RedisModule } from '../redis/redis.module'
import { PushModule } from '../push/push.module'

describe('BilirecService', () => {
  let service: BilirecService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BilirecService],
      imports: [RedisModule, PushModule],
    }).compile()

    service = module.get<BilirecService>(BilirecService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
