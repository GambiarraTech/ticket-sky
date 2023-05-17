import Footer from '@/components/admin/Footer';
import FormCard from '@/components/FormCard';
import styles from '@/styles/promoter/cadastro.module.css';
import Image from 'next/image';

const listaInputs = [
  { id: 'email', label: 'Digite seu email:' },
  { id: 'senha', label: 'Digite sua senha:' },
];

export default function Login() {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <Image src="/images/logo-ticket-sky-light-cropped.png" width="200" height="200" alt="logo"></Image>
        <FormCard
          titulo={'Login Promoter'}
          inputs={listaInputs}
          buttonText={'Entrar'}
          service="loginPromoter"
          endPoint="promoter"
          footer={{ message: 'Não possui conta? ', linkMessage: 'Cadastre-se', link: '/promoter/cadastro' }}
        />
      </div>
      <Footer />
    </div>
  );
}
