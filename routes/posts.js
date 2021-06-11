import express from 'express'
import { createPost, getPost } from '../controllers/handlePost.js'

const Router = express.Router()

Router.get('/', getPost)
Router.post('/', createPost)

export default Router