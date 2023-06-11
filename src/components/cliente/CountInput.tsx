import style from '@/styles/cliente/telaEvento.module.css';
import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CountInputProps {
  valorInicial: number;
  onChange: (e: any) => any;
}

export default function CountInput({ valorInicial, onChange }: CountInputProps) {
  const [quantidade, setQuantidade] = useState(valorInicial);

  function adicionar() {
    setQuantidade((qtAtual) => qtAtual + 1);
    onChange(quantidade + 1);
  }

  function reduzir() {
    if (quantidade > 1) {
      setQuantidade((qtAtual) => qtAtual - 1);
      onChange(quantidade - 1);
    }
  }

  return (
    <div className={style.countInput}>
      <button type="button" onClick={reduzir} className={style.buttonCount}>
        <AiOutlineMinus size="10" />
      </button>
      <input
        type="quantity"
        min="1"
        value={quantidade}
        onChange={(event) => {
          const value = parseInt(event.target.value, 10);
          if (!isNaN(value) && value >= 1) {
            setQuantidade(value);
            onChange(value);
          }
        }}
        className={style.centerQuant}
      />
      <button type="button" onClick={adicionar} className={style.buttonCount}>
        <AiOutlinePlus size="10" />
      </button>
    </div>
  );
}
