import vine from '@vinejs/vine'

export const createSaleValidator = vine.compile(
  vine.object({
    amount: vine.number().min(0),
    params: vine.object({
      productId: vine.number().positive(),
      clientId: vine.number().positive(),
    }),
  })
)
