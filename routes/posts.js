import express from 'express'
import { createPost, getPost, updatePost, deletePost, likePost } from '../controllers/handlePost.js'
import auth from '../middleware/auth.js'

const Router = express.Router()

Router.get('/', getPost)
Router.post('/', auth, createPost)
Router.patch('/:id', auth, updatePost)
Router.delete('/:id', auth, deletePost)
Router.patch('/:id/likePost', auth, likePost)

export default Router