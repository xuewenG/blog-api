import { Controller, Get, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { CdnService } from './cdn.service'

@Controller('/cdn')
export class CdnController {
  constructor(private cdnService: CdnService) {}

  @Get('/*')
  public async resouce(@Req() req: Request, @Res() res: Response) {
    const resourcePath = req.path
    if (resourcePath.includes('..')) {
      res.sendStatus(404)
      res.end()
      return
    }

    const filePath = await this.cdnService.prepareResouce(resourcePath)
    if (!filePath) {
      res.sendStatus(404)
      res.end()
      return
    }

    res.header('Cache-Control', 'public, max-age=31536000')
    res.sendFile(filePath)
  }
}
