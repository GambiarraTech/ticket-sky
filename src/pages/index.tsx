import { useState } from 'react';
import * as router from '../pages/api/router';
// plano: com base no método a gente vai diferenciar as funções dentro da api (if req.method =='post') ai por exemplo.
// se for post com base no que é passado dentro do body, ele vai montar o sql la dentro, exemplo, se passar um id, adicionar uma
// comwhere id = "valor passado". so que no api a gente só usa para identificar o methodo e fzr o destructuring no valores.

export default function Home() {
  const [cliente] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    cpf: '',
    service: ''
  });

  function cadastroCliente(e: any){

    cliente.service = e.target.name

    router.apiPost(cliente, 'cliente')
  }

  return (
    <div>
      <input type="text" placeholder="Nome" onChange={(e) => (cliente.nome = e.target.value)} />
      <input type="text" placeholder="Sobrenome" onChange={(e) => (cliente.sobrenome = e.target.value)} />
      <input type="email" placeholder="Email" onChange={(e) => (cliente.email = e.target.value)} />
      <input type="password" placeholder="Senha" onChange={(e) => (cliente.senha = e.target.value)} />
      <input type="text" placeholder="Cpf" onChange={(e) => (cliente.cpf = e.target.value)} />

      <button name="cadastroCliente" onClick={cadastroCliente}>Cadastrar-se</button>

      <p className="teste">
        Hello world!
      </p>
    </div>
  );
}
