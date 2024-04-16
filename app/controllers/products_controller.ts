import Product from '#models/product'
import { createProductValidator } from '#validators/product'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  async index() {
    const products = await Product.query()
      .select(['id', 'name', 'price'])
      .where('active', true)
      .orderBy('name')
    return products
  }

  async store({ request }: HttpContext) {
    createProductValidator.validate(request.all())

    const data = request.all()
    await Product.create(data)
    return ResponseStatus.Created
  }

  async show({ request }: HttpContext) {
    const { productId } = request.params()
    const product = Product.find(productId)
    return product
  }

  async delete({ request }: HttpContext) {
    const { productId } = request.params()

    const product = await Product.find(productId)
    if (!product) return ResponseStatus.NotFound

    product.active = false
    await product.save()
  }
}
