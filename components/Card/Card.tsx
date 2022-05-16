import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  media: string;
  subtitle: string;
  title: string;
}

export default function Card({ media, subtitle, title }: CardProps) {
  return (
    <div className={styles.Card}>
      <div className={styles.Header}>
        <p>{subtitle}</p>
      </div>
      <div className={styles.Media}>
        <img src={media} />
      </div>
      <div className={styles.Content}>
        <h3>{title}</h3>
      </div>
    </div>
  );
}
