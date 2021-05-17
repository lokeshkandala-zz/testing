import { useRef } from "react";
import ReactDOM from "react-dom";

import styles from "./compose.module.css";

export function Compose({ isOpen, onClose, onSend }) {
  const toRef = useRef(null);
  const subjectRef = useRef(null);
  const bodyRef = useRef(null);
  const sendMessage = () => {
    const to = toRef.current.value;
    const subject = subjectRef.current.value;
    const body = bodyRef.current.value;
    if (to.length) {
      onSend({ to, subject, body });
    }
  };
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className={styles.composeContainer}>
      <header className={styles.header}>New message</header>
      <div className={styles.mailInputs}>
        <input className={styles.mailInput} placeholder="To" ref={toRef} />
        <input
          className={styles.mailInput}
          placeholder="Subject"
          ref={subjectRef}
        />
        <textarea className={styles.mailTextarea} ref={bodyRef} />
      </div>
      <footer className={styles.footer}>
        <button className={styles.senButton} onClick={sendMessage}>
          send
        </button>
        <button className={styles.closeButton} onClick={onClose}>
          close
        </button>
      </footer>
    </div>,
    document.body
  );
}
