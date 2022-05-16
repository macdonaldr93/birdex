import { useEffect } from 'react';
import useUserStreak from '../data/userStreak/useUserStreakTrack';

interface UseTrackStreak {
  id?: string;
}

export default function useTrackStreak({ id }: UseTrackStreak) {
  const { track } = useUserStreak();

  useEffect(() => {
    if (!id) {
      return;
    }

    track(id);
  }, [id, track]);
}
