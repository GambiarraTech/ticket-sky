import NavbarCliente from '@/components/cliente/Navbar';
import Table, { meusIngressosType } from '@/components/cliente/TableIngressos';
import { AuthContext } from '@/contexts/AuthContext';
import Head from 'next/head';
import { useContext } from 'react';

// function getMeusIngressos(id){

// }

export default function meusIngressos() {
  const { user } = useContext(AuthContext);

  const data: meusIngressosType[] = [
    {
      img: 'a',
      nomeEvento: 'Show Roberto Carlos',
      dataAquisicao: '04/05/2023',
      valorTotal: 'R$ 200,00',
    },
    {
      img: 'a',
      nomeEvento: 'Show Stand Up',
      dataAquisicao: '05/05/2023',
      valorTotal: 'R$ 400,00',
    },
  ];

  return (
    <div>
      <Head>
        <title>TicketSky - Meus Ingressos</title>
      </Head>
      <NavbarCliente />
      <Table data={data} />
    </div>
  );
}
