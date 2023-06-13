import { IAdminProps } from '@/pages/admin/administradores';
import { IEventosProps } from '@/pages/admin/eventos';
import { IPromotersProps } from '@/pages/admin/promoters';
import { apiPost } from '@/pages/api/router';
import styles from '@/styles/table/DataTable.module.css';
import React, { FC } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';

interface TableProps {
  title: string;
  //   Adicionar os outros tipos
  data: IAdminProps[] | IPromotersProps[] | IEventosProps[];
  columns: string[];
  props: string[];
  addButton?: boolean;
}

const DataTable: FC<TableProps> = ({ data, columns, title, props, addButton = false }) => {
  const [search, setSearch] = React.useState('');
  //   Adicionar os outros tipos
  const fixedData: Array<IAdminProps | IPromotersProps | IEventosProps> = data;

  function deletarAdmin(id: number) {
    apiPost({ idPromoter: id, service: 'deleteAdmin' }, 'admin').then(() => {});
  }

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
  };

  const filteredData = fixedData.filter(
    (item) => item.nome.toLowerCase().includes(search.toLowerCase()) || item.id.toString().includes(search)
  );

  return (
    <div className={styles.dataTable}>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.topContent}>
        <div></div>
        <div className={styles.searchIconPosition}>
          <span className={styles.searchBar}>
            <BiSearch className={styles.colorIcon} />
          </span>
          <input className={styles.input} placeholder="Pesquisar" type="text" onChange={handleSearch} />
        </div>
        {title == 'Administradores' ? (
          <button>
            <IoIosAddCircle color="white" size={'25'} />
          </button>
        ) : (
          <div></div>
        )}
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
              {title == 'Administradores' ? (
                <th scope="col" className={styles.tableCellHeader} style={{ color: 'red' }}>
                  Excluir
                </th>
              ) : (
                <></>
              )}
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
                {title == 'Administradores' ? (
                  <td className={styles.tableCellIcon}>
                    {endPoint.id == 1 ? (
                      <button disabled={true}>
                        <FaTrash color={'grey'} />
                      </button>
                    ) : (
                      <button onClick={() => deletarAdmin(endPoint.id)}>
                        <FaTrash color={'red'} />
                      </button>
                    )}
                  </td>
                ) : (
                  <></>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
