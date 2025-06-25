import { useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import auth from "../firebase/firebase.init";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setAuthLoading(false);
      } else {
        setUser(null);
        setAuthLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const registerWithEmail = ({ email, password }) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const registerWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  const loginWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  const updateUserWithNameAndPhoto = ({ name, photoURL }) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  const loginWithEmail = ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logoutUser = () => {
    return signOut(auth);
  };

  const userInfo = {
    authLoading,
    user,
    setUser,
    registerWithEmail,
    updateUserWithNameAndPhoto,
    loginWithEmail,
    logoutUser,
    registerWithGoogle,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
