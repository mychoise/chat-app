import { create } from "zustand";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client"

export const useAuthStore = create((set,get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  socket:null,
  onlineUsers:[],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data}); 
      get().connectSocket()
    } catch (error) {
      set({ authUser: null });
      console.error("Error checking auth:", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (formData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      set({ authUser: res.data });
      get().connectSocket()
      toast.success("Signed up successfully");
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(error.response.data.message)
      throw error;
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (formData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      set({ authUser: res.data });
            get().connectSocket()
toast.success("Logged in successfully");
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket()
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Error during logout");
    
    }},
    updateProfile:async (formData) => {
      set({ isUpdatingProfile: true });
      try {
        const res = await axiosInstance.post("/auth/update-profile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        set({ authUser: res.data });
        toast.success("Profile updated successfully");
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error(error.response?.data?.message || "Errokkkr updating profile");
        throw error;
      } finally {
        set({ isUpdatingProfile: false });
      }
      
    },
   connectSocket: () => {
    const { authUser } = get();
    // console.log("Tero bau socket hheer", socket)
    if (!authUser || get().socket?.connected) return;

    const socket = io("https://chat-app-three-murex.vercel.app", {
      query: {
        userId: authUser._id,
      },
    });
    set({ socket: socket });
    socket.on("getOnlineUsers", (userIds) => {
                set({ onlineUsers: userIds });
    });
  },
disconnectSocket:()=>{
  const {socket}=get()
  if(socket){
    socket.disconnect()
    set({socket:null})
  }
}
}));
