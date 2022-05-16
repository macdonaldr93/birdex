import 'normalize.css';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';

import type { AppProps } from 'next/app';

import Head from 'next/head';
import {
  createFirebaseApp,
  AuthProvider,
  DarkModeProvider,
} from '../foundation';
import { useEffect, useState } from 'react';

createFirebaseApp();

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no"
        />
      </Head>
      <DarkModeProvider>
        <AuthProvider>
          <div style={mounted ? undefined : { visibility: 'hidden' }}>
            <Component {...pageProps} />
            <Toaster
              position="bottom-center"
              toastOptions={{
                style: {
                  borderRadius: 2,
                  fontFamily: `'Noto Serif Display', Garamond, Times, serif`,
                },
              }}
            />
          </div>
        </AuthProvider>
      </DarkModeProvider>
      <Script
        id="DarkModeDetect"
        dangerouslySetInnerHTML={{
          __html: `
(function() {
  var storageKey = 'dark_mode';
  var classNameDark = 'dark';
  var classNameLight = 'light';

  function setClassOnDocumentBody(darkMode) {
    document.body.classList.add(darkMode === 'dark' ? classNameDark : classNameLight);
    document.body.classList.remove(darkMode === 'dark' ? classNameLight : classNameDark);
  }

  var preferDarkQuery = '(prefers-color-scheme: dark)';
  var mql = window.matchMedia(preferDarkQuery);
  var supportsColorSchemeQuery = mql.media === preferDarkQuery;
  var localStorageTheme = null;
  try {
    localStorageTheme = localStorage.getItem(storageKey);
  } catch (err) {}

  // Determine the source of truth
  if (localStorageTheme !== null) {
    // source of truth from localStorage
    setClassOnDocumentBody(localStorageTheme);
  } else if (supportsColorSchemeQuery) {
    // source of truth from system
    setClassOnDocumentBody(mql.matches);
    localStorage.setItem(storageKey, mql.matches);
  } else {
    // source of truth from document.body
    var isDarkMode = document.body.classList.contains(classNameDark);
    localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
  }
})();`,
        }}
      />
    </>
  );
}
