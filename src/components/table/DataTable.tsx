import { IAdminProps } from '@/pages/admin/administradores';
import { IEventosProps } from '@/pages/admin/eventos';
import { IPromotersProps } from '@/pages/admin/promoters';
import { apiPost } from '@/pages/api/router';
import styles from '@/styles/table/DataTable.module.css';
import React, { FC } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';

interface TableProps {
  title: string;
  //   Adicionar os outros tipos
  data: IAdminProps[] | IPromotersProps[] | IEventosProps[];
  columns: string[];
  props: string[];
  endpoint: string,
  updateData: () => void;
}

const DataTable: FC<TableProps> = ({ data, columns, title, props, endpoint, updateData }) => {
  const [search, setSearch] = React.useState('');
  const [forceUpdate, setForceUpdate] = React.useState(false);
  //   Adicionar os outros tipos
  const fixedData: Array<IAdminProps | IPromotersProps | IEventosProps> = data;

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
  };

  const filteredData = fixedData.filter(
    (item) => item.nome.toLowerCase().includes(search.toLowerCase()) || item.id.toString().includes(search)
  );

  function upper(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function excluir(endpoint: any, id: any){
    if( endpoint == 'admin'){
        apiPost({service: 'excluir'+ upper(endpoint), id: id}, endpoint)
        .then(() => {
            updateData(); // Atualiza os dados da tabela após excluir o dado
          })
          .catch((error) => {
            console.error('Erro ao excluir:', error);
          });
    }

  }
  return (
    <div className={styles.dataTable}>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.searchIconPosition}>
        <span className={styles.searchBar}>
          <BiSearch className={styles.colorIcon} />
        </span>
        <input className={styles.input} placeholder="Pesquisar" type="text" onChange={handleSearch} />
      </div>

      <div className={styles.tableBackground}>
        <table id="tblUsers" className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr className={styles.tableRow}>
              {columns.map((item, index) => (
                <th key={index} scope="col" className={styles.tableCellHeader}>
                  {item}
                </th>
              ))}
              <th scope="col" className={styles.tableCellHeader} style={{ color: 'red' }}>
                Excluir
              </th>
            </tr>
          </thead>
          <tbody className={styles.tableRowGroup}>
            {filteredData.map((endPoint, index) => (
              <tr key={index} className={styles.tableRow}>
                {props.map((values, key) => (
                  <td key={key} className={styles.tableCell}>
                    {endPoint[values as keyof typeof endPoint]}
                  </td>
                ))}
                <td className={styles.tableCellIcon}>
                  <button onClick={() => excluir(endpoint,data[index].id)}>
                    <FaTrash color={'red'} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
