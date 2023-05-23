import FormCard from '@/components/FormCard';
import Footer from '@/components/admin/Footer';
import styles from '@/styles/promoter/cadastro.module.css';
import Image from 'next/image';
import * as router from '../api/router';

const listaInputs = [
  { id: 'nome', label: 'Digite seu nome:' },
  { id: 'email', label: 'Digite seu email:' },
  { id: 'senha', label: 'Digite sua senha:' },
  { id: 'cpf_cnpj', label: 'Digite seu CPF ou CNPJ:' },
];

//Chamar função após dar a confirmação de cadastro na tela
async function enviaEmailConfirmacao(emailPromoter: string){
    const res = router.apiPost({    
      destinatario: emailPromoter,
      assunto: "Confirmação de cadastro", 
      mensagem: "Cadastro realizado com sucesso! Aguarde a confirmação de acesso! Não se preocupe você receberá um e-mail quando isso acontecer.",
      anexos: null
    
    }, 'services/emailService');
    res.then((value) => {
      
    });
}

export default function Cadastro() {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <Image src="/images/logo-ticket-sky-light-cropped.png" width="200" height="200" alt="logo"></Image>
        <FormCard
          titulo={'Torne-se um Promoter'}
          inputs={listaInputs}
          buttonText={'Solicitar acesso promoter'}
          service="cadastroPromoter"
          endPoint="promoter"
          errorMessage="Usuário ou senha incorreta."
          footer={{ message: 'Já possui conta? ', linkMessage: 'Fazer login ', link: '/promoter/login' }}
        />
      </div>
      <Footer />
    </div>
  );
}
