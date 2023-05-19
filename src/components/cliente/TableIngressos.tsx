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
  data?: meusIngressosType[];
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
            {data?.map((item) => (
              <tr key={item.nomeEvento}>
                <td>
                  <div className={style.tableContent}>
                    <div>
                      <Image
                        className={style.imgBorder}
                        src="/../public/images/quadrado.png"
                        alt="ingresso"
                        height="120"
                        width="120"
                      />
                    </div>

                    <div className={style.contentText}>
                      <div className={style.spaceText}>
                        <p className={style.eventName}>{item.nomeEvento}</p>
                        <p className={style.eventInfo}>Data de Aquisição: {item.dataAquisicao}</p>
                        <p className={style.eventInfo}>Valor total: {item.valorTotal}</p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
