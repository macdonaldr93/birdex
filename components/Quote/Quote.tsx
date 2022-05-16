import React, { useMemo } from 'react';
import Link from 'next/link';
import styles from './Quote.module.css';

export interface QuoteProps {
  className?: string;
  quote: string;
  word: string;
}

export default function Quote({ className, quote, word }: QuoteProps) {
  const quoteMarkup = useMemo(() => {
    const parts = quote.split(new RegExp(word, 'i'));

    return (
      <>
        {parts[0]}
        <span className={styles.word}>
          <a
            href="#definition"
            onClick={event => {
              event?.preventDefault();

              const element = document.getElementById('definition');
              element?.scrollIntoView();
            }}
            title={`View definition for ${word}`}
          >
            {word}
          </a>
        </span>
        {parts[1]}
      </>
    );
  }, [quote, word]);

  return (
    <>
      <h2 className="visually-hidden">{word}</h2>
      <p className={className}>{quoteMarkup}</p>
    </>
  );
}
