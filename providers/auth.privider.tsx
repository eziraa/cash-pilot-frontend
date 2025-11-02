'use client'

import { getLoggedInUser } from "@/app/actions/auth";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Profile = {
    display_name: string;
    email: string;
    currency: string;
};

type User = {
    id?: string;
    email?: string;
    name?: string;
    // add other user fields here
    [key: string]: any;
    profiles?: Profile[];
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    error: Error | null;
    signIn: (token: string) => Promise<void>;
    signOut: () => void;
    refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "auth_token";



const setToken = (token: string) => {
    try {
        localStorage.setItem(TOKEN_KEY, token);
    } catch { }
};

const removeToken = () => {
    try {
        localStorage.removeItem(TOKEN_KEY);
    } catch { }
};



export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const load = async () => {
        setLoading(true);
        setError(null);

        try {
            // replace endpoints with your real API routes
            const loggedInUser = await getLoggedInUser()
            setUser(loggedInUser);
        } catch (err: any) {
            setError(err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // initial load on mount
        load().catch((e) => {
            setError(e);
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const signIn = async (token: string) => {
        setToken(token);
        await load();
    };

    const signOut = () => {
        removeToken();
        setUser(null);
    };

    const refresh = async () => {
        await load();
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, signIn, signOut, refresh }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return ctx;
};