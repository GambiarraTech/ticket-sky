import { useState } from 'react';
import NavBar from '../../components/promoter/NavBar';
import style from '../../styles/promoter/criarEvento.module.css';

export default function CriarEvento() {
  const [evento, setEvento] = useState({
    nome: '',
    cidade: '',
    bairro: '',
    cep: '',
    categoria: '',
    local: '',
    data: '',
    hora: '',
    minuto: '',
    descricao: '',
    imagem: '',
    vip: 0,
    camarote: 0,
    backstage: 0,
  });

  const handleFormEdit = (event: any, name: string) => {
    setEvento({ ...evento, [name]: event.target.value });
    event.preventDefault();
  };

  const handleForm = (event: any) => {
    event.preventDefault();
    console.log(JSON.stringify(evento));
  };


  return (
    <NavBar>
      <div className={style.header}>
        <div className={style.title}>Criar Evento</div>
        <form className={style.formulario} onSubmit={handleForm}>
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
            </div>
            <div className={style.data}>
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
              />
            </div>
            <button className={style.button} type="submit">
              Criar evento
            </button>
          </div>

          <div className={style.partes}>
            <div className={style.campo}>
              Banner do evento:
              <input
                className={style.input_imagem}
                name="imagem"
                type="file"
                accept="image/*"
                required
                onChange={(e) => {
                  evento.imagem = e.target.value;
                }}
              />
            </div>
            <div className={style.data}>Quantidade de ingressos disponiveis:</div>
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
              Camarote:
              <input
                className={style.input_pequeno}
                name="camarote"
                type="number"
                min={0}
                required
                onChange={(e) => {
                  evento.camarote = Number(e.target.value);
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
        </form>
      </div>
    </NavBar>
  );
}
