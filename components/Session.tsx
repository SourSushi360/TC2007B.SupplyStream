import { useContext, createContext, type PropsWithChildren, useState, useEffect } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth, db } from "@/constants/firebase";
import { doc, getDoc } from "firebase/firestore";

interface AppSession {
  isLoading: boolean;
  user: User | null;
  secrets?: {
    huggingfaceApiKey: string;
  }
}

const AuthContext = createContext<AppSession>({
    isLoading: true,
    user: null,
});

export function useSession() {
  const ctx = useContext(AuthContext);
  return ctx;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<AppSession>({
        isLoading: true,
        user: null,
    });

    useEffect(() => onAuthStateChanged(auth, user => {
        setSession({ isLoading: false, user });
        if (user) {
          getDoc(doc(db, 'secrets', 'huggingface')).then(snap => {
            if (snap.exists()) {
              setSession(prev => ({
                ...prev,
                secrets: {
                  huggingfaceApiKey: snap.data().key
                }
              }));
            }
          })
        }
    }), []);

    return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>;
}
