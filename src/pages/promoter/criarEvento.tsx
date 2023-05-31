import InputSelect from '@/components/InputSelect';
import { AuthContext } from '@/contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';

import NavbarPromoter from '@/components/promoter/NavbarPromoter';
import Dropzone from '../../components/promoter/Dropzone';
import style from '../../styles/promoter/criarEvento.module.css';
import * as router from '../api/router';

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
    pista: 0,
    backstage: 0,
    service: '',
    imagem: '',
  });

  const [selectedFile, setSelectedFile] = useState<File>();

  const { user } = useContext(AuthContext);

  function convertByteArrayToString(byteArray: number[]): string {
    const chunkSize = 65536; // Tamanho do chunk (ajuste conforme necessário)
    let byteString = '';

    for (let i = 0; i < byteArray.length; i += chunkSize) {
      const chunk = byteArray.slice(i, i + chunkSize);
      byteString += String.fromCharCode.apply(null, chunk);
    }

    return byteString;
  }

  function clearErrorMessage() {
    setErrorMessage('');
    setSuccessMessage('');
  }

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
    <>
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
          </div>

          <div className={style.partes}>
            <div className={style.campo}>
              Categoria:
              <InputSelect endpoint="categoria" onItemSelected={setCategoria} />
            </div>
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
              rua:
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
              numero:
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
          </div>

          <div className={style.partes}>
            <div className={style.campo}>
              Banner do evento:
              <Dropzone onFileUploaded={setSelectedFile} />
            </div>

            <div className={style.data}>Quantidade de ingressos disponiveis:</div>
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
                Pista:
                <input
                  className={style.input_pequeno}
                  name="pista"
                  type="number"
                  min={0}
                  required
                  onChange={(e) => {
                    evento.pista = Number(e.target.value);
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
            </div>
          </div>
        </div>
        {errorMessage && <div className={style.mensagemErro}>{errorMessage}</div>}
        {successMessage && <div className={style.mensagemSucesso}>{successMessage}</div>}
        <button className={style.button} name="criarEvento" onClick={criarEvento}>
          Criar evento
        </button>
      </div>
    </>
  );
}
