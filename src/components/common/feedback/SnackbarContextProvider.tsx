import { snackbarContext } from '@/components/common/feedback/snackbarContext';
import styles from '@/components/common/feedback/Snackbar.module.scss';
import React from 'react';

type AlertColor = 'success' | 'error' | 'info' | 'warning';

interface SnackbarContextProviderProps {
  children: React.ReactNode;
}

export const SnackbarContextProvider: React.FC<SnackbarContextProviderProps> = (props) => {
  const [messageObjects, setMessageObjects] = React.useState<
    { message: string; type: AlertColor; disabled: boolean }[]
  >([]);

  // メッセージを追加する関数
  const showSnackbar = React.useCallback((args: { message: string; type: AlertColor }) => {
    const newMessageObject = { ...args, disabled: false };
    setMessageObjects((prev) => [...prev, newMessageObject]);
  }, []);

  const setDisabledAll = React.useCallback(() => {
    setMessageObjects((prev) => prev.map((v) => ({ ...v, disabled: true })));
  }, []);

  return (
    <snackbarContext.Provider value={{ showSnackbar }}>
      {props.children}
      <div className={styles.snackbar} onClick={setDisabledAll}>
        <div className={styles.snackbar__container}>
          {messageObjects.map((v, i) => (
            <div
              key={i}
              className={`${styles.snackbar__content} ${v.disabled ? styles.force : ''} ${styles[v.type]}`}
            >
              <p>{v.message}</p>
              <span>×</span>
            </div>
          ))}
        </div>
      </div>
    </snackbarContext.Provider>
  );
};
