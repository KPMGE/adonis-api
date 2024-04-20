import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext, ResponseStatus } from '@adonisjs/core/http'

export default class ClientNotFoundException extends Exception {
  async handle(_: this, ctx: HttpContext) {
    ctx.response.status(ResponseStatus.NotFound).json({ error: 'Client not found!' })
  }
}
