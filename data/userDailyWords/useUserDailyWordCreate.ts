import {
  doc,
  getFirestore,
  setDoc,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../foundation';

export default function useUserDailyWordCreate(id: string) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const mutate = useCallback(
    async entry => {
      if (!user) {
        return;
      }

      setError(undefined);
      setLoading(true);

      const firestore = getFirestore();
      const entryRef = doc(firestore, 'users', user.uid, 'dailyWords', id);
      const entrySnap = await getDoc(entryRef);

      try {
        await setDoc(
          entryRef,
          {
            dailyWord: doc(firestore, 'dailyWords', id),
            entry,
            updatedAt: serverTimestamp(),
            ...(entrySnap.exists() ? {} : { createdAt: serverTimestamp() }),
          },
          { merge: true },
        );
      } catch (error: any) {
        console.error(error);
        setError(error.message);
        toast.error("Entry for daily word couldn't update");
      } finally {
        setLoading(false);
      }
    },
    [id, user],
  );

  return { mutate, loading, error };
}
