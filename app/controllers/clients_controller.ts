import ClientNotFoundException from '#exceptions/client_not_found_exception'
import Client from '#models/client'
import {
  createClientValidator,
  deleteClientValidator,
  getClientValidator,
  updateClientValidator,
} from '#validators/client'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'

export default class ClientsController {
  async index() {
    const clients = await Client.query()
      .select(['id', 'name', 'createdAt', 'updatedAt'])
      .orderBy('id')
    return clients
  }

  async store({ request }: HttpContext) {
    await createClientValidator.validate(request.all())

    const userData = request.only(['name', 'cpf'])
    const addressData = request.only(['address']).address
    const phones: string[] = request.only(['phones']).phones

    const client = await Client.create(userData)

    const crateAddressPromise = client.related('address').create(addressData)
    const createPhonesPromise = client
      .related('phones')
      .createMany(phones.map((number) => ({ number })))

    await Promise.all([crateAddressPromise, createPhonesPromise])

    return ResponseStatus.Created
  }

  async show({ request }: HttpContext) {
    await request.validateUsing(getClientValidator)

    const { clientId } = request.params()
    const { year, month } = request.qs()

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
    if (!client) throw new ClientNotFoundException()

    return client
  }

  async update({ request }: HttpContext) {
    await request.validateUsing(updateClientValidator)

    const { clientId } = request.params()
    const client = await Client.find(clientId)
    if (!client) throw new ClientNotFoundException()

    const { name } = request.only(['name'])
    const { address } = request.only(['address'])
    const { phones } = request.only(['phones'])

    if (name) {
      client.merge({ name })
    }

    if (address) {
      client.related('address').updateOrCreate({ clientId: client.id }, { ...address })
    }

    if (phones) {
      const newPhones = phones.map((number: string) => ({ number }))
      client.related('phones').updateOrCreate({ clientId: client.id }, newPhones)
    }

    await client.save()
  }

  async delete({ request }: HttpContext) {
    const { clientId } = request.params()
    await request.validateUsing(deleteClientValidator)

    const client = await Client.find(clientId)
    if (!client) throw new ClientNotFoundException()

    await client.delete()
  }
}
