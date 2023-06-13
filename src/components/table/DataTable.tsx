import { IAdminProps } from '@/pages/admin/administradores';
import { IEventosProps } from '@/pages/admin/eventos';
import { IPromotersProps } from '@/pages/admin/promoters';
import styles from '@/styles/table/DataTable.module.css';
import React, { FC } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';

/**
 * Props do componente `DataTable`.
 */
interface TableProps {
  title: string;
  data: IAdminProps[] | IPromotersProps[] | IEventosProps[];
  columns: string[];
  props: string[];
}

/**
 * Componente de tabela de dados genérica.
 */
const DataTable: FC<TableProps> = ({ data, columns, title, props }) => {
  const [search, setSearch] = React.useState('');
  const fixedData: Array<IAdminProps | IPromotersProps | IEventosProps> = data;

  /**
   * Manipulador para a pesquisa de dados na tabela.
   * @param event - O evento de mudança no campo de pesquisa.
   */
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  /**
   * Filtra os dados com base no termo de pesquisa.
   */
  const filteredData = fixedData.filter(
    (item) => item.nome.toLowerCase().includes(search.toLowerCase()) || item.id.toString().includes(search)
  );

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
                  <button>
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
