import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const ClientsController = () => import('#controllers/clients_controller')
const ProductsController = () => import('#controllers/products_controller')
const SalesController = () => import('#controllers/sales_controller')

router
  .group(() => {
    router.post('/signup', [AuthController, 'signup'])
    router.post('/login', [AuthController, 'login'])

    router
      .group(() => {
        router.get('/clients', [ClientsController, 'index'])
        router.get('/clients/:clientId', [ClientsController, 'show'])
        router.post('/clients', [ClientsController, 'store'])
        router.patch('/clients/:clientId', [ClientsController, 'update'])
        router.delete('/clients/:clientId', [ClientsController, 'delete'])

        router.get('/products', [ProductsController, 'index'])
        router.get('/products/:productId', [ProductsController, 'show'])
        router.post('/products', [ProductsController, 'store'])
        router.patch('/products/:productId', [ProductsController, 'update'])
        router.delete('/products/:productId', [ProductsController, 'delete'])

        router.post('/sales', [SalesController, 'store'])
      })
      .use(middleware.auth())
  })
  .prefix('/api/v1')
