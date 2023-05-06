import style from '@/styles/cliente/button.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { FaUserCircle } from 'react-icons/fa'
import { IoNotificationsSharp } from 'react-icons/io5'
import { SignInModal } from '../modal/SignInModal'
import MenuDropDown from '../modal/menu'
import { LogoNavbar } from './LogoNavbarCliente'

interface NavbarClienteProps {
  Logado: boolean
}

export const NavbarCliente = ({ Logado }: NavbarClienteProps) => {
  const [showModal, setShowModal] = useState(false)
  const [showModalMenu, setShowModalMenu] = useState(false)

  const handleClick = () => {
    setShowModal(!showModal)
  }

  const whenClick = () => {
    setShowModalMenu(!showModalMenu)
  }

  return (
    <header aria-label="NavbarCliente" className="shadow-md bg-transparent h-auto">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="">
          <LogoNavbar />
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center ">
          <div className="relative ml-40">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <BiSearch className="text-[#0013a6]" />
            </span>
            <input
              className="bg-[#dfe0ff] rounded-lg ps-10 pe-5 text-[#0013a6] py-2.5 text-sm placeholder-[#0013a6]"
              placeholder="Pesquisar"
              type="text"
            />
          </div>
        </nav>
        {Logado ? (
          <>
            <div className="ml-auto" />
            <button className="mr-2.5">
              <IoNotificationsSharp size="18" className="text-[#0013a6]" />
            </button>
            <button onClick={whenClick} className="ml-2.5">
              <FaUserCircle size="28" className="text-[#0013a6]" />
            </button>
            <MenuDropDown showModalMenu={showModalMenu} whenClick={whenClick} />
          </>
        ) : (
          <>
            <Link href="http://localhost:3000/acessopromoter">
              <button className={`mr-2.5 ${style.lightbutton}`}>Torne-se Promoter</button>
            </Link>
            <button onClick={handleClick} className={`ml-2.5 ${style.bluebutton}`}>
              Fazer Login
            </button>
            <SignInModal showModal={showModal} handleClick={handleClick} />
          </>
        )}
      </div>
    </header>
  )
}
