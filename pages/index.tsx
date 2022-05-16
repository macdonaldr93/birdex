import React, { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
import { format } from 'date-fns';

import { useScrollToHash, useTrackStreak } from '../hooks';
import { Page, SourceText } from '../components';
import { useDailyWord } from '../data';
import { CreatorsView, DailyWordView } from '../views';

const oneHourInMs = 3600000;

export default function Home() {
  const [title, setTitle] = useState<string>();
  const [now, setNow] = useState(() => format(new Date(), 'yyyy-MM-dd'));
  const { snap, loading, error } = useDailyWord(now);
  const snapData = snap?.data();

  useScrollToHash({ loading });
  useTrackStreak({ id: snap?.id });

  useEffect(() => {
    const interval = setInterval(
      () => setNow(format(new Date(), 'yyyy-MM-dd')),
      oneHourInMs,
    );

    return () => {
      clearInterval(interval);
    };
  });

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
              <h2 className="heading mb-l">
                There isn&apos;t a word today.
                <br />
                See you tomorrow.
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

  return (
    <Page title={title} wordId={snap.id}>
      <>
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
        <CreatorsView />
      </>
    </Page>
  );
}
