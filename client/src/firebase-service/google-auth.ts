import { GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { auth } from "../firebase-config";

const googleProvider = new GoogleAuthProvider();

export const google_auth = async (): Promise<UserCredential["user"] | Error> => {
   try {
      const userCredential: UserCredential = await signInWithPopup(auth, googleProvider);
      return userCredential.user;
   } catch (err) {
      return new Error("Something went wrong");
   }
};
