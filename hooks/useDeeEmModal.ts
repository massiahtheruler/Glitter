import { create } from "zustand";

interface DeeEmModalStore {
  isOpen: boolean;
  userId?: string;
  onOpen: (userId: string) => void;
  onClose: () => void;
}

const useDeeEmModal = create<DeeEmModalStore>((set) => ({
  isOpen: false,
  userId: undefined,
  onOpen: (userId: string) => set({ isOpen: true, userId }),
  onClose: () => set({ isOpen: false, userId: undefined }),
}));

export default useDeeEmModal;
