import Link from 'next/link';

interface MenuProps {
  showmenu: Boolean;
  whenclick: () => void;
}

export default function Menu({ showmenu, whenclick }: MenuProps) {
  return (
    <>
      {showmenu && (
        <div className=" absolute right-5 z-20 w-56 py-2 mt-1  bg-white rounded-lg shadow-xl border-[1px] ">
          <div
            onClick={whenclick}
            className="flex items-center p-3 -mt-2 text-sm font-bold text-black transition-colors duration-200 transform  justify-center"
          >
            Menu
          </div>

          <hr className="border-gray-200 " />

          <Link
            href="#"
            className="block px-4 py-3 font-bold text-sm text-black capitalize transition-colors duration-200 transform hover:bg-gray-100"
          >
            Ver perfil
          </Link>
          <hr className="border-gray-200 " />
          <Link
            href="#"
            className="block px-4 py-3 font-bold text-sm  text-black capitalize transition-colors duration-200 transform hover:bg-gray-100 "
          >
            Criar eventos
          </Link>

          <hr className="border-gray-200" />

          <Link
            href="#"
            className="block px-4 py-3 text-sm font-bold text-black capitalize transition-colors duration-200 transform  hover:bg-gray-100 "
          >
            Meus eventos
          </Link>
          <hr className="border-gray-200 " />
          <Link
            href="#"
            className="block px-4 py-3 text-sm font-bold text-black capitalize transition-colors duration-200 transform  hover:bg-gray-100 "
          >
            Sair
          </Link>
        </div>
      )}
    </>
  );
}
