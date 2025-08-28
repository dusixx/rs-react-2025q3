import { fieldErrorsMock } from '@/test-utils/mocks/user-mock.ts';
import { render, screen, within } from '@testing-library/react';
import { FAKE_VALUE } from 'src/test-utils/index.ts';
import { Input } from './Input.tsx';

describe('Input', () => {
  it(`Renders correctly`, () => {
    const errMsg = fieldErrorsMock.name[0];
    const childrenTestId = `children-${FAKE_VALUE}`;
    render(
      <Input
        nameLabel={FAKE_VALUE}
        error={errMsg}
        data-testid={FAKE_VALUE}
        id={FAKE_VALUE}
        securely
      >
        <p data-testid={childrenTestId}>{FAKE_VALUE}</p>
      </Input>,
    );
    const input = screen.getByTestId(FAKE_VALUE);
    expect(input).toHaveProperty('type', 'password');
    expect(input).toHaveProperty('name', FAKE_VALUE);
    expect(input).toHaveProperty('id', FAKE_VALUE);
    expect(
      within(input.parentElement as HTMLElement).getByTestId(childrenTestId),
    ).toBeInTheDocument();
    expect(screen.getByText(errMsg)).toBeInTheDocument();
  });
});
