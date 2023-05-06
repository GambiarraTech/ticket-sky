import style from '@/styles/cliente/menu.module.css'

import { useState } from 'react'
import { BiCreditCard } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import { IoLogOutOutline, IoTicket } from 'react-icons/io5'
import { MeuPerfil } from './meuPerfil'

interface MenuDropDownProps {
  showModalMenu: boolean
  whenClick: () => void
}

export default function MenuDropDown({ showModalMenu, whenClick }: MenuDropDownProps) {
  const [showModalPerfil, setShowModalPerfil] = useState(false)

  const handleClick = () => {
    setShowModalPerfil(!setShowModalPerfil)
  }

  return (
    <>
      <MeuPerfil showModalPerfil={showModalPerfil} handleClick={handleClick} />
      {showModalMenu && (
        <div className={style.dropdown}>
          <ul className="flex flex-col items-start gap-4">
            <span className="flex items-center my-2">
              <button onClick={() => setShowModalPerfil(true)} className={style.button}>
                <FaUser size={24} className={style.icone} />
                Ver Perfil
              </button>
            </span>

            <span className="flex items-center my-2">
              <BiCreditCard size={24} className={style.icone} />
              <li className="ml-4">Cartão de Crédito</li>
            </span>

            <span className="flex items-center my-2">
              <IoTicket size={24} className={style.icone} />
              <li className="ml-4">Meus Ingressos</li>
            </span>

            <span className="flex items-center my-2">
              <IoLogOutOutline size={24} className="text-[#a60e00]" />
              <li className="ml-4">Logout</li>
            </span>
          </ul>
        </div>
      )}
    </>
  )
}
