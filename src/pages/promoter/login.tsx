import Footer from '@/components/admin/Footer';
import FormCard from '@/components/FormCard';
import styles from '@/styles/promoter/cadastro.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const listaInputs = [
  { id: 'email', label: 'Digite seu email:', length: 50 },
  { id: 'senha', label: 'Digite sua senha:', length: 30 },
];

export default function Login() {
  return (
    <div className={styles.box}>
        <div className={styles.background}>
        <div className={styles.botaoVoltar}>
            <Link href={'/'}>
            <AiOutlineArrowLeft size={32} color="grey" />
            </Link>
        </div>
        <div className={styles.container}>
            <Image src="/images/logo-ticket-sky-light-cropped.png" width="200" height="200" alt="logo"></Image>
            <FormCard
            titulo={'Login Promoter'}
            inputs={listaInputs}
            buttonText={'Entrar'}
            service="loginPromoter"
            endPoint="promoter"
            errorMessage="Usuário ou senha incorreta."
            footer={{ message: 'Não possui conta? ', linkMessage: 'Cadastre-se', link: '/promoter/cadastro' }}
            />
        </div>
        <Footer />
        </div>
    </div>
  );
}
