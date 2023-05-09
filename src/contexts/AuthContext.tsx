import { getUser } from '@/pages/api/router';
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, useEffect, useState } from 'react';

type User = {
  email: string;
  nome: string;
  role: string;
};

type loginData = {
  token: string;
  user: User;
};

type AuthContextType = {
  user: User;
  isLogged: boolean;
  login: ({ token, user }: loginData) => Promise<void>;
  logout: () => Promise<void>;
  autenticar: (path: string) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);

  const isLogged = !!user;

  useEffect(() => {
    const cookies = parseCookies();

    const token = cookies['ticketsky-token'];

    if (token) {
      getUser(token).then((response) => {
        setUser(response.user);
      });
    }
  }, []);

  async function login({ token, user }: loginData) {
    //setando cookie (contexto, nome, token, parametros adicionais)
    setCookie(undefined, 'ticketsky-token', token, {
      maxAge: 3600, // 1 hora
    });

    setUser(user);

    Router.push(`/${user.role}`);
  }

  async function logout() {
    const cookies = parseCookies();

    const token = cookies['ticketsky-token'];

    if (token) {
      getUser(token).then((response) => {
        destroyCookie(undefined, 'ticketsky-token');

        setUser(null);

        Router.push(`/${response.user.role}/login`);
      });
    }
  }

  async function autenticar(path: string) {
    const cookies = parseCookies();

    const token = cookies['ticketsky-token'];

    if (!token) {
      Router.push(path);
    }
  }

  return (
    <AuthContext.Provider value={{ user: user!, isLogged, login, logout, autenticar }}>{children}</AuthContext.Provider>
  );
}
