"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

interface User {
    id: number;
    name: string;
    username: string;
    role?: string;
}

interface UserContextType {
    user: User | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // baca cookie sekali saat mount
    useEffect(() => {
        const userCookie = getCookie("user");
        if (!userCookie) return;

        try {
            // getCookie bisa ngembaliin object atau string tergantung cara setnya
            const parsed =
                typeof userCookie === "string" ? JSON.parse(userCookie) : userCookie;
            setUser(parsed);
        } catch (err) {
            console.error("Failed to parse user cookie", err);
            // kalau parse gagal, hapus cookie biar bersih
            deleteCookie("user");
        }
    }, []); // <- kosong: cuma jalan saat mount

    const login = (userData: User, token: string) => {
        setUser(userData);

        // simpan user sebagai JSON string supaya konsisten saat baca
        setCookie("user", JSON.stringify(userData), {
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            // maxAge optional, contoh 30 hari:
            maxAge: 60 * 60 * 24 * 30,
        });

        // simpan token
        setCookie("token", token, {
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30,
        });
    };

    const logout = () => {
        setUser(null);
        deleteCookie("user");
        deleteCookie("token");
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within UserProvider");
    }
    return context;
};
