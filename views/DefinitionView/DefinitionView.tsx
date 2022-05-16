import React, { useMemo } from 'react';
import Fade from 'react-reveal/Fade';
import { Definition } from '../../components';
import styles from './DefinitionView.module.css';

export interface DefinitionViewProps {
  definitions?: {
    [type: string]: string[];
  } | null;
  phonetic?: string | null;
  root: string;
  word: string;
}

export default function DefinitionView({
  definitions,
  phonetic,
  root,
  word,
}: DefinitionViewProps) {
  const term = root ?? word;
  const phoneticMarkup = phonetic && (
    <span className={styles.phonetic}>{phonetic}</span>
  );
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
        key={`${term}=${type}`}
        type={type}
        meanings={definitions[type]}
      />
    ));
  }, [definitions, term]);

  return (
    <Fade delay={100}>
      <div className={styles.container}>
        <h2 className={styles.root}>
          {term} {phoneticMarkup}
        </h2>
        {definitionsMarkup}
      </div>
    </Fade>
  );
}
