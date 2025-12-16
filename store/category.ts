import {create} from "zustand";

interface State {
    activeId: number  // ← латинская "a"
    setActiveId: (activeId: number) => void  // ← латинская "a"
}

export const useCategoryStore = create<State>()((set) => ({
    activeId: 1,  // ← латинская "a"
    setActiveId: (activeId: number) => set({activeId}),  // ← латинская "a"
}))