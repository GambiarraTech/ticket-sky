import { apiPost } from '@/pages/api/router';
import styles from '@/styles/admin/CardEventosAlta.module.css';
import { useEffect, useState } from 'react';
import Card from './Card';

interface IEventosDestaqueProps {
  id: number;
  nome: string;
  quantidade_vendida: number;
}

export default function CardEventosAlta() {
  const [eventos, setEventos] = useState<IEventosDestaqueProps[]>([]);
  useEffect(() => {
    apiPost({ service: 'eventosAlta' }, 'relatorios')
      .then((data) => {
        const eventosData = data.eventosAlta;
        setEventos(eventosData);
      })
      .catch((error) => {
        console.error('Erro ao obter os eventos:', error);
      });
  }, []);
  return (
    <Card
      label="Eventos em Destaque"
      content={
        eventos.length > 0 ? (
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr className={styles.tableRow}>
                <th className={styles.tableCellHeader}>Nome</th>
                <th className={styles.tableCellHeader}>Vendidos</th>
              </tr>
            </thead>
            <tbody className={styles.tableRowGroup}>
              {eventos.map((evento) => (
                <tr className={styles.tableRow}>
                  <th className={styles.tableCell}>{evento.nome}</th>
                  <th className={styles.tableCell}>{evento.quantidade_vendida}</th>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.txtNullEventos}>
            <p> Nenhum evento cadastrado </p>
          </div>
        )
      }
    />
  );
}
