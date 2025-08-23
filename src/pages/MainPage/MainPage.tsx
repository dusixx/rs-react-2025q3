import { ControlledForm } from '@/components/Form/ControlledForm.tsx';
import { UncontrolledForm } from '@/components/Form/UncontrolledForm';
import { Modal } from '@/components/Modal/Modal.tsx';
import { useState, type ReactNode } from 'react';
import styles from './MainPage.module.scss';

const CONTROLLED_BTN_TEXT = 'Controlled';
const UNCONTROLLED_BTN_TEXT = 'Uncontrolled';

export default function MainPage(): ReactNode {
  const [open, setOpen] = useState(true);
  const [controlled, setControlled] = useState(true);

  const handleClick = (controlled: boolean = false): void => {
    setControlled(controlled);
    setOpen(true);
  };
  return (
    <>
      <div className={styles.group}>
        <button
          className={styles.btn}
          onClick={() => {
            handleClick();
          }}
        >
          {UNCONTROLLED_BTN_TEXT}
        </button>
        <button
          className={styles.btn}
          onClick={() => {
            handleClick(true);
          }}
        >
          {CONTROLLED_BTN_TEXT}
        </button>
      </div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        {controlled ? <ControlledForm /> : <UncontrolledForm />}
      </Modal>
    </>
  );
}
