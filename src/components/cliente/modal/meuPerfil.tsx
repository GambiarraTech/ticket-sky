import { IoClose } from 'react-icons/io5'

interface MeuPerfilProps {
  showModalPerfil: boolean
  handleClick: () => void
}

export const MeuPerfil = ({ showModalPerfil, handleClick }: MeuPerfilProps) => {
  return (
    <>
      {showModalPerfil && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            onClick={handleClick}
            className="fixed inset-0 w-full h-full bg-[#000000] opacity-40 blur-2"
            aria-hidden="true"
          ></div>
          <div className="relative w-full max-w-lg p-4 mx-auto bg-[#ffffff] rounded-lg shadow-lg">
            <div className="flex justify-end">
              <button onClick={handleClick} className="p-2 text-[#808080] rounded-lg hover:bg-[#e2e8f0]">
                <span className="sr-only">Fechar</span>
                <IoClose />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
