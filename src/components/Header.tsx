import { useState } from 'react';
import { Sidebar } from './Sidebar';
import Image from 'next/image';
import styles from '../styles/Header.module.scss';
import menuButton from '../assets/images/menu.svg';

export function Header(){

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return(
      <header className={styles.header}>
        <div id={styles.title}><h1>Gameodoro</h1></div>
        
        <div id={styles.button} onClick={showSidebar}><Image src={menuButton} alt='botão de menu'/></div>
        <Sidebar sidebar={sidebar} showSidebar={showSidebar}/>
      </header>
  )
}
