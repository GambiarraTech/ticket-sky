import Footer from '@/components/Footer';
import Carousel from '@/components/promoter/Carousel';
import NavbarPromoter from '@/components/promoter/NavbarPromoter';
import { AuthContext } from '@/contexts/AuthContext';
import { getServerSideProps } from '@/lib/auth';
import { apiGet } from '@/pages/api/router';
import styles from '@/styles/promoter/home.module.css';
import { useContext, useEffect, useState } from 'react';

/**
 * Componente para a página inicial do promoter.
 */
export default function Home() {
  const [eventos, setEventos] = useState([]);
  let condicaoEventos: boolean;
  const { user, isLogged } = useContext(AuthContext);

  useEffect(() => {
    // Carrega os eventos do promoter ao carregar o componente ou quando o usuário é alterado
    if (isLogged && user.role == 'promoter') {
      apiGet(`evento?id=${user.id}`).then((value) => {
        setEventos(value.result);
      });
    }
  }, [user]);

  // Verifica se há eventos cadastrados ou não
  if (!eventos) {
    condicaoEventos = true;
  } else {
    condicaoEventos = false;
  }

  return (
    <div className={styles.box}>
      <NavbarPromoter />
      <p className={styles.title}>Meus Eventos</p>
      <p className={styles.msg}>{condicaoEventos ? 'Nenhum evento cadastrado' : ''}</p>
      <div>
        <Carousel />
      </div>
      <div className={styles.foter}>
        <Footer color="white" />
      </div>
    </div>
  );
}
export { getServerSideProps };
