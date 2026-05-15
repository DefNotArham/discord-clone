import { create } from "zustand";
import axios from "axios";

const useFriendStore = create((set) => ({
  friends: [],
  friendRequests: [],
  sentFriendRequests: [],

  friendError: null,
  errorType: "",

  addFriend: async (targetUsername) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/friend/add-friend`,
        {
          targetUsername: targetUsername,
        },
        { withCredentials: true },
      );

      if (response.data.success) {
        set((state) => ({
          sentFriendRequests: [
            ...state.sentFriendRequests,
            response.data.newFriendReq,
          ],
        }));

        return { success: true };
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      set({
        friendError: error?.response?.data?.message,
        errorType: "addFriend",
      });

      setTimeout(() => {
        set({ friendError: null, errorType: "" });
      }, 3000);

      return { success: false };
    }
  },

  loadFriendRequests: async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/friend/get-friendRequests",
        { withCredentials: true },
      );

      if (response?.data?.success) {
        set({ friendRequests: response.data.friendRequests });
      }
    } catch (error) {
      console.log(error);

      set({
        friendError: error?.response?.data?.message,
        errorType: "loadreq",
      });

      setTimeout(() => {
        set({ friendError: null, errorType: "" });
      }, 3000);
    }
  },
}));

export default useFriendStore;
