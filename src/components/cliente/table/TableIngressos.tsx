import Image from 'next/image'
import { FC } from 'react'

export type meusIngressosType = {
  img: string
  nomeEvento: string
  dataAquisicao: string
  valorTotal: string
}

interface TableProps {
  data?: meusIngressosType[]
}

const Table: FC<TableProps> = ({ data }) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="p-10 w-7/12 self-center m-auto">
          <div className="overflow-hidden border rounded-lg shadow-md">
            <table id="tblUsers" className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#00067d]">
                <tr>
                  <th scope="col" className="px-6 py-3 text-xs font-bold text-center text-white uppercase ">
                    Minhas compras
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.map((item) => (
                  <tr key={item.nomeEvento}>
                    <td>
                      <div className="py-8 px-8 max mx-auto bg-white rounded-xl shadow-xl space-y-2 sm:py-4 sm:flex sm:items-left sm:space-y-0 sm:space-x-6">
                        <a>
                          <Image src="/quadrado.png" alt="ingresso" height="120" width="120" />
                        </a>

                        <div className="text-center space-y-2 sm:text-left">
                          <div className="space-y-0.5">
                            <p className="text-lg text-black">{item.nomeEvento}</p>
                            <p className="text-slate-500 font-small">Data de Aquisição: {item.dataAquisicao}</p>
                            <p className="text-slate-500 font-small">Valor total: {item.valorTotal}</p>
                          </div>
                        </div>
                      </div>
                      <hr className="dark:bg-gray-600" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
