import React from 'react';
import styles from './Gallery.module.css';

interface GalleryProps {
  children: React.ReactChildren;
  subtitle: string;
  title: string;
}

export default function Gallery({ children }: GalleryProps) {
  return <div className={styles.Grid}>{children}</div>;
}
