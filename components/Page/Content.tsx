import React, { ReactChild } from 'react';
import styles from './Page.module.css';

export interface ContentProps {
  id?: string;
  children?: ReactChild;
}

export default function Content({ id, children }: ContentProps) {
  return (
    <div className={styles.content} id={id}>
      {children}
    </div>
  );
}
