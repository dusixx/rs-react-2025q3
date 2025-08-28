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
import { Checkbox } from '../Input/components/Checkbox.tsx';
import { Datalist } from '../Input/components/Datalist.tsx';
import { Radio } from '../Input/components/Radio.tsx';
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
        <Input
          name={InputLabel.Name}
          label={InputLabel.Name}
          error={errors.name}
          maxLength={NAME_MAX_LEN}
          autoFocus
        />
        <Input name={InputLabel.Age} label={InputLabel.Age} error={errors.age} />
        <Input name={InputLabel.Email} label={InputLabel.Email} error={errors.email} />
        <fieldset className={styles.fieldset}>
          <Input
            securely={!showPassword}
            name={InputLabel.Password}
            label={InputLabel.Password}
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
          <Input
            securely={!showPassword}
            name={InputLabel.Confirm}
            label={InputLabel.Confirm}
            error={errors.confirm}
          />
          <Checkbox
            label={SHOW_PASSWORD_TEXT}
            className={styles.label}
            onChange={() => {
              setShowPassword(p => !p);
            }}
          />
        </fieldset>
        <Datalist
          options={countryList}
          name={InputLabel.Country}
          label={InputLabel.Country}
          placeholder={COUNTRY_LIST_PLACEHOLDER}
          error={errors.country}
        />
        <div className={styles.gender}>
          <Radio
            className={styles.label}
            name={InputLabel.Gender}
            value={Gender.Male}
            label={Gender.Male}
            defaultChecked
          />
          <Radio
            className={styles.label}
            name={InputLabel.Gender}
            value={Gender.Female}
            label={Gender.Female}
          />
        </div>
        <Input
          type='file'
          name={InputLabel.Avatar}
          label={InputLabel.Avatar}
          accept={FILE_VALID_TYPES.join()}
          error={errors.avatar}
        />
        <Checkbox
          className={clsx(styles.label, styles.terms)}
          error={errors.agreement}
          label={AGREEMENT_TEXT}
          name={InputLabel.Agreement}
        />
        <button className={styles.btn} type='submit'>
          {SUBMIT_BTN_TEXT}
        </button>
      </form>
    </div>
  );
};
