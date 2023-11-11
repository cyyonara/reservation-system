import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import { T_Request } from "../types/T_Request";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user";
import { v4 as uuid } from "uuid";

/* --------user-------- */

interface IUser {
  _id: string;
  name: string;
  username: string;
  isAdmin: boolean;
  email: string;
  avatar: string;
  password: string;
}

// @POST - public - /api/auth/sign-up
export const signUp = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password, ...rest }: Omit<IUser, "_id" | "avatar"> = req.body;

  const user: HydratedDocument<Omit<IUser, "password">> | null = (await User.findOne({
    email,
    isAdmin: false,
  }).select("-__v -createdAt -updatedAt")) as HydratedDocument<Omit<IUser, "password">> | null;

  if (user) {
    res.status(401);
    throw new Error("This email is already connected to an account");
  }

  const hashedPassword: string = bcrypt.hashSync(password, 10);
  const newUser: HydratedDocument<IUser> = await User.create({
    ...rest,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET as string, {
    expiresIn: "60d",
  });

  res
    .cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 60 })
    .status(200)
    .json({
      username: newUser.username,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      avatar: newUser.avatar,
    });
});

// @POST - public - /api/auth/sign-in
interface DirectSignInData {
  email: string;
  password: string;
}

export const signIn = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password }: DirectSignInData = req.body;
  const user: HydratedDocument<IUser> | null = (await User.findOne({
    email,
    isAdmin: false,
  }).select("-__v -createdAt -updatedAt")) as HydratedDocument<IUser> | null;

  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isValidPassword: boolean = bcrypt.compareSync(password, user.password);

  if (!isValidPassword) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "60d",
  });

  res
    .cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 60 })
    .status(200)
    .json({
      username: user.username,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
    });
});

// @POST - public - /api/auth/google/sign-in
interface GoogleSignInData {
  email: string;
}

type GoogleSignInResponse = { hasExistingAccount: boolean } | Omit<IUser, "password" | "_id">;

export const googleSignIn = asyncHandler(
  async (req: Request, res: Response<GoogleSignInResponse>): Promise<void> => {
    const { email }: GoogleSignInData = req.body;
    const user: HydratedDocument<Omit<IUser, "password">> | null = (await User.findOne({
      email,
      isAdmin: false,
    }).select("-password -__v -createdAt -updatedAt")) as HydratedDocument<
      Omit<IUser, "password">
    > | null;

    if (!user) {
      res.status(200).json({ hasExistingAccount: false });
      return;
    }

    const token: string = jwt.sign({ _id: user!._id }, process.env.JWT_SECRET as string, {
      expiresIn: "60d",
    });

    res
      .cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 60 })
      .status(200)
      .json({
        username: user.username,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
      });
  }
);

// @POST - public - /api/auth/account/setup/sign-up
export const accountSetupSignUp = asyncHandler(async (req: Request, res: Response) => {
  const { password, username, ...rest }: Omit<IUser, "_id"> = req.body;
  const hashedPassword: string = bcrypt.hashSync(password, 10);

  const isUsernameExist: HydratedDocument<IUser> | null = (await User.findOne({
    username,
  }).select("-__v -createdAt -updatedAt")) as HydratedDocument<IUser> | null;

  if (isUsernameExist) {
    res.status(400);
    throw new Error("Username already in use");
  }

  const newUser: HydratedDocument<IUser> = await User.create({
    ...rest,
    username,
    password: hashedPassword,
  });

  const token: string = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET as string, {
    expiresIn: "60d",
  });

  res
    .cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 60 })
    .status(200)
    .json({
      username: newUser.username,
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
    });
});

// @POST - public - /api/auth/sign-out
export const signOut = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("jwt").status(200).json({ success: true });
});

/* --------admin-------- */

// @POST - public - /api/auth/admin/sign-in
type AdminSigninData = { username: string; password: string };

export const adminSignin = asyncHandler(async (req: Request, res: Response) => {
  const { username, password }: AdminSigninData = req.body;

  const admin: HydratedDocument<IUser> | null = (await User.findOne({
    username,
    isAdmin: true,
  })) as HydratedDocument<IUser> | null;

  if (!admin) {
    res.status(401);
    throw new Error("Invalid username or password");
  }

  const isValidPassword: boolean = bcrypt.compareSync(password, admin.password);

  if (!isValidPassword) {
    res.status(401);
    throw new Error("Invalid username or password");
  }

  const token: string = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET as string, {
    expiresIn: "100d",
  });

  res
    .cookie("a_jwt", token, { maxAge: 1000 * 60 * 60 * 24 * 100, httpOnly: true })
    .status(200)
    .json({
      _id: admin._id,
      username: admin.username,
      avatar: admin.avatar,
      isAdmin: admin.isAdmin,
    });
});

// @POST - private - /api/auth/admin/sign-up
export const adminSignUp = asyncHandler(async (req: T_Request, res: Response) => {
  const { username, password, email }: Omit<IUser, "_id"> = req.body;

  const admin: HydratedDocument<IUser> | null = (await User.findOne({
    username,
    isAdmin: true,
  }).select("-createdAt -updatedAt")) as HydratedDocument<IUser> | null;

  if (admin) {
    res.status(400);
    throw new Error("Username alreay in use");
  }

  const hashedPassword: string = bcrypt.hashSync(password, 10);

  await User.create({
    username,
    password: hashedPassword,
    isAdmin: true,
    email: uuid() + email,
    name: "Admin",
  });

  res.status(201).json({ success: true });
});
