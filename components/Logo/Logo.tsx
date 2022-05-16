import Link from 'next/link';
import React from 'react';
import styles from './Logo.module.css';
import { LogoSvg } from './assets';

export interface LogoProps {
  title?: string;
}

export default function Logo({ title = 'wordful' }: LogoProps) {
  return (
    <h1 className={styles.logo}>
      <Link href="/">
        <a>
          <div className="visually-hidden">{title}</div>
          <LogoSvg />
        </a>
      </Link>
    </h1>
  );
}
