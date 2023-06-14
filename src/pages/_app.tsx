import { AuthProvider } from '@/contexts/AuthContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

/**
 * Componente raiz do aplicativo Next.js.
 * Ele envolve todos os componentes com o provedor de autenticação.
 * Também aplica os estilos globais.
 * @param {AppProps} props - As propriedades do aplicativo Next.js.
 * @returns O componente raiz do aplicativo.
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
