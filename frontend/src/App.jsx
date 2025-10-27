import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../src/pages/HomePage"
import SignUpPage from "../src/pages/SignUpPage"
import LoginPage from "../src/pages/LoginPage"
import SettingPage from "../src/pages/SettingPage"
import ProfilePage from "../src/pages/ProfilePage"
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import {useThemeStore} from "./store/useThemeStore"
import { Loader } from 'lucide-react';
const App = () => {
  const {authUser , checkAuth,isCheckingAuth,onlineUsers} = useAuthStore();
  const{theme} = useThemeStore()
  console.log("online users",onlineUsers)
useEffect(()=>{
  console.log("Auth check initiated");
checkAuth();
},[checkAuth])

console.log("Authenticated User:",authUser);
if(isCheckingAuth && !authUser){
  return <div className="h-screen w-screen flex justify-center items-center">
    <Loader className=" size-10 animate-spin"/>
  </div>
}
  return (
    <div data-theme={theme}>
      <Navbar />
         <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={authUser?<HomePage />:<Navigate to={"/login"}/>} />
        <Route path="/signup" element={!authUser?<SignUpPage />:<Navigate to={"/"}/>} />
        <Route path="/login" element={!authUser?<LoginPage />:<Navigate to={"/"}/>} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/profile" element={authUser?<ProfilePage />:<Navigate to={"/login"}/>} />
      </Routes>
    </div>
  );
};

export default App;
