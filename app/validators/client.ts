import vine from '@vinejs/vine'

const validateCpfRegex = /\d{3}\.\d{3}\.\d{3}\-\d{2}/
const validateNumberRegex = /([+55]{3})([(]?[0]?[1-9]{2}[)]?)[9]?([1-9]{4})-?([0-9]{4})/
const validatePostalCodeRegex = /^\d{5}-?\d{3}$/

export const createClientValidator = vine.compile(
  vine.object({
    name: vine.string(),
    cpf: vine.string().regex(validateCpfRegex),
    phones: vine.array(vine.string().regex(validateNumberRegex)),
    address: vine.object({
      country: vine.string(),
      state: vine.string(),
      city: vine.string(),
      street: vine.string(),
      postalCode: vine.string().regex(validatePostalCodeRegex),
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

export const updateClientValidator = vine.compile(
  vine.object({
    phones: vine.array(vine.string().regex(validateNumberRegex)).optional(),
    name: vine.string().optional(),
    address: vine
      .object({
        country: vine.string().optional(),
        state: vine.string().optional(),
        city: vine.string().optional(),
        street: vine.string().optional(),
        postalCode: vine.string().regex(validatePostalCodeRegex).optional(),
      })
      .optional(),
    params: vine.object({
      clientId: vine.number().positive(),
    }),
  })
)

export const deleteClientValidator = vine.compile(
  vine.object({
    params: vine.object({
      clientId: vine.number().positive(),
    }),
  })
)
