import { create } from "zustand";

export interface ConversationStore {
  mobileConversationBoxOpen: boolean;
  setMobileConversationBoxOpen: (open: boolean) => void;
  image: File | null;
  setImage: (image: File | null) => void;
}

const useConversationStore = create<ConversationStore>((set) => ({
  mobileConversationBoxOpen: false,
  setMobileConversationBoxOpen: (open) =>
    set({ mobileConversationBoxOpen: open }),
  image: null,
  setImage: (image) => set({ image }),
}));

export default useConversationStore;
