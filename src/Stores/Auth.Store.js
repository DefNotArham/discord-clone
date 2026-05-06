import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: "",
  errorType: "",

  register: async (email, username, password, DOB, displayName) => {
    set({ loading: true });
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/register",
        {
          email: email.trim(),
          username: username.trim(),
          password,
          DOB,
          displayName: displayName.trim() || username.trim(),
        },
        { withCredentials: true },
      );

      if (response.data.success) {
        set({
          user: response?.data?.user,
          loading: false,
        });

        return { success: true };
      }
    } catch (error) {
      console.log(error);

      set({
        user: null,
        loading: false,

        error: error.response?.data?.message || "Something went wrong",
        errorType: error.response?.data?.typeError || "general",
      });

      setTimeout(() => {
        set({ error: "", errorType: "" });
      }, 3000);

      return { success: false };
    }
  },

  verifyAccount: async (code) => {
    set({ loading: true });

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/verifyEmail",
        { code: code.trim() },
        { withCredentials: true },
      );

      if (response.data.success) {
        set({ loading: false });
        return { success: true };
      }
    } catch (error) {
      console.log(error);
      set({
        loading: false,
        error: error.response?.data?.message || "Something went wrong",
        errorType: error.response?.data?.typeError || "general",
      });

      setTimeout(() => {
        set({ error: "", errorType: "" });
      }, 3000);

      return { success: false };
    }
  },

  login: async (email, password) => {
    set({ loading: true });

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        {
          email: email.trim(),
          password,
        },
        { withCredentials: true },
      );

      if (response.data.success) {
        set({
          user: response?.data?.user,
          isAuthenticated: true,
          loading: false,
        });

        return { success: true };
      }
    } catch (error) {
      console.log(error);
      set({
        loading: false,
        user: null,
        isAuthenticated: false,
        error: error.response?.data?.message || "Something went wrong",
        errorType: error.response?.data?.typeError || "general",
      });

      setTimeout(() => {
        set({ error: "", errorType: "" });
      }, 3000);

      return { success: false };
    }
  },

  forgotPassword: async (email) => {
    set({ loading: true });

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/forgot-password",
        { email: email.trim() },
        { withCredentials: true },
      );

      if (response?.data?.success) {
        set({ loading: false });
      }
      return { success: true };
    } catch (error) {
      console.log(error);
      set({
        loading: false,
        error: error.response?.data?.message || "Something went wrong",
        errorType: error.response?.data?.typeError || "email",
      });

      setTimeout(() => {
        set({ error: "", errorType: "" });
      }, 3000);

      return { success: false };
    }
  },

  loadServer: async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/checkAuth",
        {},
        { withCredentials: true },
      );

      if (response.data.success) {
        set({ user: response.data.user });
      }
    } catch (error) {
      console.log(error);

      set({
        user: null,
        error: error.response?.data?.message || "Something went wrong",
      });

      setTimeout(() => {
        set({ error: "", errorType: "" });
      }, 3000);
    }
  },

  resetPassword: async (token, password, confirmPassword) => {
    set({ loading: true });

    try {
      const response = await axios.post(
        `http://localhost:8000/auth/reset-password/${token}`,
        {
          password: password.trim(),
          confirmPassword: confirmPassword.trim(),
        },
        { withCredentials: true },
      );

      if (response?.data?.success) {
        set({ loading: false });

        return { success: true };
      }
    } catch (error) {
      console.log(error);
      set({
        error: error.response?.data?.message || "Something went wrong",
        errorType: error.response?.data?.typeError || "password",
        loading: false,
      });

      setTimeout(() => {
        set({ error: "", errorType: "" });
      }, 3000);

      return { success: false };
    }
  },

  checkAuth: async () => {
    set({ loading: true });
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/checkAuth",
        {},
        { withCredentials: true },
      );

      if (response.data.success) {
        set({
          user: response.data.user,
          isAuthenticated: true,
          loading: false,
        });
      }
    } catch (error) {
      console.log(error);

      set({
        user: null,
        isAuthenticated: false,
        error: error.response?.data?.message || "Something went wrong",
        loading: false,
      });

      setTimeout(() => {
        set({ error: "", errorType: "" });
      }, 3000);
    }
  },

  logoutUser: async () => {
    set({ loading: true });
    try {
      await axios.post(
        "http://localhost:8000/auth/logout",
        {},
        { withCredentials: true },
      );

      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    } catch (error) {
      console.log(error);
      set({
        loading: false,
        error: error.response?.data?.message || "Something went wrong",
        errorType: "logout",
      });

      setTimeout(() => {
        set({ error: "", errorType: "" });
      }, 3000);
    }
  },

  deleteAccount: async (deleteAccPassword) => {
    set({ loading: true });
    try {
      const response = await axios.delete(
        "http://localhost:8000/user/delete-account",
        {
          data: { password: deleteAccPassword },
          withCredentials: true,
        },
      );
      if (response?.data?.success) {
        set({ loading: false, isAuthenticated: false });
        return { success: true };
      }
    } catch (error) {
      console.log(error);
      set({
        error: error?.response?.data?.message || "Something went wrong",
        errorType: "deleteaccount",
      });

      setInterval(() => {
        set({ error: "", errorType: "" });
      }, 3000);
    }
  },
}));

export default useAuthStore;
