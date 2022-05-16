import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Fade from 'react-reveal/Fade';
import debounce from 'lodash.debounce';
import { getAnalytics, logEvent } from 'firebase/analytics';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from '../../components';
import { useUserDailyWordOnce, useUserDailyWordCreate } from '../../data';
import styles from './EditorView.module.css';

export interface EditorViewProps {
  id: string;
}

export default function EditorView({ id }: EditorViewProps) {
  const { snap, loading } = useUserDailyWordOnce(id);
  const { mutate } = useUserDailyWordCreate(id);
  const [value, setValue] = useState('');
  const handleSave = useCallback(
    event => {
      event?.preventDefault();
      logEvent(getAnalytics(), 'editor_save_clicked');
      mutate(value);
    },
    [value, mutate],
  );
  const debouncedSave = useMemo(
    () =>
      debounce(
        async (value: string) => {
          await mutate(value);
        },
        300,
        {
          leading: true,
          trailing: true,
          maxWait: 1000,
        },
      ),
    [mutate],
  );
  const handleChange = useCallback(
    event => {
      setValue(event.target.value);
      debouncedSave(event.target.value);
    },
    [debouncedSave],
  );

  useEffect(() => {
    const snapData = snap?.data();

    if (snapData) {
      setValue(snapData.entry);
    }
  }, [snap]);

  return (
    <Fade delay={100}>
      <div className={styles.container}>
        <form noValidate onSubmit={handleSave}>
          <TextareaAutosize
            className={styles.editor}
            placeholder="Use today's word in a sentence. Be creative..."
            onChange={handleChange}
            value={value}
            disabled={loading}
          />
          <div className={styles.submit}>
            <Button type="submit">done</Button>
          </div>
        </form>
      </div>
    </Fade>
  );
}
