import { api } from '@/lib/axiosBrowser';
import { getUser } from '@/pages/api/router';
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, useEffect, useState } from 'react';

type User = {
  id: string;
  email: string;
  nome: string;
  sobrenome: string;
  cpf?: string;
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
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);

  //isLogged recebe true se o ''user'' existir e false caso não exista
  const isLogged = !!user;

  //useEffect() é uma função que é executada toda vez que algo é renderizado, no caso abaixo
  //é verificado a todo momento se o token existe e caso exista salva o usuario da aplicacao
  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies['ticketsky-token'];

    if (token) {
      getUser(token).then((response) => {
        setUser(response.user);
      });
    }
  }, []);

  //Faz o login na aplicaçao cria o token, seta o usuario e redireciona para a pagina em questao que o usuario pertence
  async function login({ token, user }: loginData) {
    //setando cookie (contexto, nome, token, parametros adicionais)
    setCookie(undefined, 'ticketsky-token', token, {
      maxAge: 3600, // 1 hora
      path: '/'
    });

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    setUser(user);

    Router.push(`/${user.role == 'cliente' ? '' : user.role}`);
  }

  //Funçao que faz o logout do usuario do sistema, destrói o token, seta o usuario da aplicaçao como null
  //e redireciona para o login do tipo do usuario logado anteriormente
  async function logout() {
    const { 'ticketsky-token': token } = parseCookies();

    if (token) {
      destroyCookie(undefined, 'ticketsky-token', {
        path: '/',
      });

      setUser(null);
      Router.push(`/`);
    }
  }

  return <AuthContext.Provider value={{ user: user!, isLogged, login, logout }}>{children}</AuthContext.Provider>;
}
