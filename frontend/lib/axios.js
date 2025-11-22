import axios from "axios"

export const axiosInstance  = axios.create({
    baseURL:"https://chat-app-three-murex.vercel.app/api",
    withCredentials:true
})