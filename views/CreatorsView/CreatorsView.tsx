import Link from 'next/link';
import React from 'react';
import Fade from 'react-reveal/Fade';
import { Emoji } from '../../components';
import styles from './CreatorsView.module.css';

export default function CreatorsView() {
  return (
    <Fade delay={100}>
      <footer className={styles.footer}>
        <div>
          <div>
            Made with <Emoji symbol="❤️" label="love" /> by
          </div>
          <div>
            <a
              href="https://www.instagram.com/jennndoan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @jennndoan
            </a>{' '}
            and{' '}
            <a
              href="https://twitter.com/_ryanmacdonald_/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @rtmacdonald
            </a>
          </div>
        </div>
        <nav className={styles.links}>
          <ul>
            <li>
              <Link href="/archives">View archives</Link>
            </li>
          </ul>
        </nav>
      </footer>
    </Fade>
  );
}
