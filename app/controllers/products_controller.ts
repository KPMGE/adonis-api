import ProductNotFoundException from '#exceptions/product_not_found_exception'
import Product from '#models/product'
import {
  createProductValidator,
  deleteProductValidator,
  getProductValidator,
  updateProductValidator,
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

  async show({ request }: HttpContext) {
    await request.validateUsing(getProductValidator)

    const { productId } = request.params()
    const product = await Product.find(productId)
    if (!product) throw new ProductNotFoundException()

    return product
  }

  async update({ request }: HttpContext) {
    await request.validateUsing(updateProductValidator)

    const { productId } = request.params()
    const product = await Product.find(productId)
    if (!product) throw new ProductNotFoundException()

    const newProduct = request.only(['name', 'description', 'color', 'brand', 'price'])
    await product.merge({ ...newProduct }).save()
  }

  async delete({ request }: HttpContext) {
    await request.validateUsing(deleteProductValidator)

    const { productId } = request.params()
    const product = await Product.find(productId)
    if (!product) throw new ProductNotFoundException()

    product.active = false
    await product.save()
  }
}
