import { createClient } from 'redis'

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class RedisService {
  private client: ReturnType<typeof createClient>

  constructor(private configService: ConfigService) {
    this.client = createClient({
      url: this.configService.get<string>('REDIS_URL'),
      password: this.configService.get<string>('REDIS_PASSWORD'),
    })
  }

  private async connect() {
    if (!this.client.isOpen) {
      await this.client.connect()
    }
  }

  public async set(
    key: string,
    value: string,
    options?: {
      PX: number
    },
  ) {
    await this.connect()
    await this.client.set(key, value, options)
  }

  public async get(key: string) {
    await this.connect()
    return this.client.get(key)
  }
}
