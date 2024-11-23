import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CdnController } from './cdn.controller'
import { CdnService } from './cdn.service'
import { DownloadModule } from '../download/download.module'

@Module({
  controllers: [CdnController],
  providers: [CdnService],
  imports: [ConfigModule, DownloadModule],
})
export class CdnModule {}
