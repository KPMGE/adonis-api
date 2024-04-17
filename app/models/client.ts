import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Address from './address.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Phone from './phone.js'
import Sale from './sale.js'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare cpf: string

  @hasMany(() => Phone)
  declare phones: HasMany<typeof Phone>

  @hasOne(() => Address)
  declare address: HasOne<typeof Address>

  @hasMany(() => Sale)
  declare sales: HasMany<typeof Sale>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
