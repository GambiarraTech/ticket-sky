import Layout from '@/components/admin/Layout';
import DataTable from '@/components/table/DataTable';
import { getServerSideProps } from '@/lib/auth';
import { useEffect, useState } from 'react';
import * as router from '../api/router';

/**
 * Interface que define a estrutura de um evento.
 */
export interface IEventosProps {
  id: number;
  nome: string;
  data_hora: string;
  categoria: string;
  promoter: string;
}

/**
 * Função auxiliar que converte a data em formato personalizado.
 * @param data A data a ser convertida.
 * @param service O serviço para o qual a conversão está sendo feita ('day' ou 'month').
 * @returns A data convertida para o formato personalizado.
 */
function ConvertDate(data: Date, service: String) {
  if (service == 'day') {
    switch (data.getDay()) {
      case 0:
        return 'Dom';
      case 1:
        return 'Seg';
      case 2:
        return 'Ter';
      case 3:
        return 'Qua';
      case 4:
        return 'Qui';
      case 5:
        return 'Sex';
      case 6:
        return 'Sab';
      default:
        return '';
    }
  } else if (service == 'month') {
    switch (data.getMonth()) {
      case 0:
        return 'Jan';
      case 1:
        return 'Fev';
      case 2:
        return 'Mar';
      case 3:
        return 'Abr';
      case 4:
        return 'Mai';
      case 5:
        return 'Jun';
      case 6:
        return 'Jul';
      case 7:
        return 'Ago';
      case 8:
        return 'Set';
      case 9:
        return 'Out';
      case 10:
        return 'Nov';
      case 11:
        return 'Dez';
      default:
        return '';
    }
  }
}

/**
 * Página "Eventos" que exibe uma tabela com a lista de eventos.
 */
export default function Eventos() {
  const [eventos, setEventos] = useState<IEventosProps[]>([]);
  const columns = ['Código', 'Nome', 'Data/ Hora', 'Categoria', 'Promoter'];
  const props = ['id', 'nome', 'data_hora', 'categoria', 'promoter'];
  function converterData(timestampStr: string): string {
    const data = new Date(timestampStr);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Os meses são baseados em zero
    const ano = data.getFullYear();
    const hora = String(data.getHours()).padStart(2, '0');
    const minuto = String(data.getMinutes()).padStart(2, '0');
    const segundo = String(data.getSeconds()).padStart(2, '0');

    const dataString = `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
    return dataString;
  }
  const fetchData = () => {
    router
      .apiPost({ service: 'todosEventos' }, 'relatorios')
      .then((data) => {
        const eventosData = data.todosEventos;
        setEventos(eventosData);
      })
      .catch((error) => {
        console.error('Erro ao obter os eventos:', error);
      });
  };

  useEffect(() => {
    router
      .apiPost({ service: 'todosEventos' }, 'relatorios')
      .then((data) => {
        const eventosData = data.todosEventos;
        eventosData.map((item: any) => {
          const evento: IEventosProps = item;
          evento.data_hora = converterData(evento.data_hora);
        });
        setEventos(eventosData);
      })
      .catch((error) => {
        console.error('Erro ao obter os eventos:', error);
      });
  }, []);

  return (
    <Layout>
      <DataTable
        title="Eventos"
        data={eventos}
        columns={columns}
        props={props}
        endpoint="evento"
        updateData={fetchData}
      ></DataTable>
    </Layout>
  );
}

export { getServerSideProps };
