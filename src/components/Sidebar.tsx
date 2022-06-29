import { useContext, useState } from 'react';
import Image from 'next/image';
import Modal from 'react-modal';
import { LoginContext } from '../contexts/LoginContext';
import { ExperienceBar } from '../components/ExperienceBar';
import { Rank } from './Rank';
import { Info } from './Info';

import styles from '../styles/Sidebar.module.scss';
import closeButton from '../assets/images/close.svg';

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
        <button onClick={openInfoModal}>Como funciona</button>
        <button onClick={openRankModal}>Ranking</button>
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
