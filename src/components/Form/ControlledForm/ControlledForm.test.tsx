import { fileToBase64 } from '@/common/utils/index.ts';
import { LabelName } from '@/redux/user.ts';
import { addUser } from '@/redux/usersSlice.ts';
import { appDispatchMock } from '@/test-utils/mocks/redux-hook-mock.ts';
import { userSchemaMock } from '@/test-utils/mocks/user-schema-mock.ts';
import { render, screen, waitFor } from '@testing-library/react';
import { clickElement, FAKE_VALUE, getNestedChild } from 'src/test-utils/index.ts';
import { ProvidersMock } from 'src/test-utils/mocks/provider-mock.tsx';
import { expect, vi } from 'vitest';
import { GENERATE_BTN_TEXT, SHOW_PASSWORD_TEXT, SUBMIT_BTN_TEXT } from '../constants.ts';
import {
  changeAllFormTextInputs,
  DEFAULT_GENDER,
  REGEX_STRONG_PASSWORD_LABEL,
  testLabelsRendered,
} from '../test-utils.ts';
import { getPasswordStrength } from '../utils.ts';
import { ControlledForm } from './ControlledForm.tsx';
import { generateControlledFormData } from './ControlledForm.utils.ts';

vi.mock('./ControlledForm.utils.ts', async () => {
  const actual = await vi.importActual('./ControlledForm.utils.ts');
  return {
    ...actual,
    generateControlledFormData: vi.fn(),
  };
});
vi.mock('@/common/utils/index.ts', async () => {
  const actual = await vi.importActual('@/common/utils/index.ts');
  return {
    ...actual,
    fileToBase64: vi.fn(),
  };
});
vi.mock('../utils.ts', async () => {
  const actual = await vi.importActual('../utils.ts');
  return {
    ...actual,
    getPasswordStrength: vi.fn(),
  };
});
vi.mock('../validation/user-schema.ts', async () => {
  const actual = await vi.importActual('../validation/user-schema.ts');
  return {
    ...actual,
    userSchema: userSchemaMock,
  };
});

describe('ControlledForm', () => {
  it(`Renders correctly`, () => {
    render(<ControlledForm />, {
      wrapper: ProvidersMock,
    });
    expect(getNestedChild('FormControlled')).toBeInTheDocument();
    testLabelsRendered();
  });

  it('Generates data randomly', () => {
    render(<ControlledForm />, {
      wrapper: ProvidersMock,
    });
    const generateBtn = screen.getByText(GENERATE_BTN_TEXT);
    clickElement(generateBtn);
    expect(generateControlledFormData).toHaveBeenCalled();
  });

  it('Handles submission', async () => {
    const closeModal = vi.fn();
    vi.mocked(getPasswordStrength).mockReturnValue('weak');
    render(<ControlledForm closeModal={closeModal} />, {
      wrapper: ProvidersMock,
    });
    const user = changeAllFormTextInputs(FAKE_VALUE);

    const submitBtn = screen.getByText(SUBMIT_BTN_TEXT);
    submitBtn.removeAttribute('disabled');
    clickElement(submitBtn);

    await waitFor(() => {
      expect(fileToBase64).toHaveBeenCalled();
    });
    expect(appDispatchMock).toHaveBeenCalledWith({
      type: addUser.type,
      payload: {
        ...user,
        gender: DEFAULT_GENDER,
      },
    });
    expect(closeModal).toHaveBeenCalled();
  });

  it('Reveals password', () => {
    vi.mocked(getPasswordStrength).mockReturnValue('weak');
    render(<ControlledForm />, {
      wrapper: ProvidersMock,
    });
    const passwordInput = screen.getByLabelText(LabelName.Password);
    expect(passwordInput).toHaveProperty('type', 'password');

    const showPassword = screen.getByText(SHOW_PASSWORD_TEXT);
    clickElement(showPassword);
    expect(passwordInput).toHaveProperty('type', 'text');
  });

  it('Displays password strength', () => {
    vi.mocked(getPasswordStrength).mockReturnValue('strong');
    render(<ControlledForm />, {
      wrapper: ProvidersMock,
    });
    expect(screen.getByText(REGEX_STRONG_PASSWORD_LABEL)).toBeInTheDocument();
  });
});
