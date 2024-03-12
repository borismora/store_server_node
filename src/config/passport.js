import passport from 'passport';
import LocalStrategy from 'passport-local';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import User from '../models/User';
import dotenv from 'dotenv';
import { UnauthorizedError } from "../utils/ApiError";

dotenv.config();

// Configuración de Passport Local
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email: email } })

      if (!user || !user.checkPassword(password)) {
        throw new UnauthorizedError();
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Configuración de Passport Google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({ where: { googleId: profile.id } });

      if (user) {
        return done(null, user);
      }

      const newUser = await User.create({
        username: profile.displayName,
        googleId: profile.id,
      });

      return done(null, newUser);
    } catch (error) {
      return done(error);
    }
  }
));

// Configuración de Passport Facebook
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({ where: { facebookId: profile.id } });

      if (user) {
        return done(null, user);
      }

      const newUser = await User.create({
        username: profile.displayName,
        facebookId: profile.id,
      });

      return done(null, newUser);
    } catch (error) {
      return done(error);
    }
  }
));

// Serialización del usuario para la sesión
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
