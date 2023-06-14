/**
Componente Table.
Este componente exibe uma tabela de ingressos do usuário.
Recebe um array de objetos meusIngressosType como propriedade, contendo informações sobre cada ingresso.
O componente mapeia os objetos e exibe uma linha na tabela para cada ingresso.
Cada linha exibe uma imagem do ingresso, o nome do evento, a data de aquisição e o valor total.
*/

import style from '@/styles/cliente/table.module.css';
import Image from 'next/image';
import { FC } from 'react';

/**
 * Tipo de dados para um ingresso.
 */
export type meusIngressosType = {
  img: string;
  nomeEvento: string;
  dataAquisicao: string;
  valorTotal: string;
};

/**
 * Props para o componente Table.
 */
interface TableProps {
  data: any[];
}

/**
 * Componente de tabela para exibir dados de ingressos.
 */
const Table: FC<TableProps> = ({ data }) => {
  return (
    <div className={style.positionTable}>
      <div className={style.borderTable}>
        <table id="tblUsers" className={style.table}>
          <thead className={style.thead}>
            <tr>
              <th scope="col" className={style.title}>
                Minhas compras
              </th>
            </tr>
          </thead>
          <tbody className={style.table}>
          {data.map((item) => {
            const date = new Date(item.data_hora);
            return(
              <tr key={item.id+1}>
                <td>
                  <div  className={style.tableContent}>
                    <div>
                      <Image
                        className={style.imgBorder}
                        src={'data:image/png;base64,' + item.banner}
                        alt="ingresso"
                        height="200"
                        width="200"
                      />
                    </div>

                    <div className={style.contentText}>
                      <div className={style.spaceText}>
                        <p className={style.eventName}>{item.nome}</p>
                        <p className={style.eventInfo}>Data de Aquisição: {date.toLocaleDateString()}</p>
                        <p className={style.eventInfo}>Valor total: {' $'+item.quantidade * item.valor_ingresso}</p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
