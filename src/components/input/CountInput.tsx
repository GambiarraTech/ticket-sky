import { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

interface CountInputProps {
  valorInicial: number
  onChange: (valor: number) => void
}

export default function CountInput({ valorInicial, onChange }: CountInputProps) {
  const [quantidade, setQuantidade] = useState(valorInicial)

  function adicionar() {
    setQuantidade((qtAtual) => qtAtual + 1)
    onChange(quantidade + 1)
  }

  function reduzir() {
    if (quantidade > 1) {
      setQuantidade((qtAtual) => qtAtual - 1)
      onChange(quantidade - 1)
    }
  }

  return (
    <div className="flex items-center w-full justify-end">
      <button
        type="button"
        onClick={reduzir}
        className="bg-gray-200 hover:bg-gray-200 rounded-lg px-3 py-2 focus:outline-none"
      >
        <AiOutlineMinus size="5" />
      </button>
      <input
        type="quantity"
        min="1"
        value={quantidade}
        onChange={(event) => {
          const value = parseInt(event.target.value, 10)
          if (!isNaN(value) && value >= 1) {
            setQuantidade(value)
            onChange(value)
          }
        }}
        className="px-3 py-2 w-16 text-center"
      />
      <button
        type="button"
        onClick={adicionar}
        className="bg-gray-200 hover:bg-gray-200 rounded-lg px-3 py-2 focus:outline-none"
      >
        <AiOutlinePlus size="5" />
      </button>
    </div>
  )
}
