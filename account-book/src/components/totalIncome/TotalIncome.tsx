import styles from "./TotalIncome.module.scss";

export const TotalIncome = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftContainer}>収入合計：</div>
      <div className={styles.rightContainer}>￥34,000</div>
    </div>
  );
};
