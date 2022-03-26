import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import 'dotenv/config'

import userRouter from './src/router/user.router'


const app = express();

mongoose.connect(String(process.env.DBURL))
  .then(() => console.log('Connected to database'))
  .catch(() => console.log("Can't connect to the database"))

mongoose.set('debug', true)


app.use(express.json())
app.use(morgan('tiny'))



//routes
app.use('/user', userRouter)




app.use((err, req, res, next) => {
  console.log('errorrrrrrrrrrr: ', err)
  res.status(500).send(err)
})

app.listen(String(process.env.PORT), () => {
  console.log(`started on port ${String(process.env.PORT)}`)
})
