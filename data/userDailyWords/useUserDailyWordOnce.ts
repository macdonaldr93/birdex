import {
  DocumentSnapshot,
  getFirestore,
  doc,
  onSnapshot,
  getDoc,
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../foundation';

export default function useUserDailyWordOnce(id: string) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [snap, setSnap] = useState<DocumentSnapshot>();
  const [error, setError] = useState<string>();

  const fetch = useCallback(async () => {
    if (!user) {
      return;
    }

    const firestore = getFirestore();
    const entryRef = doc(firestore, 'users', user.uid, 'dailyWords', id);

    setError(undefined);
    setLoading(true);

    try {
      const snapshot = await getDoc(entryRef);

      if (snapshot.exists()) {
        setSnap(snapshot);
      } else {
        setSnap(undefined);
      }

      setError(undefined);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
      toast.error("Entry for daily word wasn't found");
    } finally {
      setLoading(false);
    }
  }, [id, user]);

  useEffect(() => {
    if (typeof window === 'undefined' || !id) {
      return;
    }

    fetch();
  }, [id, fetch]);

  return { snap, loading, error };
}
