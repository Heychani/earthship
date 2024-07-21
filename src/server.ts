import express from 'express'
import router from './router'

const app = express() //make the api

app.get('/', (req, res) => {
    console.log('hello from express');
    res.status(200)
    res.json({message: 'hello'})
})

app.use('/api', router)

export default app
