"use client";

import type { ReactNode, FC } from "react";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { auth, firebaseConfig } from "@/lib/firebase";
import { toast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Start with loading true
  const previousUserRef = useRef<User | null>(null);

  useEffect(() => {
    previousUserRef.current = user;
  }, [user]);

  const isFirebaseConfigValid = useCallback(() => {
    return (
      firebaseConfig.apiKey &&
      firebaseConfig.apiKey !== "YOUR_API_KEY" &&
      firebaseConfig.apiKey !==
        "AIzaSyBjWZ0tQUfWDmoL4xDOrhTAXJN1HbOUSOs_PLACEHOLDER"
    );
  }, []);

  useEffect(() => {
    if (!isFirebaseConfigValid()) {
      console.warn(
        "Firebase configuration is missing or invalid. Please update src/lib/firebase.ts or ensure environment variables are set. Using placeholder or default invalid API key.",
      );
      setLoading(false);
      return;
    }

    const unsubAuthState = onAuthStateChanged(auth, (currentUser) => {
      if (previousUserRef.current && !currentUser) {
        console.warn(
          "[AuthContext] Auth state changed: User transitioned from LOGGED-IN (UID:",
          previousUserRef.current.uid,
          ") to LOGGED-OUT.",
        );
      } else if (!previousUserRef.current && currentUser) {
        console.log(
          "[AuthContext] Auth state changed: User transitioned from LOGGED-OUT to LOGGED-IN (UID:",
          currentUser.uid,
          ").",
        );
      } else if (
        previousUserRef.current &&
        currentUser &&
        previousUserRef.current.uid !== currentUser.uid
      ) {
        console.warn(
          "[AuthContext] Auth state changed: User UID changed from",
          previousUserRef.current.uid,
          "to",
          currentUser.uid,
          ". This usually means a different user signed in.",
        );
      }

      setUser(currentUser);
      setLoading(false); // Auth state determined, set loading to false.
    });

    return () => {
      if (unsubAuthState) {
        unsubAuthState();
      }
    };
  }, [isFirebaseConfigValid]);

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigValid()) {
      toast({
        title: "Configuration Error",
        description:
          "Firebase is not configured correctly. Please check your Firebase project settings and src/lib/firebase.ts.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      console.log(
        "[AuthContext] Attempting sign-in with popup using Firebase config:",
        {
          authDomain: auth.app.options.authDomain,
          projectId: auth.app.options.projectId,
          apiKey: auth.app.options.apiKey?.substring(0, 10) + "...",
        },
      );
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // onAuthStateChanged will handle setting the user and setLoading(false)
      toast({
        title: "Signed In",
        description: `Welcome, ${result.user.displayName || "User"}!`,
        variant: "default",
      });
    } catch (error: any) {
      console.error(
        "Error during sign in with Google popup (AuthContext):",
        error,
      );
      setLoading(false); // Reset loading if popup attempt itself fails

      let errorMessage = "Sign-in failed. Please try again.";
      if (error.code === "auth/popup-blocked-by-browser") {
        errorMessage =
          "Popup blocked by browser. Please allow popups for this site and try again.";
      } else if (
        error.code === "auth/popup-closed-by-user" ||
        error.code === "auth/cancelled-popup-request"
      ) {
        errorMessage =
          "Sign-in popup was closed before completion. Please try again. This can sometimes happen due to browser settings or if the page reloaded unexpectedly.";
      } else if (
        error.code === "auth/account-exists-with-different-credential"
      ) {
        errorMessage =
          "An account already exists with this email using a different sign-in method. Try that method or use a different Google account.";
      } else if (error.code === "auth/unauthorized-domain") {
        const currentHostname =
          typeof window !== "undefined"
            ? window.location.hostname
            : "your app's host (unable to determine)";
        errorMessage = `This app's domain ('${currentHostname}') is not authorized for Firebase sign-in. Please go to your Firebase project > Authentication > Settings > Authorized Domains, and ensure that the EXACT hostname '${currentHostname}' is listed. Also verify your Firebase Hosting setup if applicable.`;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Sign-In Error",
        description: errorMessage,
        variant: "destructive",
        duration: 9000,
      });
    }
  };

  const signOutUser = async () => {
    if (!isFirebaseConfigValid()) {
      return;
    }
    setLoading(true);
    try {
      await signOut(auth);
      // onAuthStateChanged will handle setting user to null and setLoading to false
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign-Out Failed",
        description: error.message || "Could not sign out. Please try again.",
        variant: "destructive",
      });
      setLoading(false); // Ensure loading is reset on error
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signInWithGoogle, signOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
