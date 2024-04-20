import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext, ResponseStatus } from '@adonisjs/core/http'

export default class ProductNotFoundException extends Exception {
  async handle(_: this, ctx: HttpContext) {
    ctx.response.status(ResponseStatus.NotFound).json({ error: 'Product not found!' })
  }
}
