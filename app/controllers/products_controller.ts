import Product from '#models/product'
import {
  createProductValidator,
  deleteProductValidator,
  getProductValidator,
} from '#validators/product'
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

  async show({ request, response }: HttpContext) {
    await request.validateUsing(getProductValidator)

    const { productId } = request.params()
    const product = await Product.find(productId)

    if (!product) {
      response.abort({ message: 'product not found' }, ResponseStatus.NotFound)
      return
    }

    return product
  }

  async delete({ request, response }: HttpContext) {
    await request.validateUsing(deleteProductValidator)

    const { productId } = request.params()

    const product = await Product.find(productId)

    if (!product) {
      response.abort({ message: 'product not found' }, ResponseStatus.NotFound)
      return
    }

    product.active = false
    await product.save()
  }
}
