import { Router } from "express";
import passport from "passport";

import loginController from "../controllers/login.controller";
//import authMiddleware from "../middlewares/auth.middleware";

const loginRoutes = Router();

loginRoutes.post('/signup', loginController.signUp);
loginRoutes.post("/login", loginController.login);
loginRoutes.get('/logout', loginController.logout);
loginRoutes.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('Bienvenido a tu perfil');
});
loginRoutes.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export { loginRoutes };
