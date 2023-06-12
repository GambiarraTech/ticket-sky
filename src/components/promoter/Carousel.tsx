import { AuthContext } from '@/contexts/AuthContext';
import { apiGet, apiPost } from '@/pages/api/router';
import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styles from '../../styles/promoter/carousel.module.css';

interface CarouselProps {
  title?: String;
  page?: String;
  category?: String;
}

function handleClick(id: any) {
  //recebe a tela do 'page' quando chama o carrosel
  const url = 'telaevento/' + id;
  //window.location.href = url;
}

function ConvertDate(data: Date, service: String) {
  if (service == 'day') {
    switch (data.getDay()) {
      case 0:
        return 'Dom';
      case 1:
        return 'Seg';
      case 2:
        return 'Ter';
      case 3:
        return 'Qua';
      case 4:
        return 'Qui';
      case 5:
        return 'Sex';
      case 6:
        return 'Sab';
      default:
        return '';
    }
  } else if (service == 'month') {
    switch (data.getMonth()) {
      case 0:
        return 'Jan';
      case 1:
        return 'Fev';
      case 2:
        return 'Mar';
      case 3:
        return 'Abr';
      case 4:
        return 'Mai';
      case 5:
        return 'Jun';
      case 6:
        return 'Jul';
      case 7:
        return 'Ago';
      case 8:
        return 'Set';
      case 9:
        return 'Out';
      case 10:
        return 'Nov';
      case 11:
        return 'Dez';
      default:
        return '';
    }
  }
}

export default function Carousel({ title, page, category }: CarouselProps) {
  const { user, isLogged } = useContext(AuthContext);
  const [data, setData] = useState([]);
  let carousel = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (category) {
      title = category + 's';

      if (isLogged && user.role == 'promoter') {
        apiPost({ service: category }, `evento?id=${user.id}`).then((value) => {
          setData(value.result);
        });
      } else {
        apiPost({ service: category }, 'evento').then((value) => {
          setData(value.result);
        });
      }
    } else {
      if (isLogged && user.role == 'promoter') {
        apiGet(`evento?id=${user.id}`).then((value) => {
          setData(value.result);
        });
      } else {
        apiGet('evento').then((value) => {
          setData(value.result);
        });
      }
    }
  }, [user]);

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

  //Esconder os botões caso o carrossel não ultrapasse a tela
  if (data.length < 4) {
    return (
      <div className={styles.column}>
        <div className={styles.titleAndButtons}>
          <div>
            <p>{title}</p>
          </div>
          <div id="buttons" className={styles.buttonsInative}>
            <div>
              <button>
                <IoIosArrowBack size="16" color="#e5e7eb" />
              </button>
            </div>
            <div>
              <button>
                <IoIosArrowForward size="16" color="#e5e7eb" />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.carousel} ref={carousel}>
            {data.map((item) => {
              const { id, evnome, descricao, banner, data_hora, bairro, rua, numero } = item;
              const url = 'data:image/png;base64,' + banner;
              const date = new Date(data_hora);
              let dia = date.getDate().toString();
              let horas = date.getHours().toString();
              let minutos = date.getMinutes().toString();
              if (date.getDate() < 10) {
                dia = date.getDate().toString().padStart(2, '0');
              }
              if (date.getHours() < 10) {
                horas = date.getHours().toString().padStart(2, '0');
              }
              if (date.getMinutes() < 10) {
                minutos = date.getMinutes().toString().padStart(2, '0');
              }
              return (
                <div
                  id="itemID"
                  className={styles.item}
                  key={id}
                  onClick={() => (window.location.href = 'telaevento/' + id)}
                >
                  <div className={styles.image}>
                    <Image src={url} alt={descricao} height="260" width="420" />
                  </div>
                  <div className={styles.info}>
                    <span className={styles.date}>
                      {ConvertDate(date, 'day')}, {dia} {ConvertDate(date, 'month')} - {horas}:{minutos}
                    </span>
                    <span className={styles.name}>{evnome}</span>
                    <span className={styles.address}>
                      {bairro}, {rua}, {numero}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.column}>
        <div className={styles.titleAndButtons}>
          <div>
            <p>{title}</p>
          </div>
          <div id="buttons" className={styles.buttons}>
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
              const { id, descricao, banner, data_hora, evnome, bairro, rua, numero } = item;
              const url = 'data:image/png;base64,' + banner;
              const date = new Date(data_hora);
              let dia = date.getDate().toString();
              let horas = date.getHours().toString();
              let minutos = date.getMinutes().toString();
              if (date.getDate() < 10) {
                dia = date.getDate().toString().padStart(2, '0');
              }
              if (date.getHours() < 10) {
                horas = date.getHours().toString().padStart(2, '0');
              }
              if (date.getMinutes() < 10) {
                minutos = date.getMinutes().toString().padStart(2, '0');
              }
              return (
                <div
                  id="itemID"
                  className={styles.item}
                  key={id}
                  onClick={() => (window.location.href = 'telaevento/' + id)}
                >
                  <div className={styles.image}>
                    <Image src={url} alt={descricao} height="260" width="420" />
                  </div>
                  <div className={styles.info}>
                    <span className={styles.date}>
                      {ConvertDate(date, 'day')}, {dia} {ConvertDate(date, 'month')} - {horas}:{minutos}
                    </span>
                    <span className={styles.name}>{evnome}</span>
                    <span className={styles.address}>
                      {bairro}, {rua}, {numero}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
