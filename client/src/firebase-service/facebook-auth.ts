import { FacebookAuthProvider, UserCredential, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase-config";

const facebookProvider = new FacebookAuthProvider();

export const facebook_auth = async (): Promise<UserCredential["user"] | Error> => {
   try {
      const userCredential: UserCredential = await signInWithPopup(auth, facebookProvider);
      return userCredential.user;
   } catch (err) {
      return new Error("Something went wrong");
   }
};
