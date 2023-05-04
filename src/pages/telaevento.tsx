import CountInput from '@/components/input/CountInput'
import { NavbarCliente } from '@/components/navbar/NavbarCliente'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { MdOutlineLocationCity } from 'react-icons/md'

const font = Inter({ subsets: ['latin'], weight: '500' })

export default function TelaEvento() {
  const [quantidade, setQuantidade] = useState(1)

  function handleQtdChange(value: number) {
    setQuantidade(value)
  }

  return (
    <main className={`${font.className}`}>
      <section className="text-gray-600 body-font overflow-hidden">
        <NavbarCliente Logado={true} />
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <Image
              alt="Banner do Evento"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              width="400"
              height="400"
              src="/quadrado.png"
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest mb-3">Nome do Promoter</h2>
              <h1 className="text-blue-800 text-3xl title-font font-medium mb-1">Nome do Evento</h1>
              <div className="flex mb-4" />
              <p className="leading-relaxed">
                Aqui está a porra da descrição do krl do evento, não aguento mais esse PBL. Não aguento mais essa vida,
                meu pai do céu, eu só quero ser rico. Por que Deus? tu me fizeste pobre?
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 max-w-screen-xl border-gray-100 mb-5">
                <div className="flex-col ml-6 w-full">
                  <div className="flex flex-row gap-4 items-center ">
                    VIP
                    <CountInput valorInicial={quantidade} onChange={handleQtdChange} />
                  </div>

                  <div className="flex flex-row gap-4 items-center">
                    Pista
                    <CountInput valorInicial={quantidade} onChange={handleQtdChange} />
                  </div>

                  <div className="flex flex-row gap-4 items-center">
                    Camarote
                    <CountInput valorInicial={quantidade} onChange={handleQtdChange} />
                  </div>

                  <div className="relative" />
                </div>
                <div></div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">$58.00</span>
                <div className="flex flex-1 justify-end">
                  <Link href="">
                    <button className="mr-1.5 flex ml-auto text-white bg-green-700 border-0 py-2 px-6 focus:outline-none hover:bg-green-800 rounded">
                      Comprar
                    </button>
                  </Link>
                </div>
              </div>
              <div className="mt-8 text-lg text-blue-800">Local do Evento</div>
              <div className="gap-2 mt-6 flex flex-row items-center">
                <MdOutlineLocationCity size="26" />
                Av. João Durval Carneiro
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
