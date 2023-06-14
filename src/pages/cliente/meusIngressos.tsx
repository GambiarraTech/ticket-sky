import NavbarCliente from '@/components/cliente/NavbarCliente';
import Table from '@/components/cliente/TableIngressos';
import { AuthContext } from '@/contexts/AuthContext';
import * as router from '@/pages/api/router';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';

/**
 * Página de exibição dos "Meus Ingressos" para um cliente.
 * Esta página exibe uma tabela contendo os ingressos adquiridos pelo cliente.
 * @returns JSX.Element
 */
export default function meusIngressos() {
  const { user } = useContext(AuthContext);

  const [data, setData] = useState([{}]);

  useEffect(() => {
    if (user != undefined) {
      router.apiPost({ service: 'meusIngressos', id: user.id }, 'relatorios').then((value) => {
        if (value.meusPedidos.length > 0) {
          setData(value.meusPedidos);
        }
      });
    }
  }, [user]);

  return (
    <div>
      <Head>
        <title>TicketSky - Meus Ingressos</title>
      </Head>
      <NavbarCliente />
      <Table data={data}></Table>
    </div>
  );
}
