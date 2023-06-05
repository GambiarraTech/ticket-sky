import Footer from '@/components/Footer';
import Carousel from '@/components/promoter/Carousel';
import NavbarPromoter from '@/components/promoter/NavbarPromoter';
import { getServerSideProps } from '@/lib/auth';
import styles from '@/styles/promoter/home.module.css';
import { useState } from 'react';
import { apiGet } from '../api/router';



export default function Home() {
    const [eventos, setEventos] = useState([]);
    const [teste, setTeste] = useState(true);

    apiGet('evento').then((value) => {
        setEventos(value.result);
        if(!eventos){

            setTeste(false)
        }
    });


  return (
    <>
      <NavbarPromoter />
        <p className={styles.title}>Meus Eventos</p>
        <p className={styles.msg}>{teste ? "" : 'Nenhum Evento Cadastrado'}</p>
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
