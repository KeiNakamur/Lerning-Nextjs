import styles from "./TotalExpence.module.scss";

export const TotalExpence = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftContainer}>支出合計：</div>
      <div className={styles.rightContainer}>￥34,000</div>
    </div>
  );
};
