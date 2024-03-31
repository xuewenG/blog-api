import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { FangtangService } from './fangtang.service'

describe('FangtangService', () => {
  let service: FangtangService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FangtangService],
      imports: [ConfigModule.forRoot()],
    }).compile()

    service = module.get<FangtangService>(FangtangService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
