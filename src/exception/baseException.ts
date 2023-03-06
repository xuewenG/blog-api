export class BaseException extends Error {
  code: number
  msg: string

  constructor(code?: number, msg?: string) {
    super()
    this.code = code || 4000
    this.msg = msg || 'RequestFailed'
  }
}
