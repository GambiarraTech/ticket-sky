import style from '@/styles/navbar.module.css';

/**
 * Propriedades do componente Navbar.
 */
type NavBarProps = {
  backgroundColor: string;
  leftComponent?: React.ReactNode;
  centerComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
};

/**
 * Componente para exibir uma barra de navegação personalizada.
 */
export default function Navbar(props: NavBarProps) {
  return (
    <nav className={props.backgroundColor == 'blue' ? style.navbarBlue : style.navbarWhite}>
      <div className={style.container}>{props.leftComponent}</div>
      <div className={style.container}>{props.centerComponent}</div>
      <div className={style.container}>{props.rightComponent}</div>
    </nav>
  );
}
