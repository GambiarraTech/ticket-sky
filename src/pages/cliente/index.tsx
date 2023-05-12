import NavbarCliente from '@/components/cliente/navbar/Navbar';
import Carousel from '@/components/promoter/Carousel';
import { AuthContext } from '@/contexts/AuthContext';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useContext } from 'react';

const font = Inter({ subsets: ['latin'], weight: '500' });

export default function Home() {
  const { user, isLogged, logout, autenticar } = useContext(AuthContext);

  autenticar('/cliente');
  return (
    <main className={`${font.className}`}>
      <Head>
        <title>TicketSky - Página Inicial</title>
      </Head>
      <NavbarCliente />
      <Carousel title="Em Alta" page="cliente/telaevento"></Carousel>
      <Carousel title="Vistos Recentemente"></Carousel>
      <Carousel title="Pra você"></Carousel>
    </main>
  );
}
