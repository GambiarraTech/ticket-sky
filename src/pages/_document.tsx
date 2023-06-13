import { Head, Html, Main, NextScript } from 'next/document';

/**
 * Componente personalizado para a página `_document` do Next.js.
 * Ele é responsável por configurar a estrutura básica do documento HTML.
 * @returns O componente para a página `_document`.
 */
export default function Document() {
  return (
    <Html lang="pt-br">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
