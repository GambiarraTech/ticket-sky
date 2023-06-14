import { AuthContext } from '@/contexts/AuthContext';
import { apiGet, apiPost } from '@/pages/api/router';
import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styles from '../../styles/promoter/carousel.module.css';

/**
 * Props do componente `Carousel`.
 */
interface CarouselProps {
  title?: String;
  page?: String;
  category?: String;
}

function handleClick(id: any, role: any, isLogged: boolean) {
  //user.role está sempre promoter!
  console.log(role)
  //recebe a tela do 'page' quando chama o carrosel
  if(isLogged && role == 'promoter'){
    window.location.href = 'telaeventopromoter/' + id
}
 else{
     window.location.href = 'telaevento/' + id
    
   }
 
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

/**
 * Componente de carrossel de eventos.
 */
export default function Carousel({ title, page, category }: CarouselProps) {
  const { user, isLogged } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [titulo, setTitulo] = useState<String | null>();
  let carousel = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let isMounted = true;

    setTitulo(title);
    if (category) {
      setTitulo(category + 's');
    }

    if (category) {
      if (isLogged && user.role === 'promoter') {
        apiPost({ service: category }, `evento?id=${user.id}`).then((value) => {
          if (isMounted) {
            setData(value.result);
          }
        });
      } else {
        apiPost({ service: category }, 'evento').then((value) => {
          if (isMounted) {
            setData(value.result);
          }
        });
      }
    } else {
      if (isLogged && user.role === 'promoter') {
        apiGet(`evento?id=${user.id}`).then((value) => {
          if (isMounted) {
            setData(value.result);
          }
        });
      } else {
        apiGet('evento').then((value) => {
          if (isMounted) {
            setData(value.result);
          }
        });
      }
    }

    return () => {
      isMounted = false;
    };
  }, [isLogged, user, category]);

  /**
   * Manipulador de clique no botão de rolagem para a esquerda.
   * @param e - O evento de clique.
   */
  const handleLeftClick = (e: any) => {
    e.preventDefault();
    if (carousel.current != null) {
      carousel.current.scrollLeft -= (document.getElementById('itemID')!.getBoundingClientRect().width + 20) * 3;
    }
  };

  /**
   * Manipulador de clique no botão de rolagem para a direita.
   * @param e - O evento de clique.
   */
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
          <p>{titulo}</p>
        </div>
        {data.length <= 4 ? (
          <div id="buttons" className={styles.buttonsInative}>
            <div>
              <button>
                <IoIosArrowBack size="32" color="#e5e7eb" />
              </button>
            </div>
            <div>
              <button>
                <IoIosArrowForward size="32" color="#e5e7eb" />
              </button>
            </div>
          </div>
        ) : (
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
        )}
      </div>
      <div className={styles.container}>
        <div className={styles.carousel} ref={carousel}>
          {data.map((item) => {
            const { id, id_evento, evnome, descricao, banner, data_hora, bairro, rua, numero } = item;
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
                onClick={() => handleClick(id_evento, user.role, isLogged)}
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
