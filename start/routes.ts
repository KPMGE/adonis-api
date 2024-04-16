import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')
const ClientsController = () => import('#controllers/clients_controller')
const ProductsController = () => import('#controllers/products_controller')
const SalesController = () => import('#controllers/sales_controller')

router.post('/signin', [AuthController, 'signup'])
router.post('/login', [AuthController, 'login'])

router.get('/clients', [ClientsController, 'index'])
router.post('/clients', [ClientsController, 'store'])
router.delete('/clients/:clientId', [ClientsController, 'delete'])

router.get('/products', [ProductsController, 'index'])
router.get('/products/:productId', [ProductsController, 'show'])
router.post('/products', [ProductsController, 'store'])
router.delete('/products/:productId', [ProductsController, 'delete'])

router.post('/sales', [SalesController, 'store'])
