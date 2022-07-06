import { useContext, useState } from 'react';
import Image from 'next/image';
import Modal from 'react-modal';
import { LoginContext } from '../contexts/LoginContext';
import { ExperienceBar } from '../components/ExperienceBar';
import { Rank } from './Rank';
import { Info } from './Info';

import styles from '../styles/Sidebar.module.scss';
import closeButton from '../assets/images/close.svg';
import helpButton from '../assets/images/help.svg';
import crownButton from '../assets/images/crown.svg';

export function Sidebar(props: any) {
  const { user, login, logout } = useContext(LoginContext);
  const [rankModalIsOpen, setRankModalIsOpen] = useState(false);
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '500px',
      backgroundColor: '#181e39',
      border: 'none'
    },
  };

  function openRankModal() {
    setRankModalIsOpen(true);
    props.showSidebar();
  }

  function closeRankModal() {
    setRankModalIsOpen(false);
  }

  function openInfoModal() {
    setInfoModalIsOpen(true);
    props.showSidebar();
  }

  function closeInfoModal() {
    setInfoModalIsOpen(false);
  }
  
  return (
    <div className={props.sidebar ? `${styles.sidebar} ${styles.sidebaropen}` : `${styles.sidebar}`}>
     
      <div className={styles.icons}>
        <span id={styles.closeButton} onClick={props.showSidebar}><Image src={closeButton} alt='botão fechar'/></span>
        <span title="ranking" id={styles.crownButton} onClick={openRankModal}><Image src={crownButton} /></span>
        <span title="como funciona" id={styles.helpButton} onClick={openInfoModal}><Image src={helpButton} /></span>
      </div>

      <div className={styles.contents}>
        { user ? (
          <>
            <div className={styles.userProfile}>
              <Image src={user.avatar} alt="user profile pic" className={styles.avatar} width="80px" height="80px" />
              <p><span>{user.name}</span></p>
              <ExperienceBar />
            </div>
            <button type='button' onClick={logout}>Logout</button>
          </>
        ) : (
          <button type='button' onClick={login}>Login</button>
        )}
      </div>

      <Modal
        isOpen={rankModalIsOpen}
        onRequestClose={closeRankModal}
        style={customStyles}
        contentLabel="Ranking de Jogadores"
      >
        <Rank />
      </Modal>

      <Modal
        isOpen={infoModalIsOpen}
        onRequestClose={closeInfoModal}
        style={customStyles}
        contentLabel="Como funciona"
      >
        <Info />
      </Modal>
    </div>
  )
}
