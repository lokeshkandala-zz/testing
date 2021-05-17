import styles from "./badge.module.css";
export const BADGE_TYPES = {
  RED: "red",
  YELLOW: "yellow",
  GREEN: "green",
};
export function Badge({ type = BADGE_TYPES.GREEN, content }) {
  return <div className={`${styles.container} ${styles[type]}`}>{content}</div>;
}
