import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { BarkMessage, Message } from './bark.interface'

@Injectable()
export class BarkService {
  private static readonly DEFAULT_MESSAGE: Message = Object.freeze({
    title: '',
    body: '',
    level: 'active',
    badge: 1,
    autoCopy: false,
    copy: undefined,
    sound: '',
    icon: '',
    group: '',
    isArchive: true,
    url: '',
  })

  constructor(private configService: ConfigService) {}

  public async send(message: Partial<Message>) {
    const deviceKey = this.configService.get<string>('BARK_API_DEVICE_KEY')
    if (!deviceKey) {
      Logger.error('invalid deviceKey')
      return
    }

    const barkApiUrl = this.configService.get<string>('BARK_API_URL')
    const barkApiUser = this.configService.get<string>('BARK_API_USER')
    const barkApiPassword = this.configService.get<string>('BARK_API_PASSWORD')
    if (!barkApiUrl) {
      Logger.error('invalid bark api url')
      return
    }

    Logger.log(
      `request bark push API, title=${message.title}, detail=${message.body}`,
    )

    const finalMessage: Message = {
      ...BarkService.DEFAULT_MESSAGE,
      ...message,
    }
    const finalBarkMessage: BarkMessage = {
      ...finalMessage,
      device_key: deviceKey,
      isArchive: finalMessage.isArchive ? 1 : 0,
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (barkApiUser && barkApiPassword) {
      headers.Authorization = `Basic ${Buffer.from(`${barkApiUser}:${barkApiPassword}`, 'utf-8').toString('base64')}`
    }

    return fetch(`${barkApiUrl}/push`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(finalBarkMessage),
    })
  }
}
