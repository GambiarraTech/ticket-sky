import style from '@/styles/cliente/table.module.css';
import Image from 'next/image';
import { FC } from 'react';

export type meusIngressosType = {
  img: string;
  nomeEvento: string;
  dataAquisicao: string;
  valorTotal: string;
};

interface TableProps {
  data: any[];
}

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
              <tr key={item.nome}>
                <td>
                  <div className={style.tableContent}>
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
