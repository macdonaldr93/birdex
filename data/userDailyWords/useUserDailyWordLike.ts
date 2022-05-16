import {
  doc,
  getFirestore,
  setDoc,
  DocumentSnapshot,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../foundation';

export default function useUserDailyWordLike(id?: string) {
  const { user } = useAuth();
  const [snap, setSnap] = useState<DocumentSnapshot>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const like = useCallback(async () => {
    if (!id) {
      return;
    }

    let newUser = user;

    if (!user) {
      const auth = getAuth();
      const result = await signInAnonymously(auth);

      if (result.user) {
        newUser = result.user;
      }
    }

    const entryRef = doc(
      getFirestore(),
      'users',
      newUser!.uid,
      'dailyWords',
      id,
    );

    setError(undefined);
    setLoading(true);

    try {
      await setDoc(
        entryRef,
        {
          liked: true,
          likedAt: serverTimestamp(),
        },
        { merge: true },
      );
    } catch (error: any) {
      console.error(error);
      setError(error.message);
      toast.error("Word couldn't be liked");
    } finally {
      setLoading(false);
    }
  }, [user, id]);

  const unlike = useCallback(async () => {
    if (!id) {
      return;
    }

    let newUser = user;

    if (!user) {
      const auth = getAuth();
      const result = await signInAnonymously(auth);

      if (result.user) {
        newUser = result.user;
      }
    }

    const entryRef = doc(
      getFirestore(),
      'users',
      newUser!.uid,
      'dailyWords',
      id,
    );

    setError(undefined);
    setLoading(true);

    try {
      await setDoc(
        entryRef,
        {
          liked: false,
          likedAt: null,
        },
        { merge: true },
      );
    } catch (error: any) {
      console.error(error);
      setError(error.message);
      toast.error("Word couldn't be unliked");
    } finally {
      setLoading(false);
    }
  }, [id, user]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!user || !id) {
      return;
    }

    const entryRef = doc(getFirestore(), 'users', user.uid, 'dailyWords', id);

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
        toast.error("Word like status couldn't be found");
      },
    );

    return () => {
      unsubscribe();
    };
  }, [user, id]);

  return { snap, like, unlike, loading, error };
}
