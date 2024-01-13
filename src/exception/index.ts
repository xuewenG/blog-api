import express from 'express'
import { BaseException } from './baseException'

const globalExceptionHandler = (app: express.Application): void => {
  app.use(
    (
      err: Error,
      _request: express.Request,
      response: express.Response,
      next: express.NextFunction,
    ): void => {
      console.error(err)
      if (response.headersSent) {
        next(err)
        return
      }
      if (err instanceof BaseException) {
        response.json({
          code: err.code,
          msg: err.msg,
        })
      } else {
        response.json({
          code: 5000,
        })
      }
    },
  )
}

export { globalExceptionHandler }
