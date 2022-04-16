import passport from 'passport'
import passportFacebook from 'passport-facebook'
import passportGoogle from 'passport-google-oauth20'
import { UserModel } from '../db/model/user/user.model'
const GoogleStrategy = passportGoogle.Strategy
const FacebookStrategy = passportFacebook.Strategy

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id);
  done(null, user);
});


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        googleId: profile.id,
        email: String(profile._json.email),
        name: profile._json.name,
        image: profile.photos[0].value,
      }
      console.log('profileeeeeee', profile)
      console.log('userrrrrr', newUser)
      try {
        let user = await UserModel.findOne({ email: newUser.email })

        if (user) {
          done(null, user)
        } else {
          user = await UserModel.create(newUser)
          done(null, user)
        }
      } catch (err) {
        console.error(err)
      }
    }
  )
)


passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:3003/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile)
      const newUser = {
        facebookId: profile.id,
        email: String(profile._json.email),
        name: profile._json.name,
        image: profile.photos[0].value,
      }
      console.log('profileeeeeee', profile)
      console.log('userrrrrr', newUser)
      try {
        let user = await UserModel.findOne({ email: newUser.email })

        if (user) {
          done(null, user)
        } else {
          user = await UserModel.create(newUser)
          done(null, user)
        }
      } catch (err) {
        console.error(err)
      }
    }
  )
)


