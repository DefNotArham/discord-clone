import { create } from "zustand";
import axios from "axios";

const useChannelStore = create((set) => ({
  channels: [],
  currentChannel: null,

  channelError: null,
  errorType: null,

  loadingCreate: false,
  loadingChannel: false,
  loadingEditChannelName: false,

  loadChannels: async (serverId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/server/channel/get-channels/${serverId}`,
        { withCredentials: true },
      );

      if (response?.data?.success) {
        set({ channels: response.data.channels });

        return { success: true };
      }
    } catch (error) {
      console.log(error);
    }
  },
  loadChannel: async (serverId, channelId) => {
    set({ loadingChannel: true, currentChannel: null });
    try {
      const response = await axios.get(
        `http://localhost:8000/server/channel/load-channel/${serverId}/channel/${channelId}`,
        { withCredentials: true },
      );
      if (response?.data?.success) {
        set({ currentChannel: response.data.channel, loadingChannel: false });
        return { success: true };
      } else {
        set({ loadingChannel: false });
      }
    } catch (error) {
      console.log(error);
      set({ loadingChannel: false });
      return { success: false };
    }
  },
  createChannel: async (serverId, newChannel) => {
    set({ loadingCreate: true, channelError: "", errorType: "" });
    try {
      const response = await axios.post(
        `http://localhost:8000/server/channel/create-channel/${serverId}`,
        { channelName: newChannel.trim() },
        { withCredentials: true },
      );

      if (response?.data?.success) {
        set((state) => ({
          channels: [...state.channels, response?.data?.channel],
          loadingCreate: false,
        }));

        return { success: true };
      }
    } catch (error) {
      console.log(error);

      set({
        loadingCreate: false,
        channelError: error?.response?.data?.message || "Something went wrong",
        errorType: error?.response?.data?.typeError || "createChannel",
      });

      setTimeout(() => {
        set({ channelError: "", errorType: "" });
      }, 3000);
      return { success: false };
    }
  },

  editChannelName: async (serverId, channelId, channelName) => {
    set({ loadingEditChannelName: true, channelError: "", errorType: "" });
    try {
      const response = await axios.patch(
        `http://localhost:8000/server/channel/edit-channelName/${serverId}/channel/${channelId}`,
        { newChannelName: channelName },
        { withCredentials: true },
      );
      if (response?.data?.success) {
        set((state) => ({
          currentChannel: { ...state.currentChannel, name: channelName },
          channels: state.channels.map((c) =>
            c._id === channelId ? { ...c, name: channelName } : c,
          ),
          loadingEditChannelName: false,
        }));
        return { success: true };
      }
    } catch (error) {
      set({
        loadingEditChannelName: false,
        channelError: error?.response?.data?.message || "Something went wrong",
        errorType: "editChannel",
      });
      setTimeout(() => set({ channelError: "", errorType: "" }), 3000);
      return { success: false };
    }
  },
  deleteChannel: async (serverId, channelId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/server/channel/delete-channel/${serverId}/channel/${channelId}`,
        { withCredentials: true },
      );

      if (response?.data?.success) {
        set((state) => ({
          channels: state.channels.filter((c) => c._id !== channelId),
          currentChannel:
            state.currentChannel?._id === channelId
              ? null
              : state.currentChannel,
        }));

        return { success: true };
      }
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  },
}));

export default useChannelStore;
