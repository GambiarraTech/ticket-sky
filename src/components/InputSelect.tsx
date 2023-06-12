import { useEffect, useState } from 'react';
import * as router from '../pages/api/router';
import style from '../styles/select.module.css';

interface PropsItens {
  id?: number;
  nome?: string;
}
interface PropsSelect {
  endpoint: string;
  onItemSelected: (id: number) => void;
}
/*Recebe o nome da tabela que deseja fazer o select.
   Retorna o id do item que foi selecionado.
*/
const InputSelect: React.FC<PropsSelect> = ({ onItemSelected, endpoint }) => {
  const [itens, setItens] = useState<PropsItens[]>([]);
  useEffect(() => {
    router.apiGet(endpoint).then((value) => {
      setItens(value.result);
    });
  }, []);
  if (!itens || itens.length == 0) return null;

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
