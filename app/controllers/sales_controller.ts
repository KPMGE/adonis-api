import Sale from '#models/sale'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'

export default class SalesController {
  async store({ request }: HttpContext) {
    const { clientId, productId, amount } = request.only(['clientId', 'productId', 'amount'])

    await Sale.create({
      clientId: clientId,
      productId: productId,
      amount: amount,
    })

    return ResponseStatus.Created
  }
}
