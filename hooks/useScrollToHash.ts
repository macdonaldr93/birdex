import { useEffect } from 'react';

interface UseScrollToHash {
  loading?: boolean;
}

export default function useScrollToHash({ loading }: UseScrollToHash) {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const hash = window.location.hash.substring(1);

    if (hash) {
      const element = document.getElementById(hash);
      element?.scrollIntoView();
    }
  }, [loading]);
}
