import { create } from "zustand";
import axios from "axios";

const useServerStore = create((set) => ({
  // Server
  servers: [],
  members: [],
  currentServer: null,

  // Loading
  loadingServers: false,
  loadingCreate: false,
  loadingJoin: false,
  loadingServer: false,
  loadingMembers: false,
  loadingEditServerName: false,
  loadingDeleteServer: false,

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

  loadMembers: async (serverId) => {
    set({ loadingMembers: true });
    try {
      const response = await axios.get(
        `http://localhost:8000/server/get-members/${serverId}`,
        { withCredentials: true },
      );
      console.log(response.data);

      if (response?.data?.success) {
        set({
          members: response?.data?.members,
          loadingMembers: false,
        });
      }
    } catch (error) {
      console.log(error);
      set({ loadingMembers: false });
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

  editServername: async (serverId, newServerName) => {
    set({ loadingEditServerName: true });
    try {
      const response = await axios.patch(
        `http://localhost:8000/server/editServername/${serverId}`,
        { newServerName },
        { withCredentials: true },
      );

      if (response?.data?.success) {
        set((state) => ({
          currentServer: { ...state.currentServer, name: newServerName },
          servers: state.servers.map((s) =>
            s._id === serverId ? { ...s, name: newServerName } : s,
          ),
          loadingEditServerName: false,
        }));

        return { success: true };
      }
    } catch (error) {
      set({
        loadingEditServerName: false,
        serverError: error?.response?.data?.message || "Something went wrong",
        errorType: error?.response?.data?.typeError || "leaveServer",
      });

      setTimeout(() => {
        set({ loadingEditServerName: false, serverError: "", errorType: "" });
      }, 3000);
      return { success: false };
    }
  },

  deleteServer: async (serverId, serverName) => {
    set({ loadingDeleteServer: true });
    try {
      const response = await axios.delete(
        `http://localhost:8000/server/delete-server/${serverId}`,
        {
          data: { serverName: serverName },
          withCredentials: true,
        },
      );

      if (response?.data?.success) {
        set((state) => ({
          servers: state.servers.filter((s) => s._id !== serverId),
          loadingDeleteServer: false,
        }));

        return { success: true };
      }
    } catch (error) {
      console.log(error);

      set({
        loadingDeleteServer: false,
        serverError: error?.response?.data?.message || "Something went wrong",
        errorType: error?.response?.data?.typeError || "leaveServer",
      });

      setTimeout(() => {
        set({ loadingDeleteServer: false, serverError: "", errorType: "" });
      }, 3000);

      return { success: false };
    }
  },
}));

export default useServerStore;
