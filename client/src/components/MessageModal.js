import Button from "./Button";
import styles from "./MessageModal.module.css";

function MessageModal({ message, onClose }) {
  return (
    <>
      <p className={styles.message}>{message}</p>
      <Button onClick={onClose}>Okay</Button>
    </>
  );
}

export default MessageModal;