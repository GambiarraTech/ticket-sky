import { AuthContext } from '@/contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';

import Footer from '@/components/Footer';
import InputSelect from '@/components/InputSelect';
import NavbarPromoter from '@/components/promoter/NavbarPromoter';
import Dropzone from '../../components/promoter/Dropzone';
import style from '../../styles/promoter/criarEvento.module.css';
import { IAdminProps } from '../admin/administradores';
import * as router from '../api/router';

/**
 * Componente para criar um novo evento.
 */
export default function CriarEvento() {
  const [estados, setEstados] = useState<{ nome: string; uf: string }[]>([]);
  const [cidades, setCidades] = useState<{ nome: string }[]>([]);
  const [categoria, setCategoria] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    router
      .apiGet('estado')
      .then((data) => {
        setEstados(data.result);
      })
      .catch((error) => {
        console.error('Erro ao obter os estados:', error);
      });
  }, []);

  const [evento, setEvento] = useState({
    promoter: '',
    nome: '',
    estado: '',
    cidade: '',
    bairro: '',
    cep: '',
    categoria: 0,
    local: '',
    rua: '',
    numero: '',
    data: '',
    hora: '',
    descricao: '',
    vip: 0,
    backstage: 0,
    camarote: 0,
    service: '',
    preco_vip: 0,
    preco_backstage: 0,
    preco_camarote: 0,
    imagem: '',
  });

  const [selectedFile, setSelectedFile] = useState<File>();

  const { user } = useContext(AuthContext);

  /**
   * Converte um array de bytes em uma string.
   * @param byteArray O array de bytes a ser convertido.
   * @returns A string resultante da conversão.
   */
  function convertByteArrayToString(byteArray: number[]): string {
    const chunkSize = 65536; // Tamanho do chunk (ajuste conforme necessário)
    let byteString = '';

    for (let i = 0; i < byteArray.length; i += chunkSize) {
      const chunk = byteArray.slice(i, i + chunkSize);
      byteString += String.fromCharCode.apply(null, chunk);
    }

    return byteString;
  }

  /**
   * Limpa as mensagens de erro e sucesso.
   */
  function clearErrorMessage() {
    setErrorMessage('');
    setSuccessMessage('');
  }

  const [admins, setAdmins] = useState<IAdminProps[]>([]);
  useEffect(() => {
    router
      .apiPost({ service: 'getAdmins' }, 'admin')
      .then((data) => {
        const adminsData = data.admins;
        setAdmins(adminsData);
      })
      .catch((error) => {
        console.error('Erro ao obter os administradores:', error);
      });
  }, []);

  async function enviaEmail(evento: any) {
    if (admins.length > 0) {
      admins.map((admin) => {
        const res = router.apiPost(
          {
            destinatario: admin.email,
            assunto: 'Criação de Evento',
            mensagem: `O evento ${evento.nome} foi criado! `,
            anexos: null,
          },
          'services/emailService'
        );
        res.then((value) => {});
      });
    }
  }

  /**
   * Cria um novo evento.
   * @param e O evento do formulário.
   */
  async function criarEvento(e: any) {
    e.preventDefault();

    if (
      evento.nome === '' ||
      evento.estado === '' ||
      evento.cidade === '' ||
      evento.bairro === '' ||
      evento.cep === '' ||
      evento.local === '' ||
      evento.rua === '' ||
      evento.numero === '' ||
      evento.data === '' ||
      evento.hora === '' ||
      evento.descricao === ''
    ) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    evento.service = e.target.name;
    evento.promoter = user.id;
    evento.categoria = categoria;

    if (selectedFile) {
      const imgBlob: Blob = selectedFile!;
      const reader = new FileReader();

      reader.onloadend = function () {
        if (reader.readyState === FileReader.DONE) {
          const arrayBuffer = reader.result as ArrayBuffer;
          const uintArray = new Uint8Array(arrayBuffer);
          const byteArray = Array.from(uintArray);

          const byteString = convertByteArrayToString(byteArray);
          const base64data = btoa(byteString);

          evento.imagem = base64data;

          router
            .apiPost(evento, 'evento')
            .then((value) => {
              setSuccessMessage('Evento criado com sucesso!');
              setErrorMessage('');
              enviaEmail(evento);
            })
            .catch((error) => {
              setErrorMessage('Erro ao criar evento: ' + error);
              setSuccessMessage('');
            });
        }
      };

      reader.readAsArrayBuffer(imgBlob);
    }
  }

  async function handleEstado(e: any) {
    evento.estado = e.target.value;

    const response = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${evento.estado}/municipios`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const cidades = await response.json();

    setCidades(cidades);
  }
  return (
    <div className={style.container}>
      <NavbarPromoter />
      <div className={style.header}>
        <div className={style.title}>Criar Evento</div>
        <div className={style.formulario}>
          <div className={style.partes}>
            <div className={style.campo}>
              Nome do evento:
              <input
                className={style.input}
                name="nome"
                type="text"
                required
                onChange={(e) => {
                  evento.nome = e.target.value;
                  clearErrorMessage();
                }}
              />
            </div>

            <div className={style.campo}>
              CEP:
              <input
                className={style.input}
                name="cep"
                type="text"
                id="cep"
                pattern="[0-9]+"
                maxLength={8}
                minLength={8}
                required
                onChange={(e) => {
                  evento.cep = e.target.value;
                  clearErrorMessage();
                }}
              ></input>
            </div>

            <div className={style.campo}>
              Estado:
              <select
                className={style.select}
                onChange={(e) => {
                  handleEstado(e);
                  clearErrorMessage();
                }}
              >
                <option selected disabled hidden>
                  {' '}
                  Estado{' '}
                </option>
                {estados.map((estado) => (
                  <option key={estado.uf} value={estado.uf}>
                    {estado.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className={style.campo}>
              Cidade:
              <select
                className={style.select}
                onChange={(e) => {
                  evento.cidade = e.target.value;
                  clearErrorMessage();
                }}
              >
                <option selected disabled hidden>
                  {' '}
                  Cidade{' '}
                </option>
                {cidades.map((cidades) => (
                  <option key={cidades.nome} value={cidades.nome}>
                    {cidades.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={style.partes}>
            <div className={style.campo}>
              Nome do local:
              <input
                className={style.input}
                name="local"
                type="text"
                required
                onChange={(e) => {
                  evento.local = e.target.value;
                  clearErrorMessage();
                }}
                maxLength={245}
              />
            </div>

            <div className={style.campo}>
              Bairro:
              <input
                className={style.input}
                name="bairro"
                type="text"
                required
                onChange={(e) => {
                  {
                    evento.bairro = e.target.value;
                    clearErrorMessage();
                  }
                }}
                maxLength={245}
              />
            </div>

            <div className={style.campo}>
              Rua:
              <input
                className={style.input}
                name="rua"
                type="text"
                required
                onChange={(e) => {
                  evento.rua = e.target.value;
                  clearErrorMessage();
                }}
              />
            </div>

            <div className={style.campo}>
              Número:
              <input
                className={style.input}
                name="numero"
                type="text"
                required
                onChange={(e) => {
                  evento.numero = e.target.value;
                  clearErrorMessage();
                }}
              />
            </div>
          </div>

          <div className={style.partes}>
            <div className={style.data}>
              <div className={style.campo}>
                Data:
                <input
                  className={style.input_data}
                  name="data"
                  type="date"
                  required
                  onChange={(e) => {
                    evento.data = e.target.value;
                    clearErrorMessage();
                  }}
                />
              </div>

              <div className={style.campo}>
                Horário:
                <input
                  className={style.input_data}
                  name="hora"
                  type="time"
                  required
                  onChange={(e) => {
                    evento.hora = e.target.value;
                    clearErrorMessage();
                  }}
                />
              </div>
            </div>

            <div className={style.campo}>
              Descrição do evento:
              <textarea
                className={style.input_grande}
                name="descricao"
                required
                onChange={(e) => {
                  evento.descricao = e.target.value;
                  clearErrorMessage();
                }}
                maxLength={320}
              />
            </div>
            <div className={style.campo}>
              Categoria:
              <InputSelect endpoint="categoria" onItemSelected={setCategoria} />
            </div>
          </div>

          <div className={style.parteImagem}>
            <div></div>
            <div className={style.campo}>
              Banner do evento:
              <Dropzone onFileUploaded={setSelectedFile} />
            </div>
            <div className={style.data}>Quantidade de ingressos disponiveis:</div>
            <div>
              <div className={style.ingressos}>
                <div className={style.campo}>
                  VIP:
                  <input
                    className={style.input_pequeno}
                    name="vip"
                    type="number"
                    min={0}
                    required
                    onChange={(e) => {
                      evento.vip = Number(e.target.value);
                      clearErrorMessage();
                    }}
                  />
                </div>
                <div className={style.campo}>
                  Backstage:
                  <input
                    className={style.input_pequeno}
                    name="backstage"
                    type="number"
                    min={0}
                    required
                    onChange={(e) => {
                      evento.backstage = Number(e.target.value);
                      clearErrorMessage();
                    }}
                  />
                </div>
                <div className={style.campo}>
                  Camarote:
                  <input
                    className={style.input_pequeno}
                    name="camarote"
                    type="number"
                    min={0}
                    required
                    onChange={(e) => {
                      evento.camarote = Number(e.target.value);
                      clearErrorMessage();
                    }}
                  />
                </div>
              </div>
              <div className={style.ingressos}>
                <div className={style.campo}>
                  Preço:
                  <input
                    className={style.input_pequeno}
                    name="preco_vip"
                    type="number"
                    min={0}
                    required
                    onChange={(e) => {
                      evento.preco_vip = Number(e.target.value);
                      clearErrorMessage();
                    }}
                  />
                </div>
                <div className={style.campo}>
                  Preço:
                  <input
                    className={style.input_pequeno}
                    name="preco_backstage"
                    type="number"
                    min={0}
                    required
                    onChange={(e) => {
                      evento.preco_backstage = Number(e.target.value);
                      clearErrorMessage();
                    }}
                  />
                </div>
                <div className={style.campo}>
                  Preço:
                  <input
                    className={style.input_pequeno}
                    name="preco_camarote"
                    type="number"
                    min={0}
                    required
                    onChange={(e) => {
                      evento.preco_camarote = Number(e.target.value);
                      clearErrorMessage();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {errorMessage && <div className={style.mensagemErro}>{errorMessage}</div>}
        {successMessage && <div className={style.mensagemSucesso}>{successMessage}</div>}
        <button className={style.button} name="criarEvento" onClick={criarEvento}>
          Criar evento
        </button>
      </div>
      <Footer color="white" />
    </div>
  );
}
