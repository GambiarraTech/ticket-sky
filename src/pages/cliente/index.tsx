import NavbarCliente from '@/components/cliente/navbar/Navbar';
import Carousel from '@/components/promoter/Carousel';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const font = Inter({ subsets: ['latin'], weight: '500' });

export default function Home() {
  return (
    <main className={`${font.className}`}>
      <Head>
        <title>TicketSky - Página Inicial</title>
      </Head>
      <NavbarCliente Logado={true} />
      <Carousel title="Em Alta" page="cliente/telaevento"></Carousel>
      <Carousel title="Vistos Recentemente"></Carousel>
      <Carousel title="Pra você"></Carousel>
    </main>
  );
}
