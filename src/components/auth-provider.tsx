"use client";

import * as React from "react";
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase/client";
import { Profile } from "@/lib/types/database";

export interface AuthContextType {
  user: FirebaseUser | null;
  profile: Profile | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    username: string,
    displayName?: string
  ) => Promise<FirebaseUser>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<FirebaseUser | null>(null);
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [loading, setLoading] = React.useState(true);

  // Sync profile from Firestore
  const fetchProfile = React.useCallback(async (firebaseUser: FirebaseUser) => {
    // Generate immediate fallback profile state so UI is never left in unauthenticated state
    const fallbackUsername =
      firebaseUser.displayName?.toLowerCase().replace(/[^a-z0-9]/g, "") ||
      firebaseUser.email?.split("@")[0] ||
      "creator";

    const defaultProfile: Profile = {
      id: firebaseUser.uid,
      username: fallbackUsername,
      email: firebaseUser.email || null,
      display_name: firebaseUser.displayName || fallbackUsername,
      avatar_url: firebaseUser.photoURL || null,
      bio: "Digital creator and media distributor on Playxim.",
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setProfile((prev) => prev || defaultProfile);

    try {
      const userRef = doc(db, "users", firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setProfile({
          id: firebaseUser.uid,
          username: data.username || fallbackUsername,
          email: firebaseUser.email || null,
          display_name: data.display_name || firebaseUser.displayName || null,
          avatar_url: data.avatar_url || firebaseUser.photoURL || null,
          bio: data.bio || null,
          status: data.status || "active",
          created_at: data.created_at || new Date().toISOString(),
          updated_at: data.updated_at || new Date().toISOString(),
        });
      } else {
        // Create initial profile for user if missing (e.g. initial Google sign-in)
        await setDoc(userRef, defaultProfile, { merge: true });

        // Also reserve the username in usernames collection
        try {
          const usernameRef = doc(db, "usernames", fallbackUsername.toLowerCase());
          await setDoc(usernameRef, {
            uid: firebaseUser.uid,
            created_at: new Date().toISOString(),
          });
        } catch {
          // Ignore username reservation collision in fallback
        }

        setProfile(defaultProfile);
      }
    } catch (err) {
      console.warn("Notice: Firestore profile sync operated in offline/fallback mode:", err);
      setProfile(defaultProfile);
    }
  }, []);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await fetchProfile(firebaseUser);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [fetchProfile]);

  const signInWithEmail = async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    setUser(cred.user);
    await fetchProfile(cred.user);
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    username: string,
    displayName?: string
  ): Promise<FirebaseUser> => {
    // 1. Create user in Firebase Auth
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = cred.user;
    setUser(firebaseUser);

    // 2. Set Firebase Auth display name
    const finalDisplayName = displayName || username;
    await updateProfile(firebaseUser, {
      displayName: finalDisplayName,
    });

    // 3. Write Firestore Profile
    const userRef = doc(db, "users", firebaseUser.uid);
    const profilePayload: Profile = {
      id: firebaseUser.uid,
      username: username.toLowerCase().trim(),
      email: firebaseUser.email || null,
      display_name: finalDisplayName,
      avatar_url: null,
      bio: "Digital creator and media distributor on Playxim.",
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setProfile(profilePayload);

    setDoc(userRef, profilePayload).catch((err) => {
      console.warn("Could not save initial profile doc to Firestore:", err);
    });

    // 4. Reserve unique username in usernames collection
    const usernameRef = doc(db, "usernames", username.toLowerCase().trim());
    setDoc(usernameRef, {
      uid: firebaseUser.uid,
      created_at: new Date().toISOString(),
    }).catch((err) => {
      console.warn("Could not reserve username in Firestore:", err);
    });

    // 5. Send email verification
    try {
      await sendEmailVerification(firebaseUser);
    } catch (verifErr) {
      console.warn("Could not dispatch verification email immediately:", verifErr);
    }

    return firebaseUser;
  };

  const signInWithGoogle = async () => {
    const cred = await signInWithPopup(auth, googleProvider);
    setUser(cred.user);
    await fetchProfile(cred.user);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setProfile(null);
  };

  const sendPasswordReset = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const sendVerificationEmail = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  };

  const refreshProfile = async () => {
    if (auth.currentUser) {
      await fetchProfile(auth.currentUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
        sendPasswordReset,
        sendVerificationEmail,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
