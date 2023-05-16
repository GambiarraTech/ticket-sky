import FormCard from '@/components/promoter/FormCard';
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
          titulo={'Cadastro de Promoter'}
          inputs={listaInputs}
          buttonText={'Entrar'}
          service="cadastroPromoter"
          endPoint="promoter"
        />
      </div>
    </div>
  );
}
