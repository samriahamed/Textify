import { create } from "zustand";
import { axiosInstance } from "../lib/axios";


export const useAuthStore = create((set) => ({
  authUser: {name: "john", _id: 123, age: 25},
  isLoggedIn: false,
  
  login: () => {
    console.log("We just logged in");
    set({ isLoggedIn: true})
  },
}))
