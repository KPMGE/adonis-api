import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')

router.post('/signin', [AuthController, 'signin'])
router.post('/login', [AuthController, 'login'])
