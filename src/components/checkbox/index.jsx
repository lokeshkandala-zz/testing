import styles from "./checkbox.module.css";
export function Checkbox({ checked = false, onClick }) {
  const onSelect = (event) => {
    event.preventDefault();
    onClick(!checked);
  };
  return (
    <label className={styles.container} onClick={onSelect}>
      <input type="checkbox" onChange={() => {}} checked={checked} />
      <span className={styles.checkmark}></span>
    </label>
  );
}
