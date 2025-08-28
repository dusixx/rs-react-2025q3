/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable max-lines-per-function */
import type { UserWithConfirm } from '@/common/types/user.ts';
import { Gender, InputLabel, isUser } from '@/common/types/user.ts';
import { fileToBase64, omit } from '@/common/utils/index.ts';
import { useAppDispatch, useCountryList } from '@/redux/hooks.ts';
import { addUser } from '@/redux/usersSlice.ts';
import { TestId } from '@/test-utils/constants.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import {
  AGREEMENT_TEXT,
  COUNTRY_LIST_PLACEHOLDER,
  GENERATE_BTN_TEXT,
  SHOW_PASSWORD_TEXT,
  SUBMIT_BTN_TEXT,
} from '../../constants.ts';
import styles from '../../styles.module.scss';
import { getPasswordStrength, getPasswordStrengthStyle } from '../../utils.ts';
import { userSchema } from '../../validation/user-schema.ts';
import {
  FILE_VALID_TYPES,
  NAME_MAX_LEN,
  PASSWORD_MAX_LEN,
} from '../../validation/validation.constants.ts';
import { Datalist } from '../Input/Datalist.tsx';
import { Input } from '../Input/Input.tsx';
import { generateControlledFormData } from './ControlledForm.utils.ts';

export type FormProps = {
  closeModal?: () => void;
};
export type ControlledFormInputs = Partial<
  Omit<UserWithConfirm, 'avatar'> & {
    avatar: File;
  }
>;
export const ControlledForm = ({ closeModal }: FormProps): ReactNode => {
  const countryList = useCountryList();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<ControlledFormInputs>({
    resolver: zodResolver(userSchema),
    mode: 'all',
  });
  const password = watch('password');
  const passwordStrength = getPasswordStrength(password ?? '');

  const handleGenerateClick = (): void => {
    generateControlledFormData(setValue);
  };

  const onSubmit = handleSubmit(async (data: ControlledFormInputs): Promise<void> => {
    const user = {
      ...omit(data, 'agreement', 'confirm'),
      avatar: data.avatar ? await fileToBase64(data.avatar) : '',
    };
    if (isUser(user)) {
      dispatch(addUser(user));
      closeModal?.();
    }
  });

  return (
    <div data-testid={TestId.FormControlled}>
      <button className={styles.generate} onClick={handleGenerateClick}>
        {GENERATE_BTN_TEXT}
      </button>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          {...register('name')}
          label={InputLabel.Name}
          autoFocus
          maxLength={NAME_MAX_LEN}
          error={errors.name?.message}
        />
        <Input {...register('age')} label={InputLabel.Age} error={errors.age?.message} />
        <Input {...register('email')} label={InputLabel.Email} error={errors.email?.message} />
        <fieldset className={styles.fieldset}>
          <Input
            {...register('password')}
            securely={!showPassword}
            label={InputLabel.Password}
            maxLength={PASSWORD_MAX_LEN}
            error={errors.password?.message}
          >
            {!errors.password && passwordStrength !== 'weak' && (
              <p className={styles.strength} style={getPasswordStrengthStyle(passwordStrength)}>
                password: {passwordStrength}
              </p>
            )}
          </Input>
          <Input
            {...register('confirm')}
            securely={!showPassword}
            nameLabel={InputLabel.Confirm}
            error={errors.confirm?.message}
          />
          <label className={styles.label}>
            <input
              type='checkbox'
              onChange={() => {
                setShowPassword(p => !p);
              }}
            />
            <span>{SHOW_PASSWORD_TEXT}</span>
          </label>
        </fieldset>
        <Datalist
          {...register('country')}
          options={countryList}
          label={InputLabel.Country}
          placeholder={COUNTRY_LIST_PLACEHOLDER}
          error={errors.country?.message}
        />
        <div className={styles.gender}>
          <label className={styles.label}>
            <input type='radio' {...register('gender')} value={Gender.Male} defaultChecked />
            <span>{Gender.Male}</span>
          </label>
          <label className={styles.label}>
            <input type='radio' {...register('gender')} value={Gender.Female} />
            <span>{Gender.Female}</span>
          </label>
        </div>
        <Input
          {...register('avatar')}
          type='file'
          label={InputLabel.Avatar}
          accept={FILE_VALID_TYPES.join()}
          error={errors.avatar?.message}
        />
        <label className={clsx(styles.label, styles.terms)}>
          <input type='checkbox' {...register('agreement')} />
          <span>{AGREEMENT_TEXT}</span>
          {errors.agreement && <p className={styles.error}>{errors.agreement.message}</p>}
        </label>
        <button className={styles.btn} type='submit' disabled={!isValid}>
          {SUBMIT_BTN_TEXT}
        </button>
      </form>
    </div>
  );
};
