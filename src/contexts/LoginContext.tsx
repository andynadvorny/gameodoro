import { createContext, useState, ReactNode, useEffect } from 'react';
import { auth, database } from '../services/firebase';
import { onValue, ref, set } from 'firebase/database';
import { TailSpin } from  'react-loader-spinner'

import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';  

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface LoginContextData {
  user: User | undefined;
  isLoggedIn: Boolean;
  login: () => Promise<void>;
  logout: () => void;
  loading: Boolean;

}

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginContext = createContext({} as LoginContextData);

export function LoginProvider({ children } : LoginProviderProps) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged( auth, (currentUser) => {
      if (currentUser) {
        const { uid, displayName, photoURL } = currentUser
        const userRef = ref(database, 'users/' + uid)

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })

        onValue(userRef, (snapshot) => {
          const data = snapshot.val()
          if (data == null) {
            set(userRef, {
              name: displayName,
              avatar: photoURL,
              iterationsCompleted: 0,
              level: 1,
              experience: 0,
              experienceToNextLevel: 80
            })
          }
        })

      }

      return () => {
        unsubscribe();
      }
    })
  }, []);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user])

  const login = async () => {
    
    const provider = new GoogleAuthProvider();
    setLoading(true);
    const result = await signInWithPopup(auth, provider);
    setLoading(false);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })

      setIsLoggedIn(true)
    } else {
      setLoading(false)
    }

  }

  const logout = async () => {
    setLoading(true)
    await signOut(auth)
    setUser(undefined)
    setLoading(false)
    setIsLoggedIn(false)
  }
  
    return(
      <LoginContext.Provider value={{ 
        user,
        loading,
        isLoggedIn,
        login,
        logout
      }}>
        {loading ? (
          <>
            <div className="loader">
              <TailSpin
                height="150"
                width="150"
                color='#0be874'
                ariaLabel='loading'
              />
            </div>
          </>
        ) : (<></>)}
       
      
       {children}
      </LoginContext.Provider>
    )
  
  
}