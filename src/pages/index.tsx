import Footer from '@/components/Footer';
import NavbarCliente from '@/components/cliente/NavbarCliente';
import Carousel from '@/components/promoter/Carousel';
import { AuthContext } from '@/contexts/AuthContext';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useContext } from 'react';

const font = Inter({ subsets: ['latin'], weight: '500' });

export default function Home() {
  const { user, isLogged, logout } = useContext(AuthContext);

  return (
    <>
      <main className={`${font.className}`}>
        <Head>
          <title>TicketSky - Página Inicial</title>
        </Head>
        <NavbarCliente />
        <div>
          <Carousel title="Em Alta" page="telaevento"></Carousel>
          <Carousel title="Vistos Recentemente"></Carousel>
          <Carousel title="Pra você"></Carousel>
        </div>
      </main>
      <Footer color="white" />
    </>
  );
}
