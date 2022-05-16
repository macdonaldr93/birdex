import React from 'react';
import Fade from 'react-reveal/Fade';
import Link from 'next/link';
import { Page, SourceText } from '../../components';
import { useDailyWords } from '../../data';
import styles from '../../styles/Archives.module.css';

export default function Archives() {
  const { snap, loading, error } = useDailyWords();

  if (loading) {
    return <Page />;
  }

  if (error) {
    return (
      <Page>
        <Page.Content>
          <Fade delay={300} duration={2300}>
            <div>
              <h2 className="heading mb-l">
                Something went wrong.
                <br />
                Refresh and try again.
              </h2>
              <Fade bottom delay={600}>
                <SourceText authors={['Wordful team']} />
              </Fade>
            </div>
          </Fade>
        </Page.Content>
      </Page>
    );
  }

  if (!snap || snap.length === 0) {
    return (
      <Page>
        <Page.Content>
          <Fade delay={300} duration={2300}>
            <div>
              <h2 className="heading mb-l">
                There aren&apos;t any archives to show.
              </h2>
              <Fade bottom delay={600}>
                <SourceText authors={['Wordful team']} />
              </Fade>
            </div>
          </Fade>
        </Page.Content>
      </Page>
    );
  }

  const archivesMarkup = snap.map(doc => (
    <li key={doc.id}>
      <Link href={`/archives/${doc.data()?.postedAt}`}>
        {`${doc.data()?.postedAt} ${doc.data()?.word}`}
      </Link>
    </li>
  ));

  return (
    <Page>
      <Page.Content>
        <ul className={styles.list}>{archivesMarkup}</ul>
      </Page.Content>
    </Page>
  );
}
