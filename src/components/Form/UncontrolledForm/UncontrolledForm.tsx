/* eslint-disable max-lines-per-function */
import { deleteProperties, fileToBase64, getFormData } from '@/common/utils/index.ts';
import { useAppDispatch, useCountryList } from '@/redux/hooks.ts';
import { Gender, LabelName } from '@/redux/user.ts';
import { addUser } from '@/redux/usersSlice.ts';
import clsx from 'clsx';
import type { FormEvent } from 'react';
import { useRef, useState, type ReactNode } from 'react';
import {
  AGREEMENT_TEXT,
  COUNTRY_LIST_PLACEHOLDER,
  GENERATE_BTN_TEXT,
  SHOW_PASSWORD_TEXT,
  SUBMIT_BTN_TEXT,
} from '../constants.ts';
import styles from '../styles.module.scss';
import { generateUncontrolledFormDataRandomly } from '../utils.ts';
import { FILE_VALID_TYPES } from '../validation/validation.constants.ts';
import type { PasswordStrength } from '../validation/validation.utils.ts';
import {
  getPasswordStrength,
  validateUserFormData,
  type UserFieldErrors,
} from '../validation/validation.utils.ts';

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
      generateUncontrolledFormDataRandomly(formRef.current);
      const strength = getPasswordStrength(passwordInputRef.current?.value ?? '');
      if (strength !== 'weak') {
        setErrors(deleteProperties(errors, 'password', 'confirm'));
      }
      setPasswordStrength(strength);
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const result = validateUserFormData(getFormData(e));

    const passStrength = getPasswordStrength(passwordInputRef.current?.value ?? '');
    setPasswordStrength(passStrength);

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
    <div>
      <button className={styles.generate} onClick={handleGenerateClick}>
        {GENERATE_BTN_TEXT}
      </button>
      <form className={styles.form} onSubmit={e => void handleSubmit(e)} ref={formRef}>
        <label>
          <span>{LabelName.Name}</span>
          <input type='text' name={LabelName.Name} autoComplete='off' autoFocus />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </label>
        <label>
          <span>{LabelName.Age}</span>
          <input type='text' name={LabelName.Age} autoComplete='off' />
          {errors.age && <p className={styles.error}>{errors.age}</p>}
        </label>
        <label>
          <span>{LabelName.Email}</span>
          <input type='text' name={LabelName.Email} autoComplete='off' />
          {errors.email && <p className={styles.error}>{errors.email[0]}</p>}
        </label>
        <fieldset className={styles.fieldset}>
          <label>
            <span>{LabelName.Password}</span>
            <input
              type={showPassword ? 'text' : 'password'}
              name={LabelName.Password}
              ref={passwordInputRef}
            />
            {errors.password && <p className={styles.error}>{errors.password[0]}</p>}
            {!errors.password && passwordStrength !== 'weak' && (
              <p className={styles.strength}>{`Password: ${passwordStrength}`}</p>
            )}
          </label>
          <label>
            <span>{LabelName.Confirm}</span>
            <input type={showPassword ? 'text' : 'password'} name={LabelName.Confirm} />
            {errors.confirm && <p className={styles.error}>{errors.confirm}</p>}
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
            name={LabelName.Country}
            list='countries'
            autoComplete='off'
            placeholder={COUNTRY_LIST_PLACEHOLDER}
          />
          <datalist id='countries'>
            {countryList.map(item => {
              return <option key={item} value={item} />;
            })}
          </datalist>
          {errors.country && <p className={styles.error}>{errors.country}</p>}
        </label>
        <div className={styles.gender}>
          <label className={styles.label}>
            <input type='radio' name={LabelName.Gender} value={Gender.Male} defaultChecked />
            <span>{Gender.Male}</span>
          </label>
          <label className={styles.label}>
            <input type='radio' name={LabelName.Gender} value={Gender.Female} />
            <span>{Gender.Female}</span>
          </label>
        </div>
        <label>
          <span>{LabelName.Avatar}</span>
          <input name={LabelName.Avatar} type='file' accept={FILE_VALID_TYPES.join()} />
          {errors.avatar && <p className={styles.error}>{errors.avatar}</p>}
        </label>
        <label className={clsx(styles.label, styles.terms)}>
          <input type='checkbox' name={LabelName.Agreement} />
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
