import React, { useCallback } from 'react';
import {
  GoogleAuthProvider,
  getAuth,
  signOut,
  signInWithPopup,
} from 'firebase/auth';
import toast from 'react-hot-toast';
import GoogleIcon from './google.svg';
import styles from './Nav.module.css';
import { useAuth } from '../../foundation';

export default function HelpPopover() {
  const { user, setUser } = useAuth();

  const signInWithGoogle = useCallback(() => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider)
      .then(result => {
        toast.success("You're signed in");
      })
      .catch(error => {
        toast.error(error.message);
      });
  }, []);

  const handleSignOut = useCallback(async () => {
    const auth = getAuth();

    await signOut(auth);
    window.location.reload();
  }, []);

  const googleMarkup = user?.email ? (
    <div className={styles.signIn}>
      <span>{user.email}</span>
      <button type="button" onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  ) : (
    <button type="button" onClick={signInWithGoogle}>
      <GoogleIcon />
    </button>
  );

  return (
    <div className={styles.popover}>
      <p>
        <strong>Welcome to Wordful!</strong>
      </p>
      <p>
        Use this app to discover new books and words.
        <br />
        Like your favourite books and words for later.
        <br />
        Practice creative writing with your new words.
      </p>
      {googleMarkup}
    </div>
  );
}
