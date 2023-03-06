import express from 'express'
import { BaseException } from './baseException'

const globalExceptionHandler = (app: express.Application): void => {
  app.use(
    (
      err: Error,
      _request: express.Request,
      response: express.Response,
      _next: express.NextFunction
    ) => {
      console.error(err)
      debugger
      if (err instanceof BaseException) {
        response.json({
          code: err.code,
          msg: err.msg
        })
      } else {
        response.json({
          code: 5000
        })
      }
    }
  )
}

export { globalExceptionHandler }
