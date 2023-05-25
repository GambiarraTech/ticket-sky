import { AuthContext } from '@/contexts/AuthContext';
import { getServerSideProps } from '@/lib/auth';

import { useContext, useEffect, useState } from 'react';

import Dropzone from '../../components/promoter/Dropzone';
import NavBar from '../../components/promoter/NavBar';
import style from '../../styles/promoter/criarEvento.module.css';
import * as router from '../api/router';

export default function CriarEvento() {
  const [estados, setEstados] = useState<{ nome: string; uf: string }[]>([]);
  const [cidades, setCidades] = useState<{ nome: string }[]>([]);
  const [categorias, setCategorias] = useState<{ id: number; nome: string }[]>([]);

  useEffect(() => {
    router
      .apiGet('estado')
      .then((data) => {
        setEstados(data.result);
      })
      .catch((error) => {
        console.error('Erro ao obter os estados:', error);
      });

    router
      .apiGet('categoria')
      .then((data) => {
        setCategorias(data.result);
      })
      .catch((error) => {
        console.error('Erro ao obter os categorias:', error);
      });
  }, []);

  const [evento, setEvento] = useState({
    promoter: '',
    nome: '',
    estado: '',
    cidade: '',
    bairro: '',
    cep: '',
    categoria: '',
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

  async function criarEvento(e: any) {
    evento.service = e.target.name;
    evento.promoter = user.id;

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

          router.apiPost(evento, 'evento').then((value) => {
            // ...
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
    <NavBar>
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
                }}
              />
            </div>

            <div className={style.campo}>
              Estado:
              <select
                onChange={(e) => {
                  handleEstado(e);
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
                onChange={(e) => {
                  evento.cidade = e.target.value;
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
                }}
              ></input>
            </div>
          </div>

          <div className={style.partes}>
            <div className={style.campo}>
              Categoria:
              <select
                onChange={(e) => {
                  evento.categoria = e.target.value;
                }}
              >
                <option selected disabled hidden>
                  {' '}
                  Categoria:{' '}
                </option>
                {categorias.map((categoria) => (
                  <option key={categoria.nome} value={categoria.id}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
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
                }}
                maxLength={320}
              />
            </div>
            <button className={style.button} name="criarEvento" onClick={criarEvento}>
              Criar evento
            </button>
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
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  );
}

export { getServerSideProps };
