import styles from "./notificationbadge.module.css";
export function NotificationBadge({ Badge, Icon }) {
  return (
    <div className={styles.container}>
      <Icon className={styles.icon} />
      <div className={styles.badge}>
        <Badge />
      </div>
    </div>
  );
}
