import passport from 'passport';
import LocalStrategy from 'passport-local';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import 'dotenv/config';
import { User } from '../models/User';

// Configuración de Passport Local
passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username: username } });

      if (!user || !user.validPassword(password)) {
        return done(null, false, { message: 'Nombre de usuario o contraseña incorrectos' });
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