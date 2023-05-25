import Layout from '@/components/admin/Layout';
import DataTable from '@/components/table/DataTable';
import { getServerSideProps } from '@/lib/auth';
import { useEffect, useState } from 'react';
import * as router from '../api/router';

export interface IEventosProps {
  id: number;
  nome: string;
  data_hora: string;
  categoria: string;
  promoter: string;
}

export default function Eventos() {
  const [eventos, setEventos] = useState<IEventosProps[]>([]);
  const columns = ['Código', 'Descrição', 'Data/ Hora', 'Categoria', 'Promoter'];
  const props = ['id', 'nome', 'data_hora', 'categoria', 'promoter'];
  useEffect(() => {
    router
      .apiPost({ service: 'todosEventos' }, 'relatorios')
      .then((data) => {
        const eventosData = data.todosEventos;
        setEventos(eventosData);
      })
      .catch((error) => {
        console.error('Erro ao obter os eventos:', error);
      });
  }, []);
  return (
    <Layout>
      <DataTable title="Eventos" data={eventos} columns={columns} props={props}></DataTable>
    </Layout>
  );
}

export { getServerSideProps };
