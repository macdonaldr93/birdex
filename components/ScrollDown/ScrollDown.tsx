import React, { useCallback, useEffect, useState } from 'react';
import clx from 'classnames';
import styles from './ScrollDown.module.css';

const KEY = 'scrolled';
const DELAY = 3000;

export default function ScrollDown() {
  const [show, setShow] = useState(false);

  const onScroll = useCallback(() => {
    setShow(false);
    const mainEl = document.getElementById('Main');
    window.localStorage.setItem(KEY, 'true');
    mainEl?.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (window.localStorage.getItem(KEY) === 'true') {
      return;
    }

    const timeout = setTimeout(() => {
      setShow(true);
    }, DELAY);
    const mainEl = document.getElementById('Main');

    mainEl?.addEventListener('scroll', onScroll);

    return () => {
      mainEl?.removeEventListener('scroll', onScroll);
      clearTimeout(timeout);
    };
  }, [onScroll]);

  return (
    <div className={clx(styles.container, !show && styles.hide)}>
      <svg className={styles.arrows} viewBox="0 0 60 32">
        <path className={styles.a1} d="M0 0 L30 32 L60 0"></path>
      </svg>
    </div>
  );
}
