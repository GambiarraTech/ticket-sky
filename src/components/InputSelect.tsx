import { useEffect, useState } from 'react';
import * as router from '../pages/api/router';
import style from '../styles/select.module.css';

interface PropsItens {
  id?: number;
  nome?: string;
}

export default function InputSelect() {

  const [itens, setItens] = useState<PropsItens[]>([]);
  useEffect(() => {
    router.apiGet('categoria').then((value) => {
      setItens(value.result);
      //*console.log(itens);
    });
  }, []);
  if(!itens || itens.length ==0) return null
  return (
    <select className={style.select}>
      {itens.map((item) => (
        <option value={item.id}>{item.nome}</option>
      ))}
    </select>
  );
}
