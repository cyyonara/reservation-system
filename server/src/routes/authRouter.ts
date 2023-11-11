import express, { IRouter } from "express";
import {
   googleSignIn,
   signUp,
   signIn,
   accountSetupSignUp,
   signOut,
   adminSignin,
   adminSignUp,
} from "../controllers/authController";
import { a_protect } from "../middlewares/a_protect";

const router: IRouter = express.Router();

// @POST - public - /api/auth/sign-up
router.post("/sign-up", signUp);

// @POST - public - /api/auth/sign-in
router.post("/sign-in", signIn);

// @POST - public - /api/auth/google/sign-in
router.post("/google/sign-in", googleSignIn);

// @POST - public - /api/auth/account/setup/sign-up
router.post("/account/setup/sign-up", accountSetupSignUp);

// @POST - public - /api/auth/sign-out
router.post("/sign-out", signOut);

router.post("/verify/google/account");

// @POST - public - /api/auth/admin/sign-in
router.post("/admin/sign-in", adminSignin);

// @POST - private - /api/auth/admin/sign-up
router.post("/admin/sign-up", a_protect, adminSignUp);

export default router;
