import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ReadMessagesStore {
  readThreadIds: Record<string, true>;
  markThreadRead: (userId: string) => void;
  clearReadThread: (userId: string) => void;
}

const useReadMessages = create<ReadMessagesStore>()(
  persist(
    (set) => ({
      readThreadIds: {},
      markThreadRead: (userId: string) =>
        set((state) => ({
          readThreadIds: {
            ...state.readThreadIds,
            [userId]: true,
          },
        })),
      clearReadThread: (userId: string) =>
        set((state) => {
          const nextReadThreadIds = { ...state.readThreadIds };
          delete nextReadThreadIds[userId];

          return {
            readThreadIds: nextReadThreadIds,
          };
        }),
    }),
    {
      name: "read-messages",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useReadMessages;
