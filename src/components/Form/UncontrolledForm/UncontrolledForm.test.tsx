import { fileToBase64 } from '@/common/utils/index.ts';
import { LabelName } from '@/redux/user.ts';
import { addUser } from '@/redux/usersSlice.ts';
import { appDispatchMock } from '@/test-utils/mocks/redux-hook-mock.ts';
import {
  FAKE_FIELD_ERROR,
  fieldErrorsMock,
  userFormDataMock,
} from '@/test-utils/mocks/user-mock.ts';
import { act, render, screen, waitFor } from '@testing-library/react';
import { changeInput, clickElement, FAKE_VALUE, getNestedChild } from 'src/test-utils/index.ts';
import { ProvidersMock } from 'src/test-utils/mocks/provider-mock.tsx';
import { expect, vi } from 'vitest';
import { GENERATE_BTN_TEXT, SHOW_PASSWORD_TEXT, SUBMIT_BTN_TEXT } from '../constants.ts';
import { testLabelsRendered } from '../test-utils.ts';
import { getPasswordStrength } from '../utils.ts';
import { UncontrolledForm } from './UncontrolledForm.tsx';
import { generateUncontrolledFormData, validateUserFormData } from './UncontrolledForm.utils.ts';

vi.mock('./UncontrolledForm.utils.ts', async () => {
  const actual = await vi.importActual('./UncontrolledForm.utils.ts');
  return {
    ...actual,
    validateUserFormData: vi.fn(),
    generateUncontrolledFormData: vi.fn(),
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

describe('UncontrolledForm', () => {
  it(`Renders correctly`, async () => {
    render(<UncontrolledForm />, {
      wrapper: ProvidersMock,
    });
    expect(getNestedChild('FormUncontrolled')).toBeInTheDocument();
    testLabelsRendered();
  });

  it('Generates data randomly', () => {
    render(<UncontrolledForm />, {
      wrapper: ProvidersMock,
    });
    const generateBtn = screen.getByText(GENERATE_BTN_TEXT);
    clickElement(generateBtn);
    expect(generateUncontrolledFormData).toHaveBeenCalled();
  });

  it('Reveals password', () => {
    render(<UncontrolledForm />, {
      wrapper: ProvidersMock,
    });
    const passwordInput = screen.getByLabelText(LabelName.Password);
    expect(passwordInput).toHaveProperty('type', 'password');

    const showPassword = screen.getByText(SHOW_PASSWORD_TEXT);
    clickElement(showPassword);
    expect(passwordInput).toHaveProperty('type', 'text');
  });

  it('Handles submission', async () => {
    const closeModal = vi.fn();
    vi.mocked(fileToBase64).mockResolvedValue(FAKE_VALUE);
    vi.mocked(validateUserFormData).mockReturnValue({
      success: true,
      data: userFormDataMock,
    });
    render(<UncontrolledForm closeModal={closeModal} />, {
      wrapper: ProvidersMock,
    });
    const submitBtn = screen.getByText(SUBMIT_BTN_TEXT);
    clickElement(submitBtn);

    await waitFor(() => {
      expect(fileToBase64).toHaveBeenCalledWith(userFormDataMock.avatar);
    });
    expect(appDispatchMock).toHaveBeenCalledWith({
      type: addUser.type,
      payload: {
        ...userFormDataMock,
        avatar: FAKE_VALUE,
      },
    });
    expect(closeModal).toHaveBeenCalled();
  });

  it('Displays errors', () => {
    const shownErrorsCount = Object.keys(fieldErrorsMock).length - 1;
    vi.mocked(validateUserFormData).mockReturnValue({
      success: false,
      fieldErrors: fieldErrorsMock,
    });
    render(<UncontrolledForm />, {
      wrapper: ProvidersMock,
    });
    const submitBtn = screen.getByText(SUBMIT_BTN_TEXT);
    act(() => {
      clickElement(submitBtn);
    });
    const errors = screen.getAllByText(RegExp(FAKE_FIELD_ERROR));
    expect(errors).toHaveLength(shownErrorsCount);
  });

  it('Displays password strength', () => {
    vi.mocked(getPasswordStrength).mockReturnValue('strong');
    render(<UncontrolledForm />, {
      wrapper: ProvidersMock,
    });
    const passwordInput = screen.getByLabelText(LabelName.Password);
    changeInput(passwordInput, FAKE_VALUE);
    expect(screen.getByText(/password:\s+strong/i)).toBeInTheDocument();
  });
});
