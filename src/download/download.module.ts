import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DownloadService } from './download.service'

@Module({
  providers: [DownloadService],
  exports: [DownloadService],
  imports: [ConfigModule],
})
export class DownloadModule {}
