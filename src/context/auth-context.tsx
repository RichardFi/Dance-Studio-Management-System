import React, { useState, ReactNode } from "react";
import * as auth from 'auth-provider';
import { User } from "screens/projectList/searchPanel";
import { http } from "utils/http";
import { useMount } from "utils";

interface AuthForm {
    email: string,
    password: string
}

const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken();
    
    if (token) {
        const data = await http('auth', { token });
        user = data.user;
    }
    user.token = token;
    return user;
}

interface Register {
    firstName: string,
    lastName: string,
    gender: string,
    phone: string,
    email: string,
    password: string
}

const AuthContext = React.createContext<{
    user: User | null,
    register: (form: Register) => Promise<void>,
    login: (form: AuthForm) => Promise<void>,
    logout: () => Promise<void>,
} | undefined>(undefined);

AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (form: AuthForm) => auth.login(form).then(setUser);
    const register = (form: Register) => auth.register(form).then(setUser);
    const logout = () => auth.logout().then(() => setUser(null));
    useMount(() => {
        bootstrapUser().then(setUser);
    })
    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used in AuthProvider')
    }
    return context
}