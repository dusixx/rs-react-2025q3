import { useEffect } from 'react';
import { scrollLock } from './BodyScrollLock.utils.ts';

export const BodyScrollLock = (): undefined => {
  useEffect(() => {
    scrollLock.lock();
    return (): void => {
      scrollLock.unlock();
    };
  }, []);
};
