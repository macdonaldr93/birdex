import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from 'firebase/auth';
import { firebaseConfig } from '../../config';

export const createFirebaseApp = async () => {
  if (typeof window === 'undefined') {
    return;
  }

  if (getApps().length <= 0) {
    const app = initializeApp(firebaseConfig);
    getAnalytics();

    const auth = getAuth();
    await setPersistence(auth, browserLocalPersistence);

    const firestore = getFirestore();

    try {
      await enableIndexedDbPersistence(firestore);
    } catch (err: any) {
      if (err.code == 'failed-precondition') {
        console.warn('Offline mode is only available in one tab at a time');
      } else if (err.code == 'unimplemented') {
        console.warn("Offline mode isn't supported by your browser.");
      } else {
        console.error('Offline failed to start for an unknown reason.');
      }
    }

    return app;
  }
};
