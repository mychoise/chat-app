import { create } from "zustand";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";


export const useChatStore = create((set , get) => ({
  messages:[],
  users:[],
  selectedUser:null,
  isUsersLoading:false,
  isMessagesLoading:false,

  getUsers:async ()=>{
    set({isUsersLoading:true});
    try{
        const res=await axiosInstance.get("/message/users");
        set({users:res.data});

    }
    catch(error){
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    }
    finally{
      set({isUsersLoading:false});
    }
  },
  getMessages:async(userId)=>{
    set({isMessagesLoading:true});
    try{
        const res=await axiosInstance.get(`/message/${userId}`);
        set({messages:res.data});
    }
    catch(error){
        console.error("Error fetching messages:", error);
        toast.error("Error fetching messages");
    }
    finally{
        set({isMessagesLoading:false});
    }
  },
  
  setSelectedUser:(id)=>set({selectedUser:id}),

  sendMessage: async (messageData) => {
  const { selectedUser, messages } = get();

  if (!selectedUser || !selectedUser._id) {
    toast.error("No user selected. Please select a user before sending a message.");
    return;
  }

  try {
    const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
    set({ messages: [...messages, res.data] });
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to send message.");
  }
},
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    console.log(socket)

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}))