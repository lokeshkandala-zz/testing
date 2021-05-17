import { useUserStore } from "../../../stores/user.store";
import { ReactComponent as TrashIcon } from "./trash.svg";
import styles from "./toolbar.module.css";

export function Toolbar({ onDelete }) {
  const unReadMailsCount = useUserStore((state) => state.unReadMailsCount);
  return (
    <div className={styles.toolbar}>
      <div className={styles.header}>
        <span>{`Inbox(${unReadMailsCount})`}</span>
        <div className={styles.searchBar}>
          <input placeholder="Search mail" />
          <div>Search</div>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.actionButton}>Refresh</button>
        <button className={styles.actionButton} onClick={onDelete}>
          <TrashIcon className={styles.actionIcon} />
        </button>
      </div>
    </div>
  );
}
