import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')
const ClientsController = () => import('#controllers/clients_controller')

router.post('/signin', [AuthController, 'signup'])
router.post('/login', [AuthController, 'login'])

router.post('/clients', [ClientsController, 'store'])
router.get('/clients', [ClientsController, 'index'])
