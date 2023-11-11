import { create } from "zustand";
import { devtools } from "zustand/middleware";

type AccountSetup = {
   accountSetupForm: {
      avatar: string;
      email: string;
      name: string;
   } | null;
   setAccountSetupForm: ({
      email,
      name,
      avatar,
   }: {
      email: string;
      name: string;
      avatar: string;
   }) => void;
   clearAccountSetupForm: () => void;
};

export const useAccountSetupStore = create<AccountSetup>()(
   devtools((set) => ({
      accountSetupForm: null,
      setAccountSetupForm: ({ email, name, avatar }) =>
         set({ accountSetupForm: { email, name, avatar } }),
      clearAccountSetupForm: () => set({ accountSetupForm: null }),
   }))
);
