import Footer from '@/components/admin/Footer';
import FormCard from '@/components/FormCard';
import styles from '@/styles/promoter/cadastro.module.css';
import Image from 'next/image';

const listaInputs = [
  { id: 'nome', label: 'Digite seu nome:' },
  { id: 'email', label: 'Digite seu email:' },
  { id: 'senha', label: 'Digite sua senha:' },
  { id: 'cpf_cnpj', label: 'Digite seu CPF ou CNPJ:' },
];

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
