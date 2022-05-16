import React from 'react';
import Fade from 'react-reveal/Fade';
import { Quote, SourceText } from '../../components';
import styles from './QuoteView.module.css';

export interface QuoteViewProps {
  authors: string[];
  pageNumber?: string;
  quote: string;
  title: string;
  url?: string;
  word: string;
}

export default function QuoteView({
  authors,
  pageNumber,
  quote,
  title,
  url,
  word,
}: QuoteViewProps) {
  return (
    <Fade duration={2200}>
      <div>
        <Quote className={styles.quote} quote={quote} word={word} />

        <Fade bottom delay={600}>
          <SourceText
            authors={authors}
            title={title}
            pageNumber={pageNumber}
            url={url}
          />
        </Fade>
      </div>
    </Fade>
  );
}
