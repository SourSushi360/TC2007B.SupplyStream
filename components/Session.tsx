import { useContext, createContext, type PropsWithChildren, useState, useEffect } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/constants/firebase";

interface AppSession {
    isLoading: boolean;
    user: User | null;
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
    }), []);

    return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>;
}
