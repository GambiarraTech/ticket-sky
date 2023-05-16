import styles from '@/styles/promoter/formCard.module.css';
import { Input } from '@/types/components/input';
import React, { useState } from 'react';
import * as router from '../../pages/api/router';

type FormCardProps = {
  inputs: Input[];
  titulo: string;
  buttonText: string;
  service: string;
  endPoint: string;
};

export default function FormCard({ inputs, titulo, buttonText, service, endPoint }: FormCardProps) {
  // Cria o estado inputValues inicialmente vazio.

  // O inputValues é um objeto no qual as chaves ([key: string]) são do tipo string e os
  // valores associados a essas chaves também são do tipo string.
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  // (event: React.ChangeEvent<HTMLInputElement>) Define uma função callback que é chamada sempre que ocorre uma alteração no input.
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // O setInputValues serve para atualizar o estado do inputValues.
    // setInputValues é uma função de callback que recebe o valor anterior do estado inputValues como argumento (prevInputValues).
    // o ... (operador spread) antes do objeto serve para manter os valores dos inputs anteriores, que são propriedades do inputValues.
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      // Adicionar uma nova propriedade (com base no id do input -> [event.target.id]) e atualiza o valor associado ao id
      // do input que gerou o evento de alteração
      [event.target.id]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      service: service,
    }));

    const res = router.apiPost(inputValues, endPoint);
    console.log(res);
  };

  return (
    <>
      <h2 className={styles.title}>{titulo}</h2>
      <div className={styles.card}>
        {inputs.map((input) => (
          // A key serve para garantir que cada fragmento tenha uma chave exclusiva com base no input.id
          <React.Fragment key={input.id}>
            <label htmlFor={input.id}>{input.label}</label>
            <input
              id={input.id}
              name={input.id}
              type={input.id}
              value={inputValues[input.id] || ''}
              onChange={handleChange}
            />
          </React.Fragment>
        ))}
        <button onClick={handleSubmit}>{buttonText}</button>
      </div>
    </>
  );
}
