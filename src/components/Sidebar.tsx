import Image from 'next/image';
import styles from '../styles/Sidebar.module.scss';
import closeButton from '../assets/images/close.svg';

export function Sidebar(props: any) {
  return (
    <div className={props.sidebar ? `${styles.sidebar} ${styles.sidebaropen}` : `${styles.sidebar}`}>

      <div id={styles.button} onClick={props.showSidebar}><Image src={closeButton} alt='botão fechar'/></div>
      <div id={styles.conteudo}>conteudo</div>

    </div>

  )
}
