import vine from '@vinejs/vine'

export const createClientValidator = vine.compile(
  vine.object({
    name: vine.string(),
    cpf: vine.string().regex(/\d{3}\.\d{3}\.\d{3}\-\d{2}/),
    phones: vine.array(
      vine.string().regex(/([+55]{3})([(]?[0]?[1-9]{2}[)]?)[9]?([1-9]{4})-?([0-9]{4})/)
    ),
    address: vine.object({
      country: vine.string(),
      state: vine.string(),
      city: vine.string(),
      street: vine.string(),
      postalCode: vine.string().regex(/^\d{5}-?\d{3}$/),
    }),
  })
)

export const getClientValidator = vine.compile(
  vine.object({
    params: vine.object({
      clientId: vine.number().positive(),
    }),
  })
)
