import styles from "./Balance.module.scss";

export const Balance = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftContainer}>残高：　</div>
      <div className={styles.rightContainer}>￥1,000</div>
    </div>
  );
};
