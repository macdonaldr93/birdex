import React from 'react';

export default function IconMeta() {
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#231f20" />
      <meta name="apple-mobile-web-app-title" content="Wordful" />
      <meta name="application-name" content="Wordful" />
      <meta name="msapplication-TileColor" content="#231f20" />
      <meta name="theme-color" content="#231f20" />
    </>
  );
}
