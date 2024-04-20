import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler, ResponseStatus } from '@adonisjs/core/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction

  async handle(error: unknown, ctx: HttpContext) {
    if (error.code === 'ER_DUP_ENTRY') {
      return ctx.response
        .status(ResponseStatus.UnprocessableEntity)
        .json({ errror: 'Invalid credentials' })
    }

    return ctx.response
      .status(ResponseStatus.InternalServerError)
      .json({ errror: 'Internal server error' })
  }

  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
