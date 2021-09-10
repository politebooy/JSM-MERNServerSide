import express from 'express'
import { signIn, signUp } from '../controllers/user.js'

const Router = express.Router()

Router.post('/signin', signIn)
Router.post('/signup', signUp)


export default Router