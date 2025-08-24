import { CardList } from '@/components/CardList/CardList.tsx';
import { ControlledForm } from '@/components/Form/ControlledForm/ControlledForm';
import { UncontrolledForm } from '@/components/Form/UncontrolledForm/UncontrolledForm';
import { Modal } from '@/components/Modal/Modal.tsx';
import { useState, type ReactNode } from 'react';
import styles from './MainPage.module.scss';

const CONTROLLED_TEXT = 'Controlled';
const UNCONTROLLED_TEXT = 'Uncontrolled';

export default function MainPage(): ReactNode {
  const [open, setOpen] = useState(false);
  const [controlled, setControlled] = useState(true);

  const handleClick = (controlled: boolean = false): void => {
    setControlled(controlled);
    setOpen(true);
  };
  const closeModal = (): void => {
    setOpen(false);
  };
  return (
    <>
      <div className={styles.btns}>
        <div className={styles.group}>
          <button
            className={styles.btn}
            onClick={() => {
              handleClick();
            }}
          >
            {UNCONTROLLED_TEXT}
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              handleClick(true);
            }}
          >
            {CONTROLLED_TEXT}
          </button>
        </div>
      </div>
      <CardList />
      <Modal
        className={styles['modal-content']}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <p className={styles.heading}>
          ~ <b>{controlled ? CONTROLLED_TEXT : UNCONTROLLED_TEXT}</b> ~
        </p>
        {controlled ? (
          <ControlledForm closeModal={closeModal} />
        ) : (
          <UncontrolledForm closeModal={closeModal} />
        )}
      </Modal>
    </>
  );
}
