import { Router } from "express";

import loginController from "../controllers/login.controller";
import authMiddleware from "../middlewares/auth.middleware";

const loginRoutes = Router();

loginRoutes.post("/login", loginController.login);
loginRoutes.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
loginRoutes.get('/profile', (req, res) => {
  res.send('Bienvenido a tu perfil');
});

export { loginRoutes };
