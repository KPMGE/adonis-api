import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string().nullable(),
    color: vine.string(),
    brand: vine.string(),
    price: vine.number().positive(),
  })
)

export const getProductValidator = vine.compile(
  vine.object({
    params: vine.object({
      productId: vine.number().positive(),
    }),
  })
)

export const updateProductValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    description: vine.string().nullable().optional(),
    color: vine.string().optional(),
    brand: vine.string().optional(),
    price: vine.number().positive().optional(),
    params: vine.object({
      productId: vine.number().positive(),
    }),
  })
)

export const deleteProductValidator = vine.compile(
  vine.object({
    params: vine.object({
      productId: vine.number().positive(),
    }),
  })
)
