import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";

// 🔹 Context তৈরি
export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const provider = new GoogleAuthProvider();

  // 🔹 নতুন ইউজার তৈরি (Email + Password)
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 🔹 বিদ্যমান ইউজার লগইন
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 🔹 Google Sign-in
  const googleSignIn = () => {
    return signInWithPopup(auth, provider);
  };

  // 🔹 ইউজার প্রোফাইল আপডেট
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // 🔹 Logout
  const logOut = () => {
    return signOut(auth);
  };

  // 🔹 Auth State change handle করা
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Context value
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
