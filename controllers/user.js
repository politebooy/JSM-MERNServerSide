import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

export const signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) return res.status(404).json({ message: 'User dosent exist' })
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalide credential" })
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", { expiresIn: "1h" })
        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong..." })
    }
}


export const signUp = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: "User already exist..." })
        if (password !== confirmPassword) return res.status(400).json({ message: "Password dosen't match" })
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })
        const token = await jwt.sign({ email: result.email, id: result._id }, "test", { expiresIn: '1h' })
        res.status(200).json({ result, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong..." })
    }
}