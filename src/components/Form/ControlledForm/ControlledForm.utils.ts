/* eslint-disable @typescript-eslint/consistent-type-assertions */
import type { UserWithConfirm } from '@/redux/user.ts';
import type { UseFormSetValue } from 'react-hook-form';
import { getRandomFormData } from '../utils.ts';
import type { ControlledFormInputs } from './ControlledForm.tsx';

export const generateControlledFormData = (
  setValue: UseFormSetValue<ControlledFormInputs>,
): void => {
  Object.entries(getRandomFormData()).forEach(([key, value]) => {
    setValue(key as keyof UserWithConfirm, value, { shouldValidate: true });
  });
};
