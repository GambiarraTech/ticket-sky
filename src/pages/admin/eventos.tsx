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

  {
    eventos.map((item) => {
      const evento: IEventosProps = item;
      const date = new Date(evento.data_hora);
      let dia = date.getDate().toString();
      let horas = date.getHours().toString();
      let minutos = date.getMinutes().toString();
      if (date.getDate() < 10) {
        dia = date.getDate().toString().padStart(2, '0');
      }
      if (date.getHours() < 10) {
        horas = date.getSeconds().toString().padStart(2, '0');
      }
      if (date.getMinutes() < 10) {
        minutos = date.getMinutes().toString().padStart(2, '0');
      }
      evento.data_hora =
        `${ConvertDate(date, 'day')}` +
        ', ' +
        `${dia}` +
        ' ' +
        `${ConvertDate(date, 'month')}` +
        ' ' +
        `${horas}:${minutos}`;
    });
  }

  return (
    <Layout>
      <DataTable title="Eventos" data={eventos} columns={columns} props={props}></DataTable>
    </Layout>
  );
}

export { getServerSideProps };
