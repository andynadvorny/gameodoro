import { createContext, useState, ReactNode, useEffect } from 'react';
import { auth } from '../services/firebase';
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

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
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