import Product from '#models/product'
import { createProductValidator } from '#validators/product'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  async store({ request }: HttpContext) {
    createProductValidator.validate(request.all())

    const data = request.all()
    await Product.create(data)
    return ResponseStatus.Created
  }
}
