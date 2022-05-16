import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import { Popover } from 'react-tiny-popover';
import { useUserDailyWordLike, useUserStreak } from '../../data';
import { useDarkMode } from '../../foundation';
import Emoji from '../Emoji';
import Logo from '../Logo';
import HelpPopover from './HelpPopover';
import styles from './Nav.module.css';

export interface NavProps {
  wordId?: string;
  title?: string;
}

export default function Nav({ wordId, title }: NavProps) {
  const [helpOpen, setHelpOpen] = useState(false);
  const { snap: userSnap } = useUserStreak();
  const { snap, like, unlike } = useUserDailyWordLike(wordId);
  const { mode, toggleMode } = useDarkMode();

  const likeMarkup = snap?.data()?.liked ? (
    <button className={styles.action} type="button" onClick={unlike}>
      <Emoji symbol="❤️" />
    </button>
  ) : (
    <button className={styles.action} type="button" onClick={like}>
      <Emoji symbol={mode === 'dark' ? '🤍' : '🖤'} />
    </button>
  );

  return (
    <Fade duration={2300} delay={1300}>
      <header className={styles.container}>
        <Logo title={title} />
        <nav>
          <ul className={styles.list}>
            {wordId ? <li>{likeMarkup}</li> : null}
            <li>
              {userSnap?.data()?.streakCount ?? 1}{' '}
              <Emoji symbol="🔥" label="streak" />
            </li>
            <li>
              <button
                className={styles.action}
                type="button"
                onClick={toggleMode}
              >
                <Emoji symbol={mode === 'dark' ? '🌙' : '☀️'} />
              </button>
            </li>
            <li>
              <Popover
                isOpen={helpOpen}
                positions={['bottom', 'left', 'right', 'top']}
                content={<HelpPopover />}
                onClickOutside={() => setHelpOpen(false)}
              >
                <button
                  className={styles.action}
                  type="button"
                  onClick={() => setHelpOpen(prev => !prev)}
                >
                  ?
                </button>
              </Popover>
            </li>
          </ul>
        </nav>
      </header>
    </Fade>
  );
}
