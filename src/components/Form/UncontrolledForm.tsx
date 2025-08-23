/* eslint-disable max-lines-per-function */
import { fileToBase64, getFormData, rndInt } from '@/common/utils/index.ts';
import { useAppDispatch, useCountries, useUsers } from '@/redux/hooks.ts';
import { Gender, LabelName } from '@/redux/user.ts';
import { addUser } from '@/redux/usersSlice.ts';
import clsx from 'clsx';
import type { FormEvent } from 'react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './styles.module.scss';
import { generateFormDataRandomly } from './utils.ts';
import { FILE_VALID_TYPES } from './validation/validation.constants.ts';
import type { PasswordStrength } from './validation/validation.utils.ts';
import {
  getPasswordStrength,
  validateUserFormData,
  type UserFieldErrors,
} from './validation/validation.utils.ts';

const ERR_EMAIL_ALREADY_EXISTS = 'User with this email already exists';
const AGREEMENT_TEXT = 'Accept the terms of the agreement ';
const SHOW_PASSWORD_TEXT = 'Show password';
const SUBMIT_BTN_TEXT = 'Append';
const GENERATE_BTN_TEXT = 'Generate randomly';
const COUTRY_LIST_PLACEHOLDER = 'Select country...';

export type FormProps = {
  closeModal?: () => void;
};

export const UncontrolledForm = ({ closeModal }: FormProps): ReactNode => {
  const [errors, setErrors] = useState<UserFieldErrors>({});
  const [exists, setExists] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>('weak');

  const nameInputRef = useRef<HTMLInputElement>(null);
  const maleInputRef = useRef<HTMLInputElement>(null);
  const femaleInputRef = useRef<HTMLInputElement>(null);
  const termInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const countryList = useCountries();
  const dispatch = useAppDispatch();
  const users = useUsers();

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
    if (maleInputRef.current) {
      maleInputRef.current.checked = true;
    }
  }, []);

  const handleGenerateClick = (): void => {
    const { current: form } = formRef;
    const genderInputRef = rndInt(0, 1) ? maleInputRef : femaleInputRef;
    if (form) {
      if (termInputRef.current) {
        termInputRef.current.checked = true;
      }
      if (genderInputRef.current) {
        genderInputRef.current.checked = true;
      }
      generateFormDataRandomly(form);
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
      const alreadyExists = Boolean(users[user.email]);
      setExists(alreadyExists);
      if (!alreadyExists) {
        dispatch(addUser(user));
        closeModal?.();
      }
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
          <input type='text' ref={nameInputRef} name={LabelName.Name} autoComplete='off' />
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
          {errors.email && <p className={styles.error}>{errors.email}</p>}
          {exists && <p className={styles.error}>{ERR_EMAIL_ALREADY_EXISTS}</p>}
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
            {passwordStrength !== 'weak' && (
              <p
                className={styles.error}
                style={{ color: 'var(--color-green)' }}
              >{`Password: ${passwordStrength}`}</p>
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
            name='country'
            list='countries'
            autoComplete='off'
            placeholder={COUTRY_LIST_PLACEHOLDER}
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
            <input type='radio' name={LabelName.Gender} value={Gender.Male} ref={maleInputRef} />
            <span>{Gender.Male}</span>
          </label>
          <label className={styles.label}>
            <input
              type='radio'
              name={LabelName.Gender}
              value={Gender.Female}
              ref={femaleInputRef}
            />
            <span>{Gender.Female}</span>
          </label>
        </div>
        <label>
          <span>{LabelName.Avatar}</span>
          <input name={LabelName.Avatar} type='file' accept={FILE_VALID_TYPES.join()} />
          {errors.avatar && <p className={styles.error}>{errors.avatar}</p>}
        </label>
        <label className={clsx(styles.label, styles.terms)}>
          <input type='checkbox' name={LabelName.Agreement} ref={termInputRef} />
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
