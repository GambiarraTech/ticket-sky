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
      carousel.current.scrollLeft -= carousel.current.offsetWidth;
    }
  };

  const handleRightClick = (e: any) => {
    e.preventDefault();
    if (carousel.current != null) {
      carousel.current.scrollLeft += carousel.current.offsetWidth;
      console.log(carousel.current.offsetWidth);
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
          <button onClick={handleLeftClick}>
            <IoIosArrowBack size="32" />
          </button>
          <button onClick={handleRightClick}>
            <IoIosArrowForward size="32" />
          </button>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.carousel} ref={carousel}>
          {data.map((item) => {
            const { id, descricao, banner, data_hora, nome, bairro, rua, number } = item;
            const url = 'data:image/png;base64,' + banner;
            return (
              <Link href={`/${page}`} key={id}>
                <div className={styles.item} key={id}>
                  <div className={styles.image}>
                    <Image src={url} alt={nome} height="260" width="420" />
                  </div>
                  <div className={styles.info}>
                    <span className={styles.date}>{data_hora}</span>
                    <span className={styles.name}>{nome}</span>
                    <span className={styles.address}>
                      {bairro}, {rua}, {number}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
