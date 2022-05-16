import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  linkWithCredential,
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  User,
} from 'firebase/auth';
import {
  createContext,
  FC,
  ReactChild,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as logger from '../../utilities/logger';

export interface IAuthContext {
  signedIn: boolean;
  user: User | null;
  loading: boolean;
  setUser(user: User): void;
}

const defaultAuthContext: IAuthContext = {
  signedIn: false,
  user: null,
  loading: false,
  setUser: () => {},
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export interface AuthProviderProps {
  children: ReactChild;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [signedIn, setSignedIn] = useState(false);

  const checkAuth = useCallback(async () => {
    setLoading(true);

    const firebaseAuth = getAuth();
    let result;

    try {
      result = await getRedirectResult(firebaseAuth);
    } catch (error: any) {
      const pendingCred = error.credential;

      if (error.code === 'auth/account-exists-with-different-credential') {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(firebaseAuth, provider);

        linkWithCredential(result.user, pendingCred);
      } else {
        throw error;
      }
    }

    if (result || firebaseAuth.currentUser) {
      setUser(result ? result.user : firebaseAuth.currentUser);
    } else {
      signInAnonymously(firebaseAuth);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const firebaseAuth = getAuth();
    checkAuth();

    const unsubscriber = onAuthStateChanged(firebaseAuth, async user => {
      try {
        if (user) {
          setSignedIn(true);
          setUser(user);
        } else {
          setSignedIn(false);
          setUser(null);
        }
      } catch (error) {
        logger.error(error);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      unsubscriber();
    };
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ signedIn, user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
