import vine from '@vinejs/vine'

export const createClientValidator = vine.compile(
  vine.object({
    name: vine.string(),
    cpf: vine.string().regex(/\d{3}\.\d{3}\.\d{3}\-\d{2}/),
    address: vine.object({
      country: vine.string(),
      state: vine.string(),
      city: vine.string(),
      street: vine.string(),
      postalCode: vine.string().regex(/^\d{5}-?\d{3}$/),
    }),
  })
)
