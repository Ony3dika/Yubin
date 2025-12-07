import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      userID: null,

      updateUserID: (userID) =>
        set(() => ({
          userID: userID,
        })),

      googleAccessToken: null,

      updateGoogleAccessToken: (googleAccessToken) =>
        set(() => ({
          googleAccessToken: googleAccessToken,
        })),
    }),
    { name: "yubinStore" }
  )
);
