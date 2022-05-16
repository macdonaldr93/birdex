import {
  DocumentSnapshot,
  getFirestore,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useAuth } from '../../foundation';

export default function useUserStreak() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [snap, setSnap] = useState<DocumentSnapshot>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!user) {
      return;
    }

    const firestore = getFirestore();
    const userRef = doc(firestore, 'users', user.uid);

    setError(undefined);
    setLoading(true);

    const unsubscribe = onSnapshot(
      userRef,
      snapshot => {
        if (snapshot.exists()) {
          setSnap(snapshot);
        } else {
          setSnap(undefined);
        }

        setLoading(false);
      },
      error => {
        console.error(error);
        setError(error.message);
        setLoading(false);
        toast.error("Streak couldn't be found");
      },
    );

    return () => {
      unsubscribe();
    };
  }, [user]);

  return { snap, loading, error };
}
