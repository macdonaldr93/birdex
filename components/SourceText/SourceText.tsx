import React from 'react';
import clx from 'classnames';
import styles from './SourceText.module.css';

export interface SourceTextProps {
  authors?: string[];
  authorsClassName?: string;
  bookClassName?: string;
  pageNumber?: string;
  title?: string;
  url?: string;
}

export default function SourceText({
  authors,
  authorsClassName,
  bookClassName,
  pageNumber,
  title,
  url,
}: SourceTextProps) {
  const pageMarkup = pageNumber ? (
    <span>
      , <abbr title="page">p.</abbr>
      {pageNumber}
    </span>
  ) : null;
  const anchorProps = url?.startsWith('/')
    ? {}
    : { target: '_blank', rel: 'noreferrer' };
  const bookMarkup = title ? (
    <p className={clx(styles.book, bookClassName)}>
      {url ? (
        <a href={url} title={title} {...anchorProps}>
          {title}
          {pageMarkup}
        </a>
      ) : (
        <>
          {title}
          {pageMarkup}
        </>
      )}
    </p>
  ) : null;
  const authorsMarkup = authors ? (
    <p className={clx(styles.authors, authorsClassName)}>
      &ndash; {authors.join(', ')}
    </p>
  ) : null;

  return (
    <div className={styles.source}>
      {authorsMarkup}
      {bookMarkup}
    </div>
  );
}
