import { create } from "zustand";
import axios from "axios";

const useServerStore = create((set) => ({
  // Server
  servers: [],
  currentServer: null,

  // Loading
  loadingServers: false,
  loadingCreate: false,
  loadingJoin: false,
  loadingServer: false,

  // Error
  serverError: "",
  errorType: "",

  loadServers: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(
        "http://localhost:8000/server/get-servers",
        { withCredentials: true },
      );
      set({ servers: response.data.servers, loading: false });
    } catch (error) {
      console.log(error);
      set({ loading: false });
    }
  },

  createServer: async (serverName) => {
    set({ loading: true });
    try {
      const response = await axios.post(
        "http://localhost:8000/server/create-server",
        { name: serverName.trim() },
        { withCredentials: true },
      );

      if (response?.data?.success) {
        set((state) => ({
          servers: [...state.servers, response.data.newServer],
          loading: false,
        }));
        return { success: true };
      }
    } catch (error) {
      console.log(error);
      set({
        loading: false,
        serverError: error?.response?.data?.message || "Something went wrong",
        errorType: error?.response?.data?.typeError || "general",
      });

      setTimeout(() => {
        set({ loading: false, serverError: "", errorType: "" });
      }, 3000);
      return { success: false };
    }
  },

  joinServer: async (inviteCode) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/server/join-server",
        { inviteCode: inviteCode.trim() },
        { withCredentials: true },
      );

      if (response?.data?.success) {
        set((state) => ({
          servers: [...state.servers, response?.data?.server],
        }));

        return { success: true };
      }
    } catch (error) {
      console.log(error);
      set({
        loading: false,
        serverError: error?.response?.data?.message || "Something went wrong",
        errorType: error?.response?.data?.typeError || "server",
      });

      setTimeout(() => {
        set({ loading: false, serverError: "", errorType: "" });
      }, 3000);
      return { success: false };
    }
  },

  loadCurrentServer: async (serverId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/server/load-server/${serverId}`,
        { withCredentials: true },
      );

      if (response?.data?.success) {
        set({ currentServer: response?.data?.server });
      }
    } catch (error) {
      console.log(error);
    }
  },

  leaveServer: async (serverId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/server/leave-server/${serverId}`,
        {},
        { withCredentials: true },
      );

      if (response?.data?.success) {
        set((state) => ({
          servers: state.servers.filter((s) => s._id !== serverId),
        }));

        return { success: true };
      }
    } catch (error) {
      console.log(error);
      set({
        loading: false,
        serverError: error?.response?.data?.message || "Something went wrong",
        errorType: error?.response?.data?.typeError || "leaveServer",
      });

      setTimeout(() => {
        set({ loading: false, serverError: "", errorType: "" });
      }, 3000);
      return { success: false };
    }
  },
}));

export default useServerStore;
