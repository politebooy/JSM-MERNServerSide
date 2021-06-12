import postModel from '../models/postModel.js'

export const getPost = async (req, res) => {
    try {
        const postModels = await postModel.find()

        res.status(200).json(postModels)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createPost = async (req, res) => {

    const post = req.body
    const newPost = new postModel(post)

    try {
        await newPost.save()

        res.status(201).json(newPost)
        // console.log(newPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}