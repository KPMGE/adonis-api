import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { JwtGuard, JwtUserProviderContract } from '../auth/guards/jwt.js'

type Auth = JwtGuard<JwtUserProviderContract<any>>

export default class AuthController {
  async signup({ request, auth }: HttpContext) {
    const data = request.only(['name', 'email', 'password'])

    const user = await User.create(data)

    const token = await (auth.use('jwt') as Auth).generate(user)
    return token
  }

  async login({ request, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    const token = await (auth.use('jwt') as Auth).generate(user)
    return token
  }
}
