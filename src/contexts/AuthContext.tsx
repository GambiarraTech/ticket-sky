import { getUser } from '@/pages/api/router';
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, useEffect, useState } from 'react';

type User = {
  email: string;
  nome: string;
  sobrenome: string;
  cpf: string | undefined;
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
    });

    setUser(user);

    Router.push(`/${user.role}`);
  }

  //Funçao que faz o logout do usuario do sistema, destrói o token, seta o usuario da aplicaçao como null
  //e redireciona para o login do tipo do usuario logado anteriormente
  async function logout() {
    const cookies = parseCookies();

    const token = cookies['ticketsky-token'];

    if (token) {
      getUser(token).then((response) => {
        destroyCookie(undefined, 'ticketsky-token');

        setUser(null);
        Router.push(`/`);
        //erro
        // if (response.user.role == 'cliente') {
        //   Router.push(`/admin`); //alterar para index geral
        // } else if (response.user.role == 'promoter') {
        //   Router.push(`/${response.user.role}`);
        // } else {
        //   Router.push(`/${response.user.role}/login`);
        // }
        console.log(response);
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user: user!, isLogged, login, logout }}>{children}</AuthContext.Provider>
  );
}
