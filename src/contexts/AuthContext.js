import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { signInWithGoogle, signOutUser } from "../services/firebase"; // Add this import

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // Cleanup subscription
  }, []);

  // Add the auth methods to the value object
  const value = {
    currentUser,
    signInWithGoogle,
    signOut: signOutUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
