import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth'

const app = express() //make the api

app.use(cors())
app.use(morgan('dev')) //middleware at top, use it for the entire app due to it being in the main app
app.use(express.json()) // this one allows a client to send us json, without this we would have to manually do it
app.use(express.urlencoded({extended: true})) // allows a client to add a string or enquire a string, if you don't do this it won't allow a query string

app.get('/', (req, res) => {
    console.log('hello from express');
    res.status(200)
    res.json({message: 'hello'})
})

app.use('/api', protect, router)

export default app
