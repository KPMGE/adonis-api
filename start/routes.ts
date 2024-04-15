import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')

router.post('/signin', [AuthController, 'signup'])
router.post('/login', [AuthController, 'login'])
