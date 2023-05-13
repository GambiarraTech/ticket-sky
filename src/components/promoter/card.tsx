import Head from 'next/head';
import Image from 'next/image';
import { ReactNode } from 'react';
import style from '../../styles/promoter/card.module.css';

interface Props {
  children: ReactNode;
  titulo: string;
}

export default function Card({ children, titulo }: Props) {
  return (
    <main className={style.bg}>
      <Head>
        <title>{titulo}</title>
      </Head>
      <div className={style.centerText}>
        <Image className={style.logo} src="/images/logo-complete-white.png" alt="Logo White" height="150" width="200" />
      </div>
      <div className={style.card}>
        <h2 className={style.centerText}>{titulo}</h2>
        {children}</div>
    </main>
  );
}
