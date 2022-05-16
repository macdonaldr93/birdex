import React, { ReactChild } from 'react';
import clx from 'classnames';
import styles from './Button.module.css';

interface ButtonProps {
  className?: string;
  children: ReactChild;
  type: 'button' | 'submit';
  onClick?: () => void;
}

export default function Button({
  className,
  children,
  type,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={clx(styles.button, className)}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
