import { render, screen } from '@testing-library/react';
import { clickElement } from 'src/test-utils/utils.ts';
import { vi } from 'vitest';
import { Checkbox, ICON_COLOR } from './Checkbox.tsx';

describe('ErrorInfo', () => {
  it(`Renders checkbox correctly`, () => {
    const handleChange = vi.fn();
    render(<Checkbox data-checkbox onChange={handleChange} checked={true} />);

    const btn = screen.getByRole('checkbox');
    expect(screen.getByRole('img')).toHaveAttribute('color', ICON_COLOR);
    expect(btn).toHaveAttribute('data-checkbox', 'true');
    clickElement(btn);
    expect(handleChange).toHaveBeenCalledWith(false);
  });
});
