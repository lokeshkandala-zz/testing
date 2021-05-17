import { useHomeStoreAPi } from "../../home.store";
import { FOLDER_OPTIONS, CATEGORIES_OPTIONS, LABELS } from "./constants";
import { ReactComponent as LabelIcon } from "./icons/label.svg";
import styles from "./sidebar.module.css";

export function Sidebar() {
  return (
    <div className={styles.container}>
      <button
        className={styles.composeMailButton}
        onClick={() => {
          useHomeStoreAPi.getState().setOpenComposeMail(true);
        }}
      >
        Compose Mail
      </button>
      <div>
        <div className={styles.foldersTitle}>FOLDERS</div>
        {FOLDER_OPTIONS.map((option) => (
          <div
            key={option.id}
            className={styles.folderItem}
            onClick={() => {
              useHomeStoreAPi.getState().setMailNavItem(option.id);
            }}
          >
            <option.Icon className={styles.folderIcon} />
            <span>{option.label}</span>
          </div>
        ))}
      </div>
      <div>
        <div className={styles.foldersTitle}>CATEGORIES</div>
        {CATEGORIES_OPTIONS.map((option) => (
          <div key={option.id} className={styles.categoryItem}>
            <div className={`${styles.circle} ${styles[option.color]}`} />
            <span>{option.label}</span>
          </div>
        ))}
      </div>
      <div>
        <div className={styles.foldersTitle}>LABELS</div>
        <div className={styles.labelsContainer}>
          {LABELS.map((option) => (
            <div key={option.id} className={styles.labelContainer}>
              <LabelIcon className={styles.labelIcon} />
              <span>{option}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
