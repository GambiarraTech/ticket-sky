import style from '@/styles/navbar.module.css';

type NavBarProps = {
  backgroundColor: string;
  leftComponent?: React.ReactNode;
  centerComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
};

export default function Navbar(props: NavBarProps) {
  return (
    <nav className={props.backgroundColor == 'blue' ? style.navbarBlue : style.navbarWhite}>
      <div className={style.container}>{props.leftComponent}</div>
      <div className={style.container}>{props.centerComponent}</div>
      <div className={style.container}>{props.rightComponent}</div>
    </nav>
  );
}
