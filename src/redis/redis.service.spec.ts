import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { RedisService } from './redis.service'

describe('RedisService', () => {
  let service: RedisService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisService],
      imports: [ConfigModule.forRoot()],
    }).compile()

    service = module.get<RedisService>(RedisService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
