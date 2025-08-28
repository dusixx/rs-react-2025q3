import { CardList } from '@/components/CardList/CardList.tsx';
import { ControlledForm } from '@/components/Form/components/ControlledForm/ControlledForm';
import { UncontrolledForm } from '@/components/Form/components/UncontrolledForm/UncontrolledForm';
import { Modal } from '@/components/Modal/Modal.tsx';
import { useUserList } from '@/redux/hooks.ts';
import { TestId } from '@/test-utils/constants.ts';
import { useState, type ReactNode } from 'react';
import styles from './MainPage.module.scss';

export const CONTROLLED_TEXT = 'Controlled form';
export const UNCONTROLLED_TEXT = 'Uncontrolled form';

export default function MainPage(): ReactNode {
  const [open, setOpen] = useState(false);
  const [controlled, setControlled] = useState(true);

  const users = useUserList();
  const usersLen = Object.keys(users).length;

  const handleClick = (controlled: boolean = false): void => {
    setControlled(controlled);
    setOpen(true);
  };
  const closeModal = (): void => {
    setOpen(false);
  };
  return (
    <div data-testid={TestId.MainPage}>
      <div className={styles.header}>
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
      {usersLen > 0 && <CardList users={users} />}
      <Modal className={styles['modal-content']} open={open} onClose={closeModal}>
        <p className={styles.heading}>
          ~ <b>{controlled ? CONTROLLED_TEXT : UNCONTROLLED_TEXT}</b> ~
        </p>
        {controlled ? (
          <ControlledForm closeModal={closeModal} />
        ) : (
          <UncontrolledForm closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
}
