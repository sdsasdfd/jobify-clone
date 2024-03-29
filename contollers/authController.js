import User from "../models/UserModule.js";
import { StatusCodes } from "http-status-codes";
import { hashPassword, comparePassword } from "../utiles/passwordUtiles.js";
import { UnauthorizedError } from "../errors/customErrors.js";
import { createJWT } from "../utiles/tokenUtiles.js";

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  req.body.role = isFirstAccount ? "admin" : "user";
  const user = await User.create(req.body);

  res.status(StatusCodes.CREATED).json({ msy: "user created" });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) {
    throw new UnauthorizedError("invalid credentials");
  }

  const token = createJWT({ userId: user._id, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secures: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msy: "user logged in" });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msy: "user logout" });
};
