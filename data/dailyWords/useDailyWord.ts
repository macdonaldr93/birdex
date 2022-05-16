import {
  collection,
  DocumentSnapshot,
  getFirestore,
  limit,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as logger from '../../utilities/logger';

export default function useDailyWord(postedAt?: string) {
  const [loading, setLoading] = useState(false);
  const [snap, setSnap] = useState<DocumentSnapshot>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!postedAt) {
      return;
    }

    const firestore = getFirestore();
    const dailyWordRef = collection(firestore, 'dailyWords');

    logger.debug('Querying word on', postedAt);

    const dailyWordsQuery = query(
      dailyWordRef,
      where('postedAt', '==', postedAt),
      limit(1),
    );

    setError(undefined);
    setLoading(true);

    const unsubscribe = onSnapshot(
      dailyWordsQuery,
      snapshot => {
        if (!snapshot.empty && snapshot.docs.length > 0) {
          setSnap(snapshot.docs[0]);
        } else {
          setSnap(undefined);
        }
        setLoading(false);
      },
      error => {
        console.error(error);
        setError(error.message);
        toast.error("Daily word couldn't update");
        setLoading(false);
      },
    );

    return () => {
      unsubscribe();
    };
  }, [postedAt]);

  return { snap, loading, error };
}
