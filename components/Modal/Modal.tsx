'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import css from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdrop}>
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}
