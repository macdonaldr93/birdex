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
        <title>
          Birdex - Collect them all
        </title>
        <meta
          name="description"
          content="Collect, catalog and learn about bird species through their calls and sounds."
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
