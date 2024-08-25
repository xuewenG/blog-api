import { resolve } from 'path'
import { Injectable, Logger } from '@nestjs/common'
import { exists } from 'fs-extra'
import { CdnMap } from './cdn.interface'
import { DownloadService } from '../download/download.service'

@Injectable()
export class CdnService {
  private readonly CDN_REG = new RegExp('^/cdn/(\\w*)(/.*)$')
  private readonly CDN_MAP: CdnMap = {
    bootcdn: 'cdn.bootcdn.net',
    cdnjs: 'cdnjs.cloudflare.com',
    jsdelivr: 'cdn.jsdelivr.net',
    unpkg: 'unpkg.com',
  }

  constructor(private downloadService: DownloadService) {}

  public async prepareResouce(resourcePath: string) {
    const [_, cdnName, resourceName] = this.CDN_REG.exec(resourcePath) || []
    if (!cdnName || !resourceName) {
      return ''
    }

    const cdnHost = this.CDN_MAP[cdnName]
    if (!cdnHost) {
      return ''
    }

    Logger.log(`cdnHost=${cdnHost}`)
    Logger.log(`resourceName=${resourceName}`)

    const resourceUrl = `https://${cdnHost}${resourceName}`
    const filePath = resolve(`./${resourcePath}`)

    if (await exists(filePath)) {
      return filePath
    }

    try {
      await this.downloadService.save(resourceUrl, filePath)
    } catch (err) {
      Logger.error(err)
      return ''
    }

    return filePath
  }
}
