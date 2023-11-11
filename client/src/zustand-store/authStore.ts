import { T_UserCredential } from "../hooks/useGoogleSignIn";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

type AuthState = {
   user: T_UserCredential | null;
   setCredential: (userCredential: T_UserCredential) => void;
   clearCredential: () => void;
};

export const useAuthStore = create<AuthState>()(
   devtools(
      persist(
         (set) => ({
            user: null,
            setCredential: (credential) => set({ user: credential }),
            clearCredential: () => set({ user: null }),
         }),
         { name: "auth" }
      )
   )
);
