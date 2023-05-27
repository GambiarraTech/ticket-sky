import { apiGet } from '@/pages/api/router';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styles from '../../styles/promoter/carousel.module.css';

interface CarouselProps {
  title?: String;
  page?: String;
}

const handleClick = (page: any) => {
  return (
    <Link href={`/${page}`}>
      <a>Texto do link</a>
    </Link>
  );
};

export default function Carousel({ title, page }: CarouselProps) {
  const [data, setData] = useState([]);
  let carousel = useRef<HTMLInputElement>(null);

  useEffect(() => {
    apiGet('evento').then((value) => {
      setData(value.result);
    });
  }, []);

  const handleLeftClick = (e: any) => {
    e.preventDefault();
    if (carousel.current != null) {
      carousel.current.scrollLeft -= (document.getElementById('itemID')!.getBoundingClientRect().width + 20) * 3;
    }
  };

  const handleRightClick = (e: any) => {
    e.preventDefault();
    if (carousel.current != null) {
      carousel.current.scrollLeft += (document.getElementById('itemID')!.getBoundingClientRect().width + 20) * 3;
    }
  };

  if (!data || !data.length) return null;

  return (
    <div className={styles.column}>
      <div className={styles.titleAndButtons}>
        <div>
          <p>{title}</p>
        </div>
        <div className={styles.buttons}>
          <div>
            <button onClick={handleLeftClick}>
              <IoIosArrowBack size="32" />
            </button>
          </div>
          <div>
            <button onClick={handleRightClick}>
              <IoIosArrowForward size="32" />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.carousel} ref={carousel}>
          {data.map((item) => {
            const { id, descricao, banner, data_hora, nome, bairro, rua, number } = item;
            const url = 'data:image/png;base64,' + banner;
            return (
              <div id="itemID" className={styles.item} key={id}>
                <Link href={`/${page}`} key={id}>
                  <div className={styles.image}>
                    <Image src={url} alt={descricao} height="260" width="420" />
                  </div>
                  <div className={styles.info}>
                    <span className={styles.date}>{data_hora}</span>
                    <span className={styles.name}>{descricao}</span>
                    <span className={styles.address}>
                      {bairro}, {rua}, {number}
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
