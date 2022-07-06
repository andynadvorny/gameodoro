import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

import styles from '../styles/Login.module.scss';

export function Login(){
  const { isLoggedIn, login } = useContext(LoginContext);
  
  return(
    <>
      {!isLoggedIn && (
        <div className={styles.overlay}>
          <div className={styles.container}>
            <p>Faça login para começar: </p>
            <button type='button' onClick={login}>Login</button>
          </div>
        </div>
      )}
    </>
  )
}
