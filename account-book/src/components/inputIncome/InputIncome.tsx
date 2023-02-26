import { Button } from "@mui/material";
import styles from "./InputIncome.module.scss";

export const InputIncome = () => {
  // todo varidation 整数以外を入力した際にバリーデーションエラーを表示させる
  const submit = () => {};

  return (
    <form className={styles.wrapper}>
      <div className={styles.incomeDescription}>
        <span>詳細</span>
        <input type="text" placeholder="収入の詳細を入力してください" />
      </div>
      <div className={styles.leftContainer}>
        <span>￥</span>
        <input type="string" placeholder="今月の収入を入力してください" />
      </div>
      <Button variant="contained" onSubmit={() => submit()}>
        確定
      </Button>
    </form>
  );
};
