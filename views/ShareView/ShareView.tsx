import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Fade from 'react-reveal/Fade';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { Button, Definition, Emoji, Page, SourceText } from '../../components';
import * as logger from '../../utilities/logger';
import { useUserDailyWord } from '../../data';
import { createShareText, Swap } from './utilities';
import styles from './ShareView.module.css';

export interface ShareViewProps {
  id: string;
  definitions?: {
    [type: string]: string[];
  } | null;
  quote: string;
  phonetic: string;
  word: string;
  title: string;
  pageNumber?: string;
  authors: string[];
  url?: string;
}

export default function ShareView({
  id,
  definitions,
  quote,
  phonetic,
  word,
  title,
  pageNumber,
  authors,
  url,
}: ShareViewProps) {
  const { snap } = useUserDailyWord(id);
  const snapData = snap?.data();

  const definitionsMarkup = useMemo(() => {
    if (!definitions) {
      return null;
    }

    const types = Object.keys(definitions);

    return types.map(type => (
      <Definition
        className={styles.definitions}
        typeClassName={styles.type}
        meaningClassName={styles.meaning}
        key={`${word}=${type}`}
        type={type}
        meanings={definitions[type]}
      />
    ));
  }, [definitions, word]);

  const [swap, setSwap] = useState(Swap.Quote);
  const [reference, setReference] = useState<ReactNode>(
    <Fade>
      <p className={styles.quote}>{quote}</p>
      <SourceText
        authorsClassName={styles.authors}
        bookClassName={styles.book}
        authors={authors}
        title={title}
        pageNumber={pageNumber}
        url={url}
      />
    </Fade>,
  );

  const copyShareText = useCallback(() => {
    logEvent(getAnalytics(), 'shared_text_copy_clicked');
    copy(
      createShareText({
        word,
        phonetic,
        quote,
        definitions,
        swap,
        entry: snapData?.entry,
        title,
        pageNumber,
        authors,
      }),
    );
    toast.success('Copied to clipboard');
  }, [
    word,
    phonetic,
    quote,
    definitions,
    swap,
    snapData,
    title,
    pageNumber,
    authors,
  ]);

  const toggleReference = useCallback(() => {
    logger.debug('Swapping to new mode', swap);
    logEvent(getAnalytics(), 'shared_text_swap_clicked');

    switch (swap) {
      case Swap.Quote: {
        if (snapData?.entry) {
          setSwap(Swap.Entry);
          setReference(
            <Fade>
              <p>{snapData.entry}</p>
            </Fade>,
          );
        } else {
          setSwap(Swap.Definition);
          setReference(
            <Fade>
              <>{definitionsMarkup}</>
            </Fade>,
          );
        }
        break;
      }
      case Swap.Entry: {
        setSwap(Swap.Definition);
        setReference(
          <Fade>
            <>{definitionsMarkup}</>
          </Fade>,
        );
        break;
      }
      case Swap.Definition: {
        setSwap(Swap.Quote);
        setReference(
          <Fade>
            <>
              <p className={styles.quote}>{quote}</p>
              <SourceText
                authorsClassName={styles.authors}
                bookClassName={styles.book}
                authors={authors}
                title={title}
                pageNumber={pageNumber}
                url={url}
              />
            </>
          </Fade>,
        );
        break;
      }
      default: {
        setSwap(Swap.Quote);
        setReference(
          <Fade>
            <>
              <p className={styles.quote}>{quote}</p>
              <SourceText
                authorsClassName={styles.authors}
                bookClassName={styles.book}
                authors={authors}
                title={title}
                pageNumber={pageNumber}
                url={url}
              />
            </>
          </Fade>,
        );
        break;
      }
    }
  }, [
    swap,
    snapData,
    quote,
    definitionsMarkup,
    authors,
    title,
    pageNumber,
    url,
  ]);

  useEffect(() => {
    switch (swap) {
      case Swap.Quote: {
        logEvent(getAnalytics(), 'shared_text_swap_quote');
        break;
      }
      case Swap.Entry: {
        logEvent(getAnalytics(), 'shared_text_swap_entry');
        break;
      }
      case Swap.Definition: {
        logEvent(getAnalytics(), 'shared_text_swap_definition');
        break;
      }
      default: {
        logEvent(getAnalytics(), 'shared_text_swap_quote');
        break;
      }
    }
  }, [swap]);

  return (
    <Fade>
      <h2 className="heading">
        <Emoji symbol="✨" label="Sparkle" />{' '}
        <span className={styles.word}>{word}</span>{' '}
        <span className={styles.phonetic}>{phonetic}</span>{' '}
        <Emoji symbol="✨" label="Sparkle" />
      </h2>
      <div className={styles.quote}>{reference}</div>
      <ul className={styles.list}>
        <li>
          <Button
            type="button"
            className={styles.action}
            onClick={copyShareText}
          >
            <>
              <Emoji symbol="📣" label="Share" /> Share
            </>
          </Button>
        </li>
        <li>
          <Button
            type="button"
            className={styles.action}
            onClick={toggleReference}
          >
            <>
              <Emoji symbol="🔁" label="Share" /> Swap
            </>
          </Button>
        </li>
      </ul>
    </Fade>
  );
}
