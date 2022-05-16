import React, { ReactChild, useContext } from 'react';
import DarkModeContext from './context';
import useDarkModeHelper from './hook';

export interface ThemeProviderProps {
  children: ReactChild;
}

const DarkModeProvider = ({ children }: ThemeProviderProps) => {
  const [mode, toggleMode] = useDarkModeHelper();

  return (
    <DarkModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);
export default DarkModeProvider;
