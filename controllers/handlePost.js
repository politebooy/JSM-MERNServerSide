import postModel from '../models/postModel.js'
import mongoose from 'mongoose'

export const getPost = async (req, res) => {
    try {
        const postModels = await postModel.find()

        res.status(200).json(postModels)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {

    const post = req.body
    const newPost = new postModel({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}



export const updatePost = async (req, res) => {
    const { id } = req.params
    const post = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id")

    const updatedPost = await postModel.findByIdAndUpdate(id, post, { new: true })
    res.json(updatedPost)
}


export const deletePost = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id")

    await postModel.findByIdAndRemove(id)
    res.json({ message: "post deleted successfully" })
}

export const likePost = async (req, res) => {
    const { id } = req.params

    console.log(req.userId)
    if (!req.userId) return res.json({ message: "Unauthenticated" })

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id")

    const post = await postModel.findById(id)

    const index = post.likes.findIndex((id) => id === String(req.userId))

    if (index === -1) {
        post.likes.push(req.userId)
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }

    const updatedPost = await postModel.findByIdAndUpdate(id, post, { new: true })
    res.json(updatedPost)
}