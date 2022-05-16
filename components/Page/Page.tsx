import React, { ReactChild } from 'react';
import Head from 'next/head';
import Nav from '../Nav';
import styles from './Page.module.css';
import Content from './Content';

export interface PageProps {
  children?: ReactChild;
  title?: string;
  wordId?: string;
}

function Page({ children, title, wordId }: PageProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Wordful - Build your vocabulary</title>
        <meta
          name="description"
          content="Build your vocabulary with a new word and creative writing challenges every day."
        />
      </Head>

      <Nav title={title} wordId={wordId} />

      <div className={styles.page}>
        <main role="main" className={styles.main} id="Main">
          {children}
        </main>
      </div>
    </div>
  );
}

Page.Content = Content;

export default Page;
