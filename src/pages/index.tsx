import { Carousel } from '@/components/carousel/Carousel'
import { NavbarCliente } from '@/components/navbar/NavbarCliente'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const font = Inter({ subsets: ['latin'], weight: '500' })

export default function Home() {
  return (
    <main className={`${font.className}`}>
      <Head>
        <title>TicketSky - Página Inicial</title>
      </Head>
      <NavbarCliente Logado={true} />
      <Carousel />
    </main>
  )
}
