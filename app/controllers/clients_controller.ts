import Address from '#models/address'
import Client from '#models/client'
import { createClientValidator } from '#validators/client'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'

export default class ClientsController {
  async store({ request }: HttpContext) {
    await createClientValidator.validate(request.all())

    const userData = request.only(['name', 'cpf'])
    const addressData = request.only(['address']).address

    const client = await Client.create(userData)
    await Address.create({ ...addressData, clientId: client.id })

    return ResponseStatus.Created
  }
}
