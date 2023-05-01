import { useCallback, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import * as router from '../../pages/api/router';
import { LogoModal } from './LogoModal';

interface LoginModalProps {
  showModal: boolean;
  handleClick: () => void;
}

export const SignInModal = ({ showModal, handleClick }: LoginModalProps) => {
  const [variant, setVariant] = useState('signIn');

  const changeVariant = useCallback(() => {
    setVariant((currentvariant) => (currentvariant === 'signIn' ? 'signUp' : 'signIn'));
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClick();
  };

  const [cliente, setCliente] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
  });

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            onClick={handleClick}
            className="fixed inset-0 w-full h-full bg-[#000000] opacity-40"
            aria-hidden="true"
          ></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-[#ffffff] rounded-lg shadow-lg">
              <div className="flex justify-end">
                <button onClick={handleClick} className="p-2 text-[#808080] rounded-lg hover:bg-[#e2e8f0]">
                  <span className="sr-only">Fechar</span>
                  <IoClose />
                </button>
              </div>
              <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
                <h3 className="flex flex-1 justify-center">
                  <LogoModal />
                </h3>
                <h4 className="text-lg font-medium text-[#2d3748]">
                  {variant === 'signIn' ? 'Faça Login' : 'Faça seu Cadastro'}
                </h4>
                <p className="text-[15px] text-[#718096]">
                  Bem-vindo ao TicketSky, preencha os campos abaixo para continuar.
                </p>
                <form onSubmit={handleLogin}>
                  <div className="relative">
                    {variant === 'signUp' && (
                      <div className="flex flex-row gap-3">
                        <input
                          className="w-2/4 my-3 pl-3 pr-3 py-2 text-[#718096] bg-transparent outline-none border-[1px] rounded-lg shadow-sm"
                          placeholder="Nome"
                          type="text"
                          onChange={(e) => (cliente.nome = e.target.value)}
                        />
                        <input
                          className="w-2/4 my-3 pl-3 pr-3 py-2 text-[#718096] bg-transparent outline-none border-[1px] rounded-lg shadow-sm"
                          placeholder="Sobrenome"
                          type="text"
                          onChange={(e) => (cliente.sobrenome = e.target.value)}
                        />
                      </div>
                    )}
                    <input
                      className="w-full my-3 pl-3 pr-3 py-2 text-[#718096] bg-transparent outline-none border-[1px] rounded-lg shadow-sm"
                      placeholder="E-mail"
                      type="email"
                      onChange={(e) => (cliente.email = e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <input
                      className="w-full my-3 pl-3 pr-3 py-2 text-[#718096] bg-transparent outline-none border-[1px] rounded-lg shadow-sm"
                      placeholder="Senha"
                      type="password"
                      onChange={(e) => (cliente.senha = e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => router.apiPost(cliente, 'cliente')}
                    className="block w-full mt-3 py-3 px-4 text-[#ffffff] text-sm text-center bg-[#0013a6] hover:bg-[#0028be] rounded-lg"
                  >
                    {variant === 'signIn' ? 'Fazer Login' : 'Cadastre-se'}
                  </button>
                  <p className="flex justify-center text-black mt-5">
                    {variant === 'signIn' ? 'Primeiro Acesso?' : 'Já Possui uma Conta?'}
                    <span onClick={changeVariant} className="text-[#000d67]  ml-1 hover:underline cursor-pointer">
                      {variant === 'signIn' ? 'Criar Conta' : 'Fazer Login'}
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
