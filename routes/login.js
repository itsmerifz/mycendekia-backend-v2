import express from 'express'
import { register, login } from '../controllers/loginController.js'
const router = express.Router();

router.post('/register', register)
router.post('/', login)

export default router
