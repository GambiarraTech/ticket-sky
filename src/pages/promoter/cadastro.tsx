import Footer from '@/components/Footer';
import FormCard from '@/components/FormCard';
import styles from '@/styles/promoter/areaPromoter.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import * as router from '../api/router';

const listaInputs = [
  { id: 'nome', label: 'Digite seu nome:', length: 20 },
  { id: 'email', label: 'Digite seu email:', length: 50 },
  { id: 'senha', label: 'Digite sua senha:', length: 30 },
  { id: 'cpf_cnpj', label: 'Digite seu CPF ou CNPJ:', length: 14 },
];

//Chamar função após dar a confirmação de cadastro na tela
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
  res.then((value) => { });
}

export default function Cadastro() {
  return (
    <div className={styles.box}>
      <div className={styles.background}>
        <div className={styles.botaoVoltar}>
          <Link href={'/'}>
            <AiOutlineArrowLeft size={32} color="white" />
          </Link>
        </div>
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
      </div>
      <Footer color="blue" />
    </div>
  );
}
