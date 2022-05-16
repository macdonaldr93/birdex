import {
  DocumentSnapshot,
  getFirestore,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../foundation';

export default function useUserDailyWord(id: string) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [snap, setSnap] = useState<DocumentSnapshot>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (typeof window === 'undefined' || !id) {
      return;
    }

    if (!user) {
      return;
    }

    const firestore = getFirestore();
    const entryRef = doc(firestore, 'users', user.uid, 'dailyWords', id);

    setError(undefined);
    setLoading(true);

    const unsubscribe = onSnapshot(
      entryRef,
      snapshot => {
        if (snapshot.exists()) {
          setSnap(snapshot);
        } else {
          setSnap(undefined);
        }

        setError(undefined);
        setLoading(false);
      },
      error => {
        console.error(error);
        setError(error.message);
        setLoading(false);
        toast.error("Entry for daily word wasn't found");
      },
    );

    return () => {
      unsubscribe();
    };
  }, [id, user]);

  return { snap, loading, error };
}
