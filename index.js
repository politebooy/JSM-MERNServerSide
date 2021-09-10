import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express()
app.use(cors())
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
dotenv.config()

import postRouter from './routes/posts.js'
import userRouter from './routes/users.js'

app.use('/posts', postRouter)
app.use('/users', userRouter)

app.get('/', (req, res) => {
    res.send('<h1>Hellow from js mastry mern project update(1)</h1>')
})

const PORT = process.env.PORT || 4000
const CONNECTION_URL = 'mongodb://localhost:27017/firstMongoos'

mongoose.connect(CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(app.listen(PORT, () => console.log(`app is listening to the port ${PORT}`)))
    .catch(err => console.log(err))


mongoose.set('useFindAndModify', false)


// const CONNECTION_URL = 'mongodb+srv://mukimbillah:mukimbillah123@cluster0.cbyyf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'