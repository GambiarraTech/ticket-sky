import Card from '@/components/admin/Card';
import { IPromotersProps } from '@/pages/admin/promoters';
import { apiPost } from '@/pages/api/router';
import styles from '@/styles/admin/CardAprovarPromoter.module.css';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaUserClock } from 'react-icons/fa';
import { HiXMark } from 'react-icons/hi2';
import { IoIosArrowBack, IoIosArrowForward, IoMdCheckmark } from 'react-icons/io';

export default function CardAprovarPromoter() {
  const [promotersNaoAprovados, setData] = useState<IPromotersProps[]>([]);
  let carousel = useRef<HTMLInputElement>(null);

  function getPromotersAguardandoAprov() {
    apiPost({ service: 'getPromotersAguardandoAprov' }, 'promoter')
      .then((data) => {
        setData(data.promoters);
      })
      .catch((error) => {
        console.error('Erro ao obter os promoters:', error);
      });
  }

  useEffect(() => {
    getPromotersAguardandoAprov();
  }, []);

  function aprovarPromoter(id: number) {
    apiPost({ idPromoter: id, service: 'aprovarPromoter' }, 'promoter').then(() => {
      getPromotersAguardandoAprov();
    });
  }

  function reprovarPromoter(id: number) {
    apiPost({ idPromoter: id, service: 'reprovarPromoter' }, 'promoter').then(() => {
      getPromotersAguardandoAprov();
    });
  }

  const handleLeftClick = (e: any) => {
    e.preventDefault();
    if (carousel.current != null) {
      carousel.current.scrollLeft -= (document.getElementById('itemID')!.getBoundingClientRect().width + 16) * 3;
    }
  };

  const handleRightClick = (e: any) => {
    e.preventDefault();
    if (carousel.current != null) {
      carousel.current.scrollLeft += (document.getElementById('itemID')!.getBoundingClientRect().width + 16) * 3;
    }
  };

  if (promotersNaoAprovados.length == 0) {
    return (
      <Card
        label="Promoters Aguardando Aprovação"
        content={
          <div className={styles.txtNullPromoters}>
            <p>Nenhum promoter aguardando aprovação.</p>
          </div>
        }
      />
    );
  } else {
    return (
      <Card
        label="Promoters aguardando aprovação"
        content={
          <div className={styles.container}>
            <div className={styles.allContentContainer}>
              <div id="allContentID" className={styles.allContent} ref={carousel}>
                {promotersNaoAprovados.map((promoter) => {
                  return (
                    <div id="itemID" className={styles.item} key={promoter.id}>
                      <div className={styles.contentItem}>
                        <Link href={`/`}>
                          <div className={styles.txt}>
                            <div className={styles.txtImg}>
                              <FaUserClock size={60} />
                            </div>
                            <div>{`Nome: ${promoter.nome}`}</div>
                          </div>
                        </Link>
                        <div className={styles.buttons}>
                          <div className={styles.buttonAprovar}>
                            <IoMdCheckmark
                              color="white"
                              size={30}
                              onClick={() => aprovarPromoter(promoter.id)}
                            ></IoMdCheckmark>
                          </div>
                          <div className={styles.buttonReprovar}>
                            <HiXMark color="white" size={30} onClick={() => reprovarPromoter(promoter.id)}></HiXMark>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.buttonsScroll}>
              <button onClick={handleLeftClick}>
                <IoIosArrowBack size="20" />
              </button>
              <button onClick={handleRightClick}>
                <IoIosArrowForward size="20" />
              </button>
            </div>
          </div>
        }
      />
    );
  }
}
