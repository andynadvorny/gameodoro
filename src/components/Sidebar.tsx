import { useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import Image from 'next/image';
import { ExperienceBar } from '../components/ExperienceBar';

import styles from '../styles/Sidebar.module.scss';
import closeButton from '../assets/images/close.svg';

export function Sidebar(props: any) {
  const { user, login, logout } = useContext(LoginContext);
  
  return (
    <div className={props.sidebar ? `${styles.sidebar} ${styles.sidebaropen}` : `${styles.sidebar}`}>

      <div id={styles.button} onClick={props.showSidebar}><Image src={closeButton} alt='botão fechar'/></div>

      <div className={styles.contents}>
        { user ? (
          <>
            <div className={styles.userProfile}>
              <Image src={user.avatar} alt="user profile pic" className={styles.avatar} width="50px" height="50px" />
              <p><span>{user.name}</span></p>
              <ExperienceBar />
            </div>
            <button type='button' onClick={logout}>Logout</button>
          </>
        ) : (
          <button type='button' onClick={login}>Login</button>
        )}
      </div>
    </div>

  )
}
