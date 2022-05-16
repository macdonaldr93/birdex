import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import { FacebookMeta, IconMeta, Preconnect, TwitterMeta } from '../components';

const name = 'Birdle';
const description =
  'Collect, catalog and learn about bird species through their calls and sounds.';

export default function Document() {
  return (
    <Html>
      <Head>
        <Preconnect />

        <meta name="application-name" content={name} />
        <meta name="apple-mobile-web-app-title" content={name} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="description" content={description} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#231f20" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#231f20" />

        <TwitterMeta description={description} title={name} />
        <FacebookMeta description={description} name={name} title={name} />
        <IconMeta />

        <link rel="manifest" href="/site.webmanifest" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+Display:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Rasa:wght@300;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
