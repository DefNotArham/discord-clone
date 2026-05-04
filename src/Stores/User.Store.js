import { create } from "zustand";
import axios from "axios";
import useAuthStore from "./Auth.Store";

const useUserStore = create((set) => ({
  status: "online",

  editDisplayError: null,
  editUsernameError: null,
  errorType: null,

  displayNameLoading: false,
  userNameLoading: false,

  changeStatus: async (newStatus) => {
    try {
      await axios.patch(
        "http://localhost:8000/user/change-status",
        { status: newStatus },
        { withCredentials: true },
      );

      set({
        status: newStatus,
      });

      const { user } = useAuthStore.getState();
      useAuthStore.setState({
        user: { ...user, status: newStatus },
      });
    } catch (error) {
      console.log(error);
    }
  },

  changeDisplayName: async (newDisplayName) => {
    set({ displayNameLoading: true });
    try {
      const response = await axios.patch(
        "http://localhost:8000/user/change-displayName",
        { newDisplayName },
        { withCredentials: true },
      );

      const { user } = useAuthStore.getState();

      if (response?.data?.success) {
        useAuthStore.setState({
          user: { ...user, displayName: newDisplayName },
        });
        set({ displayNameLoading: false });
        return { success: true };
      }
    } catch (error) {
      console.log(error);
      set({
        displayNameLoading: false,
        editDisplayError: error?.response?.data?.message,
        errorType: error?.response?.data?.typeError || "displayName",
      });

      setTimeout(() => {
        set({ editDisplayError: "", errorType: "" });
      }, 3000);

      return { success: false };
    }
  },
  changeUsername: async (newUsername) => {
    set({ userNameLoading: true, editUsernameError: "", errorType: "" });
    try {
      const response = await axios.patch(
        "http://localhost:8000/user/change-username",
        { newUsername },
        { withCredentials: true },
      );
      if (response?.data?.success) {
        const { user } = useAuthStore.getState();
        useAuthStore.setState({ user: { ...user, username: newUsername } });
        set({ userNameLoading: false });
        return { success: true };
      }
    } catch (error) {
      set({
        userNameLoading: false,
        editUsernameError:
          error?.response?.data?.message || "Something went wrong",
        errorType: "username",
      });
      setTimeout(() => set({ editUsernameError: "", errorType: "" }), 3000);
      return { success: false };
    }
  },
}));

export default useUserStore;
