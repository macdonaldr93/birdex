import React from 'react';
import { Mode } from './types';

interface Context {
  mode: Mode;
  toggleMode: () => void;
}

const DarkModeContext = React.createContext<Context>({
  mode: '',
  toggleMode: () => {},
});

export default DarkModeContext;
