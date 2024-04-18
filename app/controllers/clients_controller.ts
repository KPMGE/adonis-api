import Address from '#models/address'
import Client from '#models/client'
import Phone from '#models/phone'
import {
  createClientValidator,
  deleteClientValidator,
  getClientValidator,
} from '#validators/client'
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

  async show({ request, response }: HttpContext) {
    const { clientId } = request.params()
    const { year, month } = request.qs()

    await request.validateUsing(getClientValidator)

    let query = Client.query()
      .preload('phones')
      .preload('address')
      .preload('sales')
      .where('id', clientId)

    if (year) {
      query = query.andWhereRaw('YEAR(clients.created_at) = :year:', { year: Number(year) })
    }

    if (month) {
      query = query.andWhereRaw('MONTH(clients.created_at) = :month:', { month: Number(month) })
    }

    const client = await query.first()

    if (!client) {
      response.abort({ message: 'client not found' }, ResponseStatus.NotFound)
      return
    }

    return client
  }

  async delete({ request, response }: HttpContext) {
    const { clientId } = request.params()
    await request.validateUsing(deleteClientValidator)

    const client = await Client.find(clientId)

    if (!client) {
      response.abort({ message: 'client not found' }, ResponseStatus.NotFound)
      return
    }

    await client.delete()
  }
}
