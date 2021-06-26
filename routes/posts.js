import express from 'express'
import { createPost, getPost, updatePost, deletePost, likePost } from '../controllers/handlePost.js'

const Router = express.Router()

Router.get('/', getPost)
Router.post('/', createPost)
Router.patch('/:id', updatePost)
Router.delete('/:id', deletePost)
Router.patch('/:id/likePost', likePost)

export default Router