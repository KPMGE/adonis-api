import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')
const ClientsController = () => import('#controllers/clients_controller')
const ProductsController = () => import('#controllers/products_controller')
const SalesController = () => import('#controllers/sales_controller')

router.post('/signin', [AuthController, 'signup'])
router.post('/login', [AuthController, 'login'])

router.post('/clients', [ClientsController, 'store'])
router.get('/clients', [ClientsController, 'index'])

router.get('/products', [ProductsController, 'index'])
router.post('/products', [ProductsController, 'store'])

router.post('/sales', [SalesController, 'store'])
