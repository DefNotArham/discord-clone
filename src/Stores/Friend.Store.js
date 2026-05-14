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

      return { success: false };
    }
  },
}));

export default useFriendStore;
