import { join } from 'path'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
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

  private readonly downloadDir: string

  constructor(
    private configService: ConfigService,
    private downloadService: DownloadService,
  ) {
    this.downloadDir = this.configService.get<string>('DOWNLOAD_DIR') || './'
    Logger.log(`cdnService init, downloadDir=${this.downloadDir}`)
  }

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
    const filePath = join(this.downloadDir, `./${resourcePath}`)

    if (await exists(filePath)) {
      Logger.log('resource file exists')
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
