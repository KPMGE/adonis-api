import Client from '#models/client'
import Product from '#models/product'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'

export default class SalesController {
  async store({ request }: HttpContext) {
    const { clientId, productId } = request.only(['clientId', 'productId'])

    const client = await Client.find(clientId)
    const product = await Product.find(productId)

    if (!product || !client) {
      return ResponseStatus.NotFound
    }

    await client.related('sales').save(product)

    return ResponseStatus.Created
  }
}
