import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { SignInModal } from '../modal/SignInModal';
import { MenuDropDown } from '../modal/menu';
import { LogoNavbar } from './LogoNavbar';

export const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalMenu, setShowModalMenu] = useState(false);

  const handleClick = () => {
    setShowModal(!showModal);
  };

  const whenClick = () => {
    setShowModalMenu(!showModalMenu);
  };

  return (
    <header aria-label="Navbar" className="shadow-md">
      <div className="mx-auto max-w-screen px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex md:flex md:items-center md:gap-20">
            <a className="block text-[#0013a6]" href="">
              <span className="sr-only">Home</span>
              <LogoNavbar />
            </a>
          </div>

          <form className="mb-0 hidden lg:flex">
            <div className="relative ml-40">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <BiSearch className="text-[#0013a6]" />
              </span>
              <input
                className="shadow-md h-10 rounded-lg border-[1px] ps-10 pe-5 text-[#0013a6] placeholder-[#0a22a7]"
                placeholder="Pesquisar"
                type="text"
              />
            </div>
          </form>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a href="http://localhost:3000/acessopromoter">
                <button className="rounded-lg bg-[#f5f5f5] hover:bg-[#e0e0e0] px-5 py-2.5 text-sm text-[#0013a6]">
                  Torne-se Promoter
                </button>
              </a>
              <button
                onClick={handleClick}
                className="rounded-lg bg-[#0013a6] hover:bg-[#0028be] px-5 py-2.5 text-sm text-[#ffffff]"
              >
                Fazer Login
              </button>
              <SignInModal showModal={showModal} handleClick={handleClick} />
            </div>
            <button
              onClick={whenClick}
              className="rounded-lg bg-[#0013a6] hover:bg-[#0028be] px-5 py-2.5 text-sm text-[#ffffff]"
            >
              Menu
            </button>
            <MenuDropDown showModalMenu={showModalMenu} whenClick={whenClick} />
          </div>
        </div>
      </div>
    </header>
  );
};
