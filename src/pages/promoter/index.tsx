import Footer from '@/components/Footer';
import Carousel from '@/components/promoter/Carousel';
import NavbarPromoter from '@/components/promoter/NavbarPromoter';
import { AuthContext } from '@/contexts/AuthContext';
import { getServerSideProps } from '@/lib/auth';
import { apiGet } from '@/pages/api/router';
import styles from '@/styles/promoter/home.module.css';
import { useContext, useEffect, useState } from 'react';

export default function Home() {
  const [eventos, setEventos] = useState([]);
  const [teste, setTeste] = useState(false);
  const { user, isLogged } = useContext(AuthContext);

  useEffect(() => {
    if (isLogged && user.role == 'promoter') {
      apiGet(`evento?id=${user.id}`).then((value) => {
        setEventos(value.result);
      });
    }
    if (eventos.length == 0) {
      setTeste(true);
    } else {
      setTeste(false);
    }
  }, [user]);

  return (
    <>
      <NavbarPromoter />
      <p className={styles.title}>Meus Eventos</p>
      <p className={styles.msg}>{teste ? 'Nenhum Evento Cadastrado' : ''}</p>
      <div>
        <Carousel />
      </div>
      <div className={styles.foter}>
        <Footer color="white" />
      </div>
    </>
  );
}
export { getServerSideProps };
