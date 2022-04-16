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
import categoryRouter from './src/router/category.router'
import { quizHistoryService } from './src/service/quiz/quiz-history.service'
import { ErrorCodes, UserDefinedError } from './src/db/common/common.error'
import passport from 'passport'
import session from 'express-session'
import "./src/common/passport-setup"
import authRoutes from './src/router/authRoutes'

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

//session
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

//passort middleware
app.use(passport.initialize())
app.use(passport.session())


//routes
app.use('/user', userRouter)
app.use('/tag', tagRouter)
app.use('/word', wordRouter)
app.use('/quiz', quizRouter)
app.use('/category', categoryRouter)
app.use("/auth", authRoutes);

//error handler
app.use((err, req, res, next) => {
  if (err instanceof UserDefinedError) {
    if (err.code == ErrorCodes.DEFAULT + 3)
      res.status(401).send(err)
    else res.status(400).send(err)
  }
})


//port listener
app.listen(String(process.env.PORT), () => {
  console.log(`started on port ${String(process.env.PORT)}`)
})
