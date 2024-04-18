import Client from '#models/client'
import Product from '#models/product'
import Sale from '#models/sale'
import { createSaleValidator } from '#validators/sale'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'

export default class SalesController {
  async store({ request, response }: HttpContext) {
    await request.validateUsing(createSaleValidator)

    const { clientId, productId, amount } = request.only(['clientId', 'productId', 'amount'])

    const findClientPromise = Client.find(clientId)
    const findProductPromise = Product.find(productId)
    const [client, product] = await Promise.all([findClientPromise, findProductPromise])

    if (!product || !client) {
      response.abort({ message: 'client or product not found' }, ResponseStatus.NotFound)
      return
    }

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
