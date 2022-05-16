import React, { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
import { format } from 'date-fns';

import { useScrollToHash, useTrackStreak } from '../hooks';
import { Page, SourceText } from '../components';
import { useDailyWord } from '../data';
import { CreatorsView, DailyWordView } from '../views';
import BirdListView from '../views/BirdListView';

const oneHourInMs = 3600000;

export default function Home() {
  // const { snap, loading, error } = useDailyWord(now);
  // const snapData = snap?.data();
  const loading = false;
  const error = undefined;
  const snapData = [
    {
      id: '4',
      discoveryNumber: 1,
      name: 'White-Throated Sparrow',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Zonotrichia_albicollis_CT1.jpg/1200px-Zonotrichia_albicollis_CT1.jpg',
    },
    {
      id: '8',
      discoveryNumber: 2,
      name: 'Swamp Sparrow',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Melospiza_georgiana_MN1.jpg/1200px-Melospiza_georgiana_MN1.jpg',
    },
  ];

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

  return (
    <Page>
      <BirdListView items={snapData} />
    </Page>
  );
}
