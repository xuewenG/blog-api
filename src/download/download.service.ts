import { dirname } from 'path'
import { promises as streamPromises } from 'stream'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createWriteStream, ensureDir } from 'fs-extra'
import nodeFetch from 'node-fetch'
import { SocksProxyAgent } from 'socks-proxy-agent'

@Injectable()
export class DownloadService {
  private agent: SocksProxyAgent | undefined

  constructor(private configService: ConfigService) {
    const socksProxyAddress = this.configService.get<string>(
      'DOWNLOAD_SOCKS_PROXY_ADDRESS',
    )

    Logger.log(`downloadService init, socksProxyAddress=${socksProxyAddress}`)
    if (socksProxyAddress) {
      this.agent = new SocksProxyAgent(socksProxyAddress)
    }
  }

  public async save(url: string, filePath: string) {
    await ensureDir(dirname(filePath))

    Logger.log(`start download, url=${url}`)
    const resp = await nodeFetch(url, { agent: this.agent })
    if (!resp.ok || resp.status !== 200 || !resp.body) {
      throw new Error(
        `Error: download failed, url=${url}, status=${resp.status}`,
      )
    }

    await streamPromises.pipeline(resp.body, createWriteStream(filePath))
  }
}
