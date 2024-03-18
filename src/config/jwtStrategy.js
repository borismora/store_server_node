import { Strategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();
console.log(process.env.SERVER_JWT_SECRET)

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SERVER_JWT_SECRET || 'tu_secreto_jwt',
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await User.findByPk(payload.id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

export default jwtStrategy;