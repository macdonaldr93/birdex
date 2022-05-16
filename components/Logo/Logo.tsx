import Link from 'next/link';
import React from 'react';
import styles from './Logo.module.css';
import { LogoSvg } from './assets';

export interface LogoProps {
  title?: string;
}

export default function Logo({ title = 'Birdex' }: LogoProps) {
  return (
    <h1 className={styles.logo}>
      <Link href="/">
        <a className={styles.content}>
          <LogoSvg />
          <div>{title}</div>
        </a>
      </Link>
    </h1>
  );
}
