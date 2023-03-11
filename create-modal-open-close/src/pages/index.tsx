import { Modal } from '@/components/Modal';
import { useState } from 'react';

export default function Home() {
  // modalを表示、非表示にする状態管理
  const [show, setShow] = useState(false);
  const openModal = () => {
    setShow(true);
  };
  return (
    <>
      <div>
        <button onClick={() => openModal()}>Click</button>
        <Modal
          show={show}
          setShow={setShow}
        />
      </div>
    </>
  );
}
