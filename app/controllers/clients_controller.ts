import Address from '#models/address'
import Client from '#models/client'
import Phone from '#models/phone'
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
    const crateAddressPromise = Address.create({ ...addressData, clientId: client.id })
    const createPhonesPromise = this.insertPhones(client.id, phones)

    await Promise.all([crateAddressPromise, createPhonesPromise])

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

  async update({ request, response }: HttpContext) {
    await request.validateUsing(updateClientValidator)

    const { clientId } = request.params()
    const client = await Client.find(clientId)

    if (!client) {
      response.abort({ message: 'client not found' }, ResponseStatus.NotFound)
      return
    }

    const { name } = request.only(['name'])
    const { address } = request.only(['address'])
    const { phones } = request.only(['phones'])

    if (name) {
      client.merge({ name })
    }

    if (address) {
      const clientAddress = await Address.findBy({ clientId: client.id })
      clientAddress?.merge({ ...address })
      clientAddress?.save()
    }

    if (phones) {
      this.deleteAllPhones(client.id)
      await this.insertPhones(client.id, phones)
    }

    await client.save()
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

  private async deleteAllPhones(clientId: number) {
    const phones = await Phone.findManyBy({ clientId })
    phones.forEach((phone) => phone.delete())
  }

  private async insertPhones(clientId: number, phones: string[]) {
    phones.map((number) => Phone.create({ clientId, number }))
  }
}
