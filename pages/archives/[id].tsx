import React, { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
import { GetStaticPaths, GetStaticProps } from 'next';

import * as logger from '../../utilities/logger';
import { Page, SourceText } from '../../components';
import { useDailyWord } from '../../data';
import { DailyWordView } from '../../views';
import { useScrollToHash } from '../../hooks';

export interface ArchiveDateProps {
  id?: string;
}

export default function ArchiveDate({ id }: ArchiveDateProps) {
  const [title, setTitle] = useState<string>();
  const { snap, loading, error } = useDailyWord(
    id ? (id as string) : undefined,
  );
  const snapData = snap?.data();

  useScrollToHash({ loading });
  useEffect(() => {
    logger.debug(`Viewing archives for ${id}`);
  }, [id]);

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

  if (!snapData || !snap) {
    return (
      <Page>
        <Page.Content>
          <Fade delay={300} duration={2300}>
            <div>
              <h2 className="heading mb-l">There&apos;s no word for {id}.</h2>
              <Fade bottom delay={600}>
                <SourceText authors={['Wordful team']} />
              </Fade>
            </div>
          </Fade>
        </Page.Content>
      </Page>
    );
  }

  return (
    <Page title={title} wordId={snap.id}>
      <DailyWordView
        id={snap.id}
        setTitle={setTitle}
        book={snapData.book}
        quote={snapData.quote}
        word={snapData.word}
        root={snapData.root}
        definitions={snapData.definitions}
        phonetic={snapData.phonetic}
      />
    </Page>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { createFirebaseNodeApp } = await import(
    '../../foundation/firebase/node'
  );
  const admin = await createFirebaseNodeApp();
  const query = admin
    .firestore()
    .collection('dailyWords')
    .where('postedAt', '!=', null);
  const snapshot = await query.get();
  const paths = snapshot.docs.map(snap => {
    const data = snap.data();
    return { params: { id: data.postedAt } };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  if (!params) {
    return { props: { id: undefined } };
  }

  return {
    props: {
      id: params.id,
    },
  };
};
