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
          buttonText={'Cadastrar'}
          service="cadastroPromoter"
          endPoint="promoter"
        />
      </div>
      <Footer />
    </div>
  );
}
