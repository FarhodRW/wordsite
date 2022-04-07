import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import 'dotenv/config'
import cors from 'cors'
import cron from 'node-cron'

import userRouter from './src/router/user.router'
import tagRouter from './src/router/tag.router'
import wordRouter from './src/router/word.router'
import quizRouter from './src/router/quiz/quiz.router'
import quizItemRouter from './src/router/quiz/quiz-item.route'
import { quizHistoryService } from './src/service/quiz/quiz-history.service'


const app = express();

app.use(cors({
  origin: true
}))

//db connection
mongoose.connect(String(process.env.DBURL))
  .then(() => console.log('Connected to database'))
  .catch(() => console.log("Can't connect to the database"))

mongoose.set('debug', true)

cron.schedule('*/2 * * * * *', () => {
  quizHistoryService.checkTimeLimit();
});

//middleware
app.use(express.json())
app.use(morgan('tiny'))



//routes
app.use('/user', userRouter)
app.use('/tag', tagRouter)
app.use('/word', wordRouter)
app.use('/quiz', quizRouter)
app.use('/quiz-item', quizItemRouter)



//error handler
app.use((err, req, res, next) => {
  res.status(400).send(err)
})


//port listener
app.listen(String(process.env.PORT), () => {
  console.log(`started on port ${String(process.env.PORT)}`)
})
