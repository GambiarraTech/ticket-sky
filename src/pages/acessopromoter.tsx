import { Inter } from "next/font/google";
import Head from "next/head";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Image from "next/image";

const font = Inter({subsets: ["latin"], weight: "500"})

export default function PromoterSignUp () {
  return (
    <main className={`w-full h-screen flex flex-col items-center justify-center bg-[#0013a6] sm:px-4 ${font.className}`}>
      <Head>
        <title>Cadastro de Promoter</title>
      </Head>
      <div className="w-full space-y-6 text-[#4b5563] sm:max-w-md">
        <a href="http://localhost:3000/">
          <AiOutlineArrowLeft size="50" className="absolute top-10 left-10 rounded-lg text-[#f5f5f5]"/>
        </a>
        <div className="text-center">
          <Image
            className="mx-auto"
            src="/images/logo-complete-white.png"
            alt=""
            height="150"
            width="150"
          />
          <div className="mt-5 space-y-2">
            <h3 className="text-[#ffffff] text-2xl font-bold sm:text-3xl">Torne-se Promoter</h3>
          </div>
        </div>

        <div className="bg-[#ffffff] shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          <form
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="font-medium">
                CPF ou CNPJ:
              </label>
              <input 
                className="w-full my-3 pl-3 pr-3 py-2 text-[#718096] bg-transparent outline-none border-[1px] rounded-lg shadow-sm"
                required
                type="text" 
              />
            </div>

            <div>
              <label className="font-medium">
                Nome:
              </label>
              <input 
                className="w-full my-3 pl-3 pr-3 py-2 text-[#718096] bg-transparent outline-none border-[1px] rounded-lg shadow-sm"
                required
                type="text" 
              />
            </div>

            <div>
              <label className="font-medium">
                E-mail:
              </label>
              <input 
                className="w-full my-3 pl-3 pr-3 py-2 text-[#718096] bg-transparent outline-none border-[1px] rounded-lg shadow-sm"
                required
                type="email" 
              />
            </div>

            <div>
              <label className="font-medium">
                Senha:
              </label>
              <input 
                className="w-full my-3 pl-3 pr-3 py-2 text-[#718096] bg-transparent outline-none border-[1px] rounded-lg shadow-sm"
                required
                type="password" 
              />
            </div>

            <button className="w-full py-3 px-4 font-medium text-[#ffffff] text-sm text-center bg-[#0013a6] hover:bg-[#0028be] rounded-lg">
              Solicitar Acesso Promoter
            </button>
          </form>

        </div>
      </div>
    </main>
  )
}