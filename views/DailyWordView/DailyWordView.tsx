import React from 'react';

import { Page, ScrollDown } from '../../components';
import { DefinitionView, EditorView, QuoteView } from '..';

export interface DailyWordViewProps {
  id: string;
  book: {
    title: string;
    authors: string[];
    pageNumber?: string;
    url?: string;
  };
  quote: string;
  word: string;
  root: string;
  phonetic: string;
  definitions?: {
    [type: string]: string[];
  } | null;
  setTitle: (word?: string) => void;
}

export default function DailyWordView({
  id,
  book,
  quote,
  word,
  root,
  definitions,
  phonetic,
  setTitle,
}: DailyWordViewProps) {
  return (
    <>
      <Page.Content id="quote">
        <>
          <QuoteView
            authors={book.authors}
            pageNumber={book.pageNumber}
            quote={quote}
            title={book.title}
            url={book.url}
            word={word}
          />
          <ScrollDown />
        </>
      </Page.Content>
      <Page.Content id="definition">
        <DefinitionView
          definitions={definitions}
          phonetic={phonetic}
          root={root}
          word={word}
        />
      </Page.Content>
      <Page.Content id="editor">
        <EditorView id={id} />
      </Page.Content>
    </>
  );
}
