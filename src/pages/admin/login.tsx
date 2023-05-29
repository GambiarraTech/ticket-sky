import Footer from '@/components/admin/Footer';
import FormCard from '@/components/FormCard';
import styles from '@/styles/promoter/areaPromoter.module.css';
import Image from 'next/image';

const listaInputs = [
  { id: 'email', label: 'Digite seu email:', length: 50 },
  { id: 'senha', label: 'Digite sua senha:', length: 30 },
];

export default function Login() {
  return (
    <div className={styles.box}>
      <div className={styles.background}>
        <div className={styles.container}>
          <Image src="/images/logo-ticket-sky-light-cropped.png" width="200" height="200" alt="logo"></Image>
          <FormCard
            titulo={'Login Administrador'}
            inputs={listaInputs}
            buttonText={'Entrar'}
            service="loginAdmin"
            errorMessage="Usuário ou senha incorreta."
            endPoint="admin"
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}
