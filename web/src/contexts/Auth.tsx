import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
    id: string,
    avatar_url: string,
    login: string,
    name: string
}

interface IAuthContextData {
    user: User | null,
    signInUrl: string,
    signOut: () => void
}

export const AuthContext = createContext({} as IAuthContextData);

type AuthProvider = {
    children: ReactNode,
}

interface IAuthResponse{
    token: string,
    user: {
        id: string,
        avatar_url: string,
        login: string,
        name: string
    }
}

export function AuthProvider(props: AuthProvider) {
    const [user, setUser] = useState<User | null>(null);

    const signInUrl = 'import.meta.env.VITE_SIGNIN_URL';

    async function signIn(githubCode: string) {
        const response = await api.post<IAuthResponse>('auth', {
            code: githubCode,
        });

        const { token, user } = response.data;

        localStorage.setItem('@dowhile:token', token);
        api.defaults.headers.common.authorization = `Bearer ${token}`;

        setUser(user);
    }

    function signOut() {
        setUser(null);
        localStorage.removeItem('@dowhile:token');
    }

    useEffect(() => {
        const token = localStorage.getItem('@dowhile:token');

        if(token) {
            api.defaults.headers.common.authorization = `Bearer ${token}`;

            api.get<User>('profile').then(res => {
                setUser(res.data);
            });
        }
    }, [])

    useEffect(() => {
        const url = window.location.href;
        const hasGithubCode = url.includes('?code=');

        if(hasGithubCode) {
            const [urlWithoutCode, githubCode] = url.split('?code=');

            window.history.pushState([], '', urlWithoutCode);

            signIn(githubCode);
        }
    }, [])

    return (
        <AuthContext.Provider value={{ signInUrl, user, signOut }}>
            {props.children}
        </AuthContext.Provider>
    );
}