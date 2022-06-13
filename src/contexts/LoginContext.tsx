import { createContext, useState, ReactNode, useEffect } from 'react';
import { auth, database } from '../services/firebase';
import { onValue, ref, set } from 'firebase/database';
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
  login: () => Promise<void>;
  logout: () => void;
}

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginContext = createContext({} as LoginContextData);

export function LoginProvider({ children } : LoginProviderProps) {
  const [user, setUser] = useState<User>();

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
            })
          }
        })

      }

      return () => {
        unsubscribe();
      }
    })
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

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
    }
  }

  const logout = async () => {
    await signOut(auth)
    setUser(undefined)
  }

  return(
    <LoginContext.Provider value={{ 
      user,
      login,
      logout
    }}>
      {children}
    </LoginContext.Provider>
  )
}