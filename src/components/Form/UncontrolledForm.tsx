/* eslint-disable max-lines-per-function */
import { fileToBase64, getFormData } from '@/common/utils/index.ts';
import { useAppDispatch, useCountries, useUsers } from '@/redux/hooks.ts';
import { Gender, LabelName } from '@/redux/user.ts';
import { addUser } from '@/redux/usersSlice.ts';
import clsx from 'clsx';
import type { FormEvent } from 'react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './styles.module.scss';
import { VALID_FILE_TYPES } from './validation/validation.constants.ts';
import { validateUserFormData, type UserFieldErrors } from './validation/validation.ts';

const ERR_EMAIL_ALREADY_EXISTS = 'User with this email already exists';
const AGREEMENT = 'Accept the terms of the agreement ';
const SHOW_PASSWORD = 'Show password';
const SUBMIT_BTN_TEXT = 'Add';

export const UncontrolledForm = (): ReactNode => {
  const [errors, setErrors] = useState<UserFieldErrors>({});
  const [exists, setExists] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const maleInputRef = useRef<HTMLInputElement>(null);
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const result = validateUserFormData(getFormData(e));

    if (result.success) {
      const user = {
        ...result.data,
        avatar: await fileToBase64(result.data.avatar),
      };
      const alreadyExists = Boolean(users[user.email]);
      setExists(alreadyExists);

      if (!alreadyExists) {
        dispatch(addUser(user));
        setErrors({});
      }
    } else {
      setErrors(result.fieldErrors);
    }
  };
  return (
    <form className={styles.form} onSubmit={e => void handleSubmit(e)}>
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
      <fieldset className={styles.group}>
        <label>
          <span>{LabelName.Password}</span>
          <input type={showPassword ? 'text' : 'password'} name={LabelName.Password} />
          {errors.password && <p className={styles.error}>{errors.password[0]}</p>}
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
          <span>{SHOW_PASSWORD}</span>
        </label>
      </fieldset>
      <label>
        <span>{LabelName.Country}</span>
        <input name='country' list='countries' autoComplete='off' />
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
          <input type='radio' name={LabelName.Gender} value={Gender.Female} />
          <span>{Gender.Female}</span>
        </label>
      </div>
      <label>
        <span>{LabelName.Avatar}</span>
        <input name={LabelName.Avatar} type='file' accept={VALID_FILE_TYPES.join()} />
        {errors.avatar && <p className={styles.error}>{errors.avatar}</p>}
      </label>
      <label className={clsx(styles.label, styles.terms)}>
        <input type='checkbox' name={LabelName.Agreement} />
        <span>{AGREEMENT}</span>
        {errors.agreement && <p className={styles.error}>{errors.agreement}</p>}
      </label>
      <button className={styles.btn} type='submit'>
        {SUBMIT_BTN_TEXT}
      </button>
    </form>
  );
};
