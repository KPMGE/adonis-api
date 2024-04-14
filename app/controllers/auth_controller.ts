import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async signin({ request, auth }: HttpContext) {
    const data = request.only(['name', 'email', 'password'])

    const user = await User.create(data)

    const token = await auth.use('jwt').generate(user)
    return token
  }

  async login({}: HttpContext) {}

  async logout({}: HttpContext) {}
}
