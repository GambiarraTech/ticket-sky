/**
Componente CountInput.
Este componente exibe um campo de contagem com botões de adicionar e reduzir.
Ele mantém o controle da quantidade selecionada pelo usuário e chama uma função onChange
sempre que a quantidade é alterada.
*/

import style from '@/styles/cliente/telaEvento.module.css';
import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

/**
 * Propriedades do componente CountInput.
 */
interface CountInputProps {
  valorInicial: number;
  onChange: (e: any) => any;
  max: number;
}

/**
 * Componente para exibir um campo de entrada numérico com botões de incremento e decremento.
 */
export default function CountInput({ valorInicial, onChange, max }: CountInputProps) {
  const [quantidade, setQuantidade] = useState(valorInicial);

  /**
   * Função para incrementar a quantidade.
   */
  function adicionar() {
    if (quantidade < max) {
      setQuantidade((qtAtual) => qtAtual + 1);
      onChange(quantidade + 1);
    }
  }

  /**
   * Função para decrementar a quantidade.
   */
  function reduzir() {
    if (quantidade > 0) {
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
        min="0"
        value={quantidade}
        max={max}
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
