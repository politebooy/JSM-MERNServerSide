import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express()
app.use(cors())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
dotenv.config()

import postRouter from './routes/posts.js'
app.use('/posts', postRouter)
app.get('/', (req, res) => {
    res.send('<h1>Hellow from js mastry mern project update(1)</h1>')
})

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(app.listen(PORT, () => console.log(`app is listening to the port ${PORT}`)))
    .catch(err => console.log(err))


mongoose.set('useFindAndModify', false)


// const CONNECTION_URL = 'mongodb+srv://mukimbillah:mukimbillah123@cluster0.cbyyf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// const CONNECTION_URL = 'mongodb://localhost:27017/firstMongoos'