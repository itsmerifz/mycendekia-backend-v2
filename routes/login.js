import express from 'express'
import { register, login, signOut } from '../controllers/loginController.js'
const router = express.Router();

router.post('/register', register)
router.post('/', login)
router.post('/signout', signOut)

export default router
