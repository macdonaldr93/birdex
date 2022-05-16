import Link from 'next/link';
import React from 'react';
import Fade from 'react-reveal/Fade';

import { Page, SourceText } from '../components';

export default function Home() {
  return (
    <Page>
      <Page.Content>
        <Fade delay={300} duration={2300}>
          <div>
            <h2 className="heading mb-l">That page has gone astray.</h2>
            <SourceText title="Go to home page" url="/" />
          </div>
        </Fade>
      </Page.Content>
    </Page>
  );
}
