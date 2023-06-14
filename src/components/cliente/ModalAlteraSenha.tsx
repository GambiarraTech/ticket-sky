import { AuthContext } from '@/contexts/AuthContext';
import * as router from '@/pages/api/router';
import styles from '@/styles/cliente/MeuPerfil.module.css';
import style from '@/styles/cliente/meuCartao.module.css';
import { useContext, useState } from 'react';

interface ModalAlteraSenhaProps {
  onSubmit: () => void;
}


export default function AlterarSenha(props: ModalAlteraSenhaProps) {

  const { user } = useContext(AuthContext);

  const [dados, setDados] = useState({
    senhaAntiga: '',
    novaSenha: '',
    confirmacao: ''
  });

  const [data, setData] = useState({
    senhaAntiga: '',
    novaSenha: '',
    email: user?.email,
    service: 'alterarSenha'
  });

  async function alterarSenha() {
    // Define a mensagem que vai aparecer para o usuário
    var conteudo = '';

    //Checa se todos campos foram preenchidos
    if (dados.senhaAntiga == '' || dados.novaSenha == '' || dados.confirmacao == '') {
      conteudo = 'Preencha todos os campos para continuar!';
    }

    //Checa se a nova senha é igual a confirmação de nova senha
    else if (dados.confirmacao !== dados.novaSenha) {
      conteudo = 'A confirmação de senha e a nova senha precisam ser iguais!';
    }

    else {
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
      <form className={style.formStyle}>
        <div className={style.inputFormat}>
          Senha atual
          <input
            type="password"
            className={style.primaryInputStyle}
            placeholder="Senha Atual"
            onChange={(e) => (dados.senhaAntiga = e.target.value)}
          />
        </div>
        <div className={style.inputFormat}>
          Nova Senha
          <input
            type="text"
            className={style.primaryInputStyle}
            placeholder="Nova Senha"
            onChange={(e) => (dados.novaSenha = e.target.value)}
          />
        </div>
        <div className={style.inputFormat}>
          Confirme a nova Senha
          <input
            type="text"
            className={style.primaryInputStyle}
            placeholder="Digite novamente a nova senha"
            onChange={(e) => (dados.confirmacao = e.target.value)}
          />
        </div>
      </form>
      <div>
        <button aria-label='Alterar Senha' className={styles.salvarAlt} onClick={alterarSenha}>
          Alterar Senha
        </button>

      </div>
    </>
  );
}
