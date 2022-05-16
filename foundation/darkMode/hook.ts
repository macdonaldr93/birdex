import { useState, useEffect } from 'react';
import { Mode } from './types';
import { getPreferredTheme, setDarkModeCookieValue } from './utilities';

export default function useDarkMode(): [Mode, () => void] {
  const [mode, setMode] = useState<Mode>(getPreferredTheme());

  function toggleMode() {
    setMode(mode === 'light' ? 'dark' : 'light');
  }

  function setBodyCssClass(mode: string) {
    document.documentElement.className = mode;
  }

  useEffect(() => {
    setDarkModeCookieValue(mode);
    setBodyCssClass(mode);
  }, [mode]);

  return [mode, toggleMode];
}
