import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import 'dotenv/config'

import userRouter from './src/router/user.router'
import tagRouter from './src/router/tag.router'
import wordRouter from './src/router/word.router'


const app = express();

//db connection
mongoose.connect(String(process.env.DBURL))
  .then(() => console.log('Connected to database'))
  .catch(() => console.log("Can't connect to the database"))

mongoose.set('debug', true)

//middleware
app.use(express.json())
app.use(morgan('tiny'))



//routes
app.use('/user', userRouter)
app.use('/tag', tagRouter)
app.use('/word', wordRouter)



//error handler
app.use((err, req, res, next) => {
  console.log('errorrrrrrrrrrr: ', err)
  res.status(500).send(err)
})


//port listener
app.listen(String(process.env.PORT), () => {
  console.log(`started on port ${String(process.env.PORT)}`)
})
