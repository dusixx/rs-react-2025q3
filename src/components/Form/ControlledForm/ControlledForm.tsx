/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable max-lines-per-function */
import { deleteProperties, fileToBase64 } from '@/common/utils/index.ts';
import { useAppDispatch, useCountryList } from '@/redux/hooks.ts';
import type { UserWithConfirm } from '@/redux/user.ts';
import { Gender, isUser, LabelName } from '@/redux/user.ts';
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
} from '../constants.ts';
import styles from '../styles.module.scss';
import { getPasswordStrength, getPasswordStrengthStyle } from '../utils.ts';
import { userSchema } from '../validation/user-schema.ts';
import { FILE_VALID_TYPES } from '../validation/validation.constants.ts';
import { generateControlledFormData } from './ControlledForm.utils.ts';

export type FormProps = {
  closeModal?: () => void;
};
export type ControlledFormInputs = Partial<UserWithConfirm> & {
  avatar?: File;
};

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
      ...deleteProperties(data, 'agreement', 'confirm'),
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
        <label>
          <span>{LabelName.Name}</span>
          <input type='text' {...register('name')} autoComplete='off' autoFocus />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </label>
        <label>
          <span>{LabelName.Age}</span>
          <input type='text' {...register('age')} autoComplete='off' />
          {errors.age && <p className={styles.error}>{errors.age.message}</p>}
        </label>
        <label>
          <span>{LabelName.Email}</span>
          <input type='text' {...register('email')} autoComplete='off' />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </label>
        <fieldset className={styles.fieldset}>
          <label>
            <span>{LabelName.Password}</span>
            <input type={showPassword ? 'text' : 'password'} {...register('password')} />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            {!errors.password && passwordStrength !== 'weak' && (
              <p className={styles.strength} style={getPasswordStrengthStyle(passwordStrength)}>
                password: {passwordStrength}
              </p>
            )}
          </label>
          <label>
            <span>{LabelName.Confirm}</span>
            <input type={showPassword ? 'text' : 'password'} {...register('confirm')} />
            {errors.confirm && <p className={styles.error}>{errors.confirm.message}</p>}
          </label>
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
        <label>
          <span>{LabelName.Country}</span>
          <input
            list='countries'
            autoComplete='off'
            placeholder={COUNTRY_LIST_PLACEHOLDER}
            {...register('country')}
          />
          <datalist id='countries'>
            {countryList.map(item => {
              return <option key={item} value={item} />;
            })}
          </datalist>
          {errors.country && <p className={styles.error}>{errors.country.message}</p>}
        </label>
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
        <label>
          <span>{LabelName.Avatar}</span>
          <input {...register('avatar')} type='file' accept={FILE_VALID_TYPES.join()} />
          {errors.avatar && <p className={styles.error}>{errors.avatar.message}</p>}
        </label>
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
