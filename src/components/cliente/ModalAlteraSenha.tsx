/**
Componente AlterarSenha.
Este componente exibe um formulário para alteração de senha do usuário.
Ele faz uso do contexto de autenticação (AuthContext) para obter as informações do usuário.
O usuário preenche os campos de senha antiga, nova senha e confirmação da nova senha.
Quando o botão "Alterar Senha" é clicado, é feita a validação dos campos e a chamada à API para efetuar a alteração da senha.
O resultado da alteração da senha é exibido em um alerta.
*/

import { AuthContext } from '@/contexts/AuthContext';
import * as router from '@/pages/api/router';
import style from '@/styles/cliente/meuCartao.module.css';
import styles from '@/styles/cliente/meuPerfil.module.css';
import { useContext, useState } from 'react';

/**
 * Propriedades do componente AlterarSenha.
 */
interface ModalAlteraSenhaProps {
  onSubmit: () => void;
}

/**
 * Componente para exibir um formulário de alteração de senha.
 */
export default function AlterarSenha(props: ModalAlteraSenhaProps) {
  const { user } = useContext(AuthContext);

  const [dados, setDados] = useState({
    senhaAntiga: '',
    novaSenha: '',
    confirmacao: '',
  });

  const [data, setData] = useState({
    senhaAntiga: '',
    novaSenha: '',
    email: user?.email,
    service: 'alterarSenha',
  });

  /**
   * Função para realizar a alteração de senha.
   */
  async function alterarSenha(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Define a mensagem que vai aparecer para o usuário
    var conteudo = '';

    //Checa se todos campos foram preenchidos
    if (dados.senhaAntiga == '' || dados.novaSenha == '' || dados.confirmacao == '') {
      conteudo = 'Preencha todos os campos para continuar!';
    }

    //Checa se a nova senha é igual a confirmação de nova senha
    else if (dados.confirmacao !== dados.novaSenha) {
      conteudo = 'A confirmação de senha e a nova senha precisam ser iguais!';
    } else {
      data.senhaAntiga = dados.senhaAntiga;
      data.novaSenha = dados.novaSenha;
      const res = await router.apiPost(data, 'cliente');
      conteudo = res.result;
    }
    alert(conteudo);
  }

  return (
    <>
      <div className={style.title}>Alterar Senha</div>
      <form onSubmit={alterarSenha} className={style.formStyle}>
        <div className={style.inputFormat}>
          Senha atual
          <input
            type="password"
            className={style.primaryInputStyle}
            placeholder="Senha Atual"
            onChange={(e) => (dados.senhaAntiga = e.target.value)}
            required
          />
        </div>
        <div className={style.inputFormat}>
          Nova Senha
          <input
            type="password"
            className={style.primaryInputStyle}
            placeholder="Nova Senha"
            required
            onChange={(e) => (dados.novaSenha = e.target.value)}
          />
        </div>
        <div className={style.inputFormat}>
          Confirme a nova Senha
          <input
            type="password"
            className={style.primaryInputStyle}
            placeholder="Digite novamente a nova senha"
            required
            onChange={(e) => (dados.confirmacao = e.target.value)}
          />
        </div>
        <button type="submit" className={styles.salvarAlt}>
          Alterar Senha
        </button>
      </form>
    </>
  );
}
