import JwtService from "../services/jwt.service";
import User from "../models/User";

const requireAuth = async (req, res, next) => {
  try {
    if (process.env.SERVER_JWT === "false") return next();

    const token = JwtService.jwtGetToken(req);

    const decoded = JwtService.jwtVerify(token);

    req.userId = decoded;

    return next();
  } catch {
    res.redirect('/login');
  }
};

// check current user
const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    const decoded = JwtService.jwtVerify(token);
    let user = await User.findById(decoded.id);

    res.locals.user = user;
    next();
  } else {
    res.locals.user = null;
    next();
  }
};

export { requireAuth, checkUser };
