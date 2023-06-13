import { AuthContext } from '@/contexts/AuthContext';
import * as router from '@/pages/api/router';
import styles from '@/styles/formCard.module.css';
import { Input } from '@/types/components/input';
import Link from 'next/link';
import React, { useContext, useState } from 'react';

/**
 * Propriedades do componente FormCardProps.
 */
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

/**
 * Função assíncrona para enviar um email de confirmação após o cadastro.
 * @param emailPromoter O email do promotor para envio da confirmação.
 */
async function enviaEmailConfirmacao(emailPromoter: string) {
  let data;
  const res = router.apiPost(
    {
      destinatario: emailPromoter,
      assunto: 'Confirmação de cadastro',
      mensagem:
        'Cadastro realizado com sucesso! Aguarde a confirmação de acesso! Não se preocupe você receberá um e-mail quando isso acontecer.',
      anexos: null,
    },
    'services/emailService'
  );
  res.then((value) => {});
}

/**
 * Componente para exibir um formulário personalizável.
 */
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
  const [showInfoMessage, setShowInfoMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setShowErroLogin(false);
    setShowInfoMessage(false);

    const allInputsFilled = props.inputs.every((input) => inputValues[input.id]);
    if (allInputsFilled) {
      const res = router.apiPost(inputValues, props.endPoint);

      res.then((value) => {
        if (!value.error) {
          if (props.endPoint == 'promoter' && inputValues.service == 'cadastroPromoter') {
            enviaEmailConfirmacao(inputValues.email);
            setShowInfoMessage(true);
            setErrorMessage('Solicitação enviada. Verifique seu email.');
          } else {
            login(value.result);
          }
        } else {
          setShowErroLogin(true);
          setErrorMessage(props.errorMessage);
        }
      });
    } else {
      setShowErroLogin(true); // Exibe o erro caso algum campo não esteja preenchido
      setErrorMessage('Preencha todos os campos.');
    }
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
              type={input.id === 'senha' ? 'password' : input.id}
              value={inputValues[input.id] || ''}
              onChange={handleChange}
              maxLength={input.length}
              required
            />
          </React.Fragment>
        ))}
        <p className={styles.mensagemErro}>{showErroLogin ? errorMessage : ''}</p>
        <p className={styles.mensagemInfo}>{showInfoMessage ? errorMessage : ''}</p>
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
