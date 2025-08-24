import { deleteProperties } from '@/common/utils/index.ts';
import { LabelName } from '@/redux/user.ts';
import { changeInput } from '@/test-utils/utils.ts';
import { screen } from '@testing-library/react';

export const testLabelsRendered = (): void => {
  const labels = deleteProperties(LabelName, 'Gender', 'Agreement');
  Object.values(labels).forEach(name => {
    expect(screen.getByText(String(name))).toBeInTheDocument();
  });
};

export const setAllFormTextInputsWithValue = (value: string): Record<string, string> => {
  const result: Record<string, string> = {};
  const labels = deleteProperties(LabelName, 'Gender', 'Agreement', 'Avatar', 'Confirm');

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
