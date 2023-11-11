import { create } from "zustand";

type AdminMainNavbarState = {
   showMainNavbar: boolean;
   closeMainNavbar: () => void;
   openMainNavBar: () => void;
};

export const useAdminMainNavbarStore = create<AdminMainNavbarState>()((set) => ({
   showMainNavbar: false,
   openMainNavBar: () => set({ showMainNavbar: true }),
   closeMainNavbar: () => set({ showMainNavbar: false }),
}));
