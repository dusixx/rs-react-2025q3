/* eslint-disable max-lines-per-function */
import { Gender, InputLabel } from '@/common/types/user.ts';
import { fileToBase64, getFormData, omit } from '@/common/utils/index.ts';
import { useAppDispatch, useCountryList } from '@/redux/hooks.ts';
import { addUser } from '@/redux/usersSlice.ts';
import { TestId } from '@/test-utils/constants.ts';
import clsx from 'clsx';
import type { FormEvent } from 'react';
import { useRef, useState, type ReactNode } from 'react';
import {
  AGREEMENT_TEXT,
  COUNTRY_LIST_PLACEHOLDER,
  GENERATE_BTN_TEXT,
  SHOW_PASSWORD_TEXT,
  SUBMIT_BTN_TEXT,
} from '../../constants.ts';
import styles from '../../styles.module.scss';
import type { PasswordStrength } from '../../utils.ts';
import { getPasswordStrength, getPasswordStrengthStyle } from '../../utils.ts';
import {
  FILE_VALID_TYPES,
  NAME_MAX_LEN,
  PASSWORD_MAX_LEN,
} from '../../validation/validation.constants.ts';
import { Input } from '../Input/Input.tsx';
import type { UserFieldErrors } from './UncontrolledForm.utils.ts';
import { generateUncontrolledFormData, validateUserFormData } from './UncontrolledForm.utils.ts';

export type FormProps = {
  closeModal?: () => void;
};

export const UncontrolledForm = ({ closeModal }: FormProps): ReactNode => {
  const dispatch = useAppDispatch();
  const countryList = useCountryList();

  const [errors, setErrors] = useState<UserFieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>('weak');

  const formRef = useRef<HTMLFormElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleGenerateClick = (): void => {
    if (formRef.current) {
      generateUncontrolledFormData(formRef.current);
      const strength = getPasswordStrength(passwordInputRef.current?.value ?? '');
      if (strength !== 'weak') {
        setErrors(omit(errors, 'password', 'confirm'));
      }
      setPasswordStrength(strength);
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const result = validateUserFormData(getFormData(e));

    const strength = getPasswordStrength(passwordInputRef.current?.value ?? '');
    setPasswordStrength(strength);

    if (result.success) {
      setErrors({});
      const user = {
        ...result.data,
        avatar: await fileToBase64(result.data.avatar),
      };
      dispatch(addUser(user));
      closeModal?.();
    } else {
      setErrors(result.fieldErrors);
    }
  };
  return (
    <div data-testid={TestId.FormUncontrolled}>
      <button className={styles.generate} onClick={handleGenerateClick}>
        {GENERATE_BTN_TEXT}
      </button>
      <form className={styles.form} onSubmit={e => void handleSubmit(e)} ref={formRef}>
        <Input nameLabel={InputLabel.Name} error={errors.name} maxLength={NAME_MAX_LEN} autoFocus />
        <Input nameLabel={InputLabel.Age} error={errors.age} />
        <Input nameLabel={InputLabel.Email} error={errors.email} />
        <fieldset className={styles.fieldset}>
          <Input
            securely={!showPassword}
            nameLabel={InputLabel.Password}
            ref={passwordInputRef}
            maxLength={PASSWORD_MAX_LEN}
            error={errors.password}
          >
            {!errors.password && passwordStrength !== 'weak' && (
              <p className={styles.strength} style={getPasswordStrengthStyle(passwordStrength)}>
                password: {passwordStrength}
              </p>
            )}
          </Input>
          <Input securely={!showPassword} nameLabel={InputLabel.Confirm} error={errors.confirm} />
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
        <Input
          nameLabel={InputLabel.Country}
          list='countries'
          placeholder={COUNTRY_LIST_PLACEHOLDER}
          error={errors.country}
        >
          <datalist id='countries'>
            {countryList.map(item => {
              return <option key={item} value={item} />;
            })}
          </datalist>
        </Input>
        <div className={styles.gender}>
          <label className={styles.label}>
            <input type='radio' name={InputLabel.Gender} value={Gender.Male} defaultChecked />
            <span>{Gender.Male}</span>
          </label>
          <label className={styles.label}>
            <input type='radio' name={InputLabel.Gender} value={Gender.Female} />
            <span>{Gender.Female}</span>
          </label>
        </div>
        <Input
          type='file'
          nameLabel={InputLabel.Avatar}
          accept={FILE_VALID_TYPES.join()}
          error={errors.avatar}
        />
        <label className={clsx(styles.label, styles.terms)}>
          <input type='checkbox' name={InputLabel.Agreement} />
          <span>{AGREEMENT_TEXT}</span>
          {errors.agreement && <p className={styles.error}>{errors.agreement}</p>}
        </label>
        <button className={styles.btn} type='submit'>
          {SUBMIT_BTN_TEXT}
        </button>
      </form>
    </div>
  );
};
