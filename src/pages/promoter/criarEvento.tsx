import { AuthContext } from '@/contexts/AuthContext';
import { getServerSideProps } from '@/lib/auth';
import { useContext, useState } from 'react';
import Dropzone from '../../components/promoter/Dropzone';
import NavBar from '../../components/promoter/NavBar';
import style from '../../styles/promoter/criarEvento.module.css';
import * as router from '../api/router';

export default function CriarEvento() {
  const [evento, setEvento] = useState({
    promoter: '',
    nome: '',
    cidade: '',
    bairro: '',
    cep: '',
    categoria: '',
    local: '',
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

  //* const { user, logout, autenticar } = useContext(AuthContext);
  //* autenticar('/promoter/cadastro');

  const { user } = useContext(AuthContext);

  async function criarEvento(e: any) {
    evento.service = e.target.name;
    evento.promoter = user.id;
    if (selectedFile) {
      const imgBlob: Blob = selectedFile!;
      var reader = new FileReader();
      reader.readAsDataURL(imgBlob);
      reader.onloadend = function () {
        var base64data = reader.result;
        if (typeof base64data === 'string') {
          evento.imagem = base64data;
        }
      };
    }

    console.log(evento);

    router.apiPost(evento, 'evento').then((value) => {});
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
              <input
                className={style.input}
                name="cidade"
                type="text"
                required
                onChange={(e) => {
                  evento.cidade = e.target.value;
                }}
              />
            </div>

            <div className={style.campo}>
              Cidade:
              <input
                className={style.input}
                name="cidade"
                type="text"
                required
                onChange={(e) => {
                  evento.cidade = e.target.value;
                }}
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
              <input
                className={style.input}
                name="categoria"
                type="text"
                required
                onChange={(e) => {
                  evento.categoria = e.target.value;
                }}
                maxLength={245}
              />
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
