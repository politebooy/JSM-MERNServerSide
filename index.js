import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()
app.use(cors())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

import postRouter from './routes/posts.js'

app.use('/posts', postRouter)

const CONNECTION_URL = 'mongodb+srv://mukimbillah:mukimbillah123@cluster0.cbyyf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(app.listen(PORT, () => console.log(`app is listening to the port ${PORT}`)))
    .catch(err => console.log(err))


