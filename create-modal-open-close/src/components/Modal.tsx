import styles from './Modal.module.css';

type Props = {
  show: any;
  setShow: any;
};

export const Modal = (props: Props) => {
  const { setShow } = props;

  // モーダルの外をクリックした際に状態変数をfalseにし閉じさせる
  const closeModal = () => {
    setShow(false);
  };

  if (props.show) {
    return (
      <div
        id={styles.overlay}
        onClick={closeModal}>
        <div id={styles.content}>
          <p>これがモーダルウィンドウです</p>
          <p>
            <button onClick={() => setShow(false)}>Close</button>
          </p>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
