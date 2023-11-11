import { create } from "zustand";
import { persist } from "zustand/middleware";

type AdminCredential = { _id: string; username: string; avatar: string } | null;

type AdminAuthState = {
   c_admin: AdminCredential;
   setAdminCredential: (adminCredential: NonNullable<AdminCredential>) => void;
   clearAdminCredential: () => void;
};

export const useAdminAuthStore = create<AdminAuthState>()(
   persist(
      (set) => ({
         c_admin: null,
         setAdminCredential: (adminCredential) => {
            set({ c_admin: adminCredential });
         },
         clearAdminCredential: () => {
            set({ c_admin: null });
         },
      }),
      { name: "admin-auth" }
   )
);
