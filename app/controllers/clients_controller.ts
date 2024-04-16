import Address from '#models/address'
import Client from '#models/client'
import Phone from '#models/phone'
import { createClientValidator } from '#validators/client'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'

export default class ClientsController {
  async index() {
    const clients = await Client.query().orderBy('id')
    return clients
  }

  async store({ request }: HttpContext) {
    await createClientValidator.validate(request.all())

    const userData = request.only(['name', 'cpf'])
    const addressData = request.only(['address']).address
    const phones: string[] = request.only(['phones']).phones

    const client = await Client.create(userData)
    const crateAddressPromise = Address.create({ ...addressData, clientId: client.id })
    const createPhonesPromise = phones.map((phone) =>
      Phone.create({ clientId: client.id, number: phone })
    )

    await Promise.all([crateAddressPromise, ...createPhonesPromise])

    return ResponseStatus.Created
  }
}
