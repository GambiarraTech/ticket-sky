import CustomModal from '@/components/CustomModal';
import Card from '@/components/admin/Card';
import { IPromotersProps } from '@/pages/admin/promoters';
import * as router from '@/pages/api/router';
import { apiPost } from '@/pages/api/router';
import styles from '@/styles/admin/CardAprovarPromoter.module.css';
import { useEffect, useRef, useState } from 'react';
import { FaUserClock } from 'react-icons/fa';
import { HiXMark } from 'react-icons/hi2';
import { IoIosArrowBack, IoIosArrowForward, IoMdCheckmark } from 'react-icons/io';

/**
 * Função assíncrona que envia um email para um promoter com base no seu status.
 * @param emailPromoter - O email do promoter.
 * @param status - O status do promoter (1 - Aprovado, 2 - Recusado).
 */
async function enviaEmail(emailPromoter: string, status: number) {
  let data;
  const res = router.apiPost(
    {
      destinatario: emailPromoter,
      assunto: 'Confirmação de cadastro - Status Atualizado',
      mensagem:
        status == 1
          ? 'Seu Cadastro como Promoter foi Aprovado! Agora você pode acessar a Área Promoter para promover seus eventos!'
          : 'Infelizmente seu Cadastro Promoter foi Recusado :( Você pode atualizar seus dados de Promoter e tentar realizar o cadastro novamente!',
      anexos: null,
    },
    'services/emailService'
  );
  res.then((value) => {});
}

/**
 * Componente para aprovar ou reprovar promoters aguardando aprovação.
 */
export default function CardAprovarPromoter() {
  const [promotersNaoAprovados, setData] = useState<IPromotersProps[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [promoterData, setDataPromoter] = useState<IPromotersProps>();
  let carousel = useRef<HTMLInputElement>(null);

  /**
   * Função para obter promoters aguardando aprovação.
   */
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

  /**
   * Função para aprovar um promoter.
   * @param id - O ID do promoter.
   * @param email - O email do promoter.
   */
  function aprovarPromoter(id: number, email: string) {
    apiPost({ idPromoter: id, service: 'aprovarPromoter' }, 'promoter').then(() => {
      enviaEmail(email, 1);
      getPromotersAguardandoAprov();
    });
  }

  /**
   * Função para reprovar um promoter.
   * @param id - O ID do promoter.
   * @param email - O email do promoter.
   */
  function reprovarPromoter(id: number, email: string) {
    apiPost({ idPromoter: id, service: 'reprovarPromoter' }, 'promoter').then(() => {
      enviaEmail(email, 2);
      getPromotersAguardandoAprov();
    });
  }

  /**
   * Manipulador de clique para o botão de rolagem à esquerda.
   * @param e - O evento de clique.
   */
  const handleLeftClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (carousel.current != null) {
      carousel.current.scrollLeft -= (document.getElementById('itemID')!.getBoundingClientRect().width + 16) * 3;
    }
  };

  /**
   * Manipulador de clique para o botão de rolagem à direita.
   * @param e - O evento de clique.
   */
  const handleRightClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (carousel.current != null) {
      carousel.current.scrollLeft += (document.getElementById('itemID')!.getBoundingClientRect().width + 16) * 3;
    }
  };

  if (promotersNaoAprovados.length === 0) {
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
        label="Promoters Aguardando Aprovação"
        content={
          <div className={styles.container}>
            <div className={styles.allContentContainer}>
              <div id="allContentID" className={styles.allContent} ref={carousel}>
                {promotersNaoAprovados.map((promoter, index) => {
                  return (
                    <div
                      id="itemID"
                      className={styles.item}
                      style={index === promotersNaoAprovados.length - 1 ? {} : { borderRightWidth: '1px' }}
                      key={promoter.id}
                    >
                      <div className={styles.contentItem}>
                        <div
                          className={styles.infoItem}
                          onClick={() => {
                            setDataPromoter(promoter);
                            setOpenModal(true);
                          }}
                        >
                          <div className={styles.txt}>
                            <div className={styles.txtImg}>
                              <FaUserClock size={60} />
                            </div>
                            <div>{`${promoter.nome}`}</div>
                          </div>
                        </div>
                        <div className={styles.buttons}>
                          <div className={styles.buttonAprovar}>
                            <IoMdCheckmark
                              color="white"
                              size={30}
                              onClick={() => aprovarPromoter(promoter.id, promoter.email)}
                            ></IoMdCheckmark>
                          </div>
                          <div className={styles.buttonReprovar}>
                            <HiXMark
                              color="white"
                              size={30}
                              onClick={() => reprovarPromoter(promoter.id, promoter.email)}
                            ></HiXMark>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {promotersNaoAprovados.length > 3 ? (
              <div className={styles.buttonsScroll}>
                <button onClick={handleLeftClick}>
                  <IoIosArrowBack size="20" />
                </button>
                <button onClick={handleRightClick}>
                  <IoIosArrowForward size="20" />
                </button>
              </div>
            ) : (
              <div className={styles.buttonsScrollInative}>
                <button>
                  <IoIosArrowBack size="20" color="#9ca3af" />
                </button>
                <button>
                  <IoIosArrowForward size="20" color="#9ca3af" />
                </button>
              </div>
            )}
            <CustomModal
              isOpen={openModal}
              onClose={() => setOpenModal(false)}
              haveClose={true}
              haveWarning={false}
              haveAvatar={false}
              title={'Promoter'}
            >
              <div className={styles.txt}>
                <div>{`Nome: ${promoterData?.nome}`}</div>
                <div>{`Email: ${promoterData?.email}`}</div>
                <div>{`CPF/CNPJ: ${promoterData?.cpf_cnpj}`}</div>
              </div>

              <div className={styles.buttonsModal}>
                <div className={styles.buttonAprovar}>
                  <IoMdCheckmark
                    color="white"
                    size={30}
                    onClick={() => {
                      aprovarPromoter(promoterData!.id, promoterData!.email);
                      setOpenModal(false);
                    }}
                  ></IoMdCheckmark>
                </div>
                <div className={styles.buttonReprovar}>
                  <HiXMark
                    color="white"
                    size={30}
                    onClick={() => {
                      reprovarPromoter(promoterData!.id, promoterData!.email);
                      setOpenModal(false);
                    }}
                  ></HiXMark>
                </div>
              </div>
            </CustomModal>
          </div>
        }
      />
    );
  }
}
