import React from 'react';
import styles from './Definition.module.css';

export interface DefinitionProps {
  className?: string;
  meaningClassName?: string;
  meanings: string[];
  type: string;
  typeClassName?: string;
}

export default function Definition({
  className,
  meaningClassName,
  meanings,
  type,
  typeClassName,
}: DefinitionProps) {
  const meaningsMarkup = meanings.map(
    (meaning, index) => (
      <li key={index} className={meaningClassName}>
        {meaning}
      </li>
    ),
    [meanings, meaningClassName],
  );

  return (
    <div className={className}>
      <h3 className={typeClassName}>{type}</h3>
      <ol className={styles.list}>{meaningsMarkup}</ol>
    </div>
  );
}
