import {
  collection,
  DocumentSnapshot,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as logger from '../../utilities/logger';

export default function useDailyWords() {
  const [loading, setLoading] = useState(false);
  const [snap, setSnap] = useState<DocumentSnapshot[]>();
  const [error, setError] = useState<string>();

  const fetch = useCallback(async () => {
    const firestore = getFirestore();
    const dailyWordsRef = collection(firestore, 'dailyWords');
    const dailyWordsQuery = query(dailyWordsRef, orderBy('postedAt', 'desc'));

    logger.debug('Querying words');

    setError(undefined);
    setLoading(true);

    try {
      const snapshot = await getDocs(dailyWordsQuery);

      if (!snapshot.empty && snapshot.docs.length > 0) {
        setSnap(snapshot.docs);
      } else {
        setSnap(undefined);
      }
    } catch (error: any) {
      console.error(error);
      setError(error.message);
      toast.error("Daily word archives couldn't load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    fetch();
  }, [fetch]);

  return { snap, loading, error };
}
