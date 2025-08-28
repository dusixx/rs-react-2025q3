import { InputLabel } from '@/common/types/user';
import { omit } from '@/common/utils/index.ts';
import { changeInput } from '@/test-utils/utils.ts';
import { screen } from '@testing-library/react';

export const DEFAULT_GENDER = 'male';
export const REGEX_STRONG_PASSWORD_LABEL = /password:\s+strong/i;

export const testLabelsRendered = (): void => {
  const labels = omit(InputLabel, 'Gender', 'Agreement');
  Object.values(labels).forEach(name => {
    expect(screen.getByText(String(name))).toBeInTheDocument();
  });
};

export const changeAllFormTextInputs = (value: string): Record<string, string> => {
  const result: Record<string, string> = {};
  const labels = omit(InputLabel, 'Gender', 'Agreement', 'Avatar', 'Confirm');

  Object.values(labels).forEach(name => {
    const key = String(name);
    const input = screen.getByLabelText(key);
    result[key] = value;
    try {
      changeInput(input, value);
    } catch {
      void 0;
    }
  });
  return result;
};
