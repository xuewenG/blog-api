import { Module } from '@nestjs/common'
import { CdnController } from './cdn.controller'
import { CdnService } from './cdn.service'
import { DownloadModule } from '../download/download.module'

@Module({
  controllers: [CdnController],
  providers: [CdnService],
  imports: [DownloadModule],
})
export class CdnModule {}
