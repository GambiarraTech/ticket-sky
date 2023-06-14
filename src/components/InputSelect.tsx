import { useEffect, useState } from 'react';
import * as router from '../pages/api/router';
import style from '../styles/select.module.css';

/**
 * Propriedades de cada item do select.
 */
interface PropsItens {
  id?: number;
  nome?: string;
}

/**
 * Propriedades do componente InputSelect.
 */
interface PropsSelect {
  endpoint: string;
  onItemSelected: (id: number) => void;
}

/**
 * Componente para exibir um campo de seleção personalizado (select).
 */
const InputSelect: React.FC<PropsSelect> = ({ onItemSelected, endpoint }) => {
  const [itens, setItens] = useState<PropsItens[]>([]);
  useEffect(() => {
    router.apiGet(endpoint).then((value) => {
      setItens(value.result);
    });
  }, []);
  if (!itens || itens.length == 0) return null;

  /**
   * Função chamada quando um item é selecionado no campo de seleção.
   */
  async function handleSelect(event: any) {
    onItemSelected(parseInt(event.target.value));
  }

  return (
    <select className={style.select} required onChange={handleSelect}>
      <option selected disabled hidden>
        {' '}
        Selecione{' '}
      </option>
      {itens.map((item) => (
        <option value={item.id}>{item.nome}</option>
      ))}
    </select>
  );
};
export default InputSelect;
