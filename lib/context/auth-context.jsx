"use client";
import React, { createContext } from "react";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const AuthContext = createContext({
  user: null,
  loading: false,
  googleLoginHandler: async () => {},
  logout: async () => {},
});
const AuthContextProvider = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  const googleProvider = new GoogleAuthProvider(auth);
  const googleLoginHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    signOut(auth);
  };
  return (
    <AuthContext.Provider value={{ user, loading, googleLoginHandler, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
