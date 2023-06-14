import { AuthContext } from '@/contexts/AuthContext';
import * as router from '@/pages/api/router';
import style from '@/styles/cliente/meuCartao.module.css';
import styles from '@/styles/cliente/meuPerfil.module.css';
import { useContext, useState } from 'react';

/**
 * Props para o componente ModalAlteraSenha.
 */
interface ModalAlteraSenhaProps {
  onSubmit: () => void;
}

/**
 * Componente de alteração de senha.
 */
export default function AlterarSenha(props: ModalAlteraSenhaProps) {
  const { user } = useContext(AuthContext);

  /**
   * Estado para armazenar os dados do formulário.
   */
  const [dados, setDados] = useState({
    senhaAntiga: '',
    novaSenha: '',
    confirmacao: '',
  });

  /**
   * Estado para armazenar os dados a serem enviados para a API.
   */
  const [data, setData] = useState({
    senhaAntiga: '',
    novaSenha: '',
    email: user.email,
    service: 'alterarSenha',
  });

  /**
   * Função assíncrona para alterar a senha.
   */
  async function alterarSenha(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Define a mensagem que vai aparecer para o usuário
    let conteudo = '';

    // Checa se todos os campos foram preenchidos
    if (dados.senhaAntiga === '' || dados.novaSenha === '' || dados.confirmacao === '') {
      conteudo = 'Preencha todos os campos para continuar!';
    }

    // Checa se a nova senha é igual à confirmação de nova senha
    else if (dados.confirmacao !== dados.novaSenha) {
      conteudo = 'A confirmação de senha e a nova senha precisam ser iguais!';
    } else {
      // Atualiza os dados a serem enviados para a API
      data.senhaAntiga = dados.senhaAntiga;
      data.novaSenha = dados.novaSenha;

      // Chama a API para alterar a senha
      const res = await router.apiPost(data, 'promoter');

      // Atualiza a mensagem de conteúdo com a resposta da API
      conteudo = res.result;
    }

    // Exibe a mensagem para o usuário
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
            onChange={(e) => (dados.novaSenha = e.target.value)}
            required
          />
        </div>
        <div className={style.inputFormat}>
          Confirme a nova Senha
          <input
            type="password"
            className={style.primaryInputStyle}
            placeholder="Digite novamente a nova senha"
            onChange={(e) => (dados.confirmacao = e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.salvarAlt}>
          Alterar Senha
        </button>
      </form>
    </>
  );
}
