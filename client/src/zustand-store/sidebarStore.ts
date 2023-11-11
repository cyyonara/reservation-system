import { create } from "zustand";

type SidebarState = { showSidebar: boolean; closeSidebar: () => void; openSidebar: () => void };

export const useSidebarStore = create<SidebarState>()((set) => ({
   showSidebar: true,
   closeSidebar: () => set({ showSidebar: false }),
   openSidebar: () => set({ showSidebar: true }),
}));
