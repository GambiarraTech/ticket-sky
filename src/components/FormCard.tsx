import { AuthContext } from '@/contexts/AuthContext';
import * as router from '@/pages/api/router';
import styles from '@/styles/formCard.module.css';
import { Input } from '@/types/components/input';
import Link from 'next/link';
import React, { useContext, useState } from 'react';

type FormCardProps = {
  inputs: Input[];
  titulo?: string;
  subtitulo?: string;
  buttonText: string;
  service: string;
  endPoint: string;
  footer?: { message: string; linkMessage: string; link: string };
  errorMessage: string;
};

export default function FormCard(props: FormCardProps) {
  // Cria o estado inputValues inicialmente apenas com a propriedade service.
  // O inputValues é um objeto no qual as chaves ([key: string]) são do tipo string e os
  // valores associados a essas chaves também são do tipo string.
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({ service: props.service });

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

  const { login } = useContext(AuthContext);
  const [showErroLogin, setShowErroLogin] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setShowErroLogin(false);

    const res = router.apiPost(inputValues, props.endPoint);

    res.then((value) => {
      if (!value.error) {
        login(value.result);
      } else {
        setShowErroLogin(true);
      }
    });
  }

  return (
    <>
      {props.titulo ? <h2 className={styles.title}>{props.titulo}</h2> : null}
      {props.subtitulo ? <h3 className={styles.subtitulo}>{props.subtitulo}</h3> : null}
      <div className={styles.card}>
        {props.inputs.map((input) => (
          // A key serve para garantir que cada fragmento tenha uma chave exclusiva com base no input.id
          <React.Fragment key={input.id}>
            <label htmlFor={input.id}>{input.label}</label>
            <input
              id={input.id}
              name={input.id}
              type={input.id}
              value={inputValues[input.id] || ''}
              onChange={handleChange}
              maxLength={50}
              required
            />
          </React.Fragment>
        ))}
        <p className={styles.mensagemErro}>{showErroLogin ? props.errorMessage : ''}</p>

        <button onClick={handleSubmit}>{props.buttonText}</button>
        {props.footer && (
          <p className={styles.footer}>
            {props.footer.message}
            <Link href={props.footer.link}>{props.footer.linkMessage}</Link>
          </p>
        )}
      </div>
    </>
  );
}
