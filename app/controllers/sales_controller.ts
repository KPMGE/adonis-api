import Product from '#models/product'
import Sale from '#models/sale'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'

export default class SalesController {
  async store({ request }: HttpContext) {
    const { clientId, productId, amount } = request.only(['clientId', 'productId', 'amount'])

    const product = await Product.find(productId)
    if (!product) return ResponseStatus.NotFound

    const unitaryPrice = product.price
    const totalPrice = unitaryPrice * amount

    await Sale.create({
      clientId,
      productId,
      amount,
      totalPrice,
      unitaryPrice,
    })

    return ResponseStatus.Created
  }
}
