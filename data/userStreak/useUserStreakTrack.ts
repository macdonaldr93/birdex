import {
  getDoc,
  setDoc,
  getFirestore,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useCallback, useState } from 'react';
import { useAuth } from '../../foundation';

export default function useUserStreak() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const track = useCallback(
    async (id: string) => {
      if (!user) {
        return;
      }

      setError(undefined);
      setLoading(true);

      const firestore = getFirestore();
      const wordRef = doc(firestore, 'dailyWords', id);
      const streakRef = doc(firestore, 'users', user.uid, 'streaks', id);
      const streakSnap = await getDoc(streakRef);

      try {
        if (!streakSnap.exists()) {
          await setDoc(
            streakRef,
            {
              dailyWord: wordRef,
              viewedAt: serverTimestamp(),
            },
            { merge: true },
          );
        }
      } catch (error: any) {
        console.error(error);
        setError(error.message);
        toast.error("Streak couldn't update");
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  return { loading, error, track };
}
