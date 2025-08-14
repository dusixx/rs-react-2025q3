import { render, screen } from '@testing-library/react';
import { clickElement, getNestedChild } from 'src/test-utils/index.ts';
import { vi } from 'vitest';
import { ButtonTitle, Paginator } from './Paginator.tsx';

describe('CardList', () => {
  it(`Displays the correct counter values and handles callback correctly`, () => {
    const handleClick = vi.fn();
    render(<Paginator initialPage={5} totalPages={10} onClick={handleClick} />);

    const firstBtn = screen.getByTitle(ButtonTitle.First);
    const lastBtn = screen.getByTitle(ButtonTitle.Last);
    const prevBtn = screen.getByTitle(ButtonTitle.Prev);
    const nextBtn = screen.getByTitle(ButtonTitle.Next);

    clickElement(firstBtn, { times: 2 });
    expect(handleClick).toHaveBeenCalledWith(1);
    clickElement(nextBtn, { times: 2 });
    expect(handleClick).toHaveBeenCalledWith(3);
    clickElement(lastBtn, { times: 2 });
    expect(handleClick).toHaveBeenCalledWith(10);
    clickElement(prevBtn);
    expect(handleClick).toHaveBeenCalledWith(9);
    expect(getNestedChild('PaginatorCounterCurrent')).toHaveTextContent('9');
  });

  it(`Disables buttons in extreme positions`, () => {
    render(<Paginator initialPage={1} totalPages={10} />);

    const firstBtn = screen.getByTitle(ButtonTitle.First);
    const lastBtn = screen.getByTitle(ButtonTitle.Last);
    const prevBtn = screen.getByTitle(ButtonTitle.Prev);
    const nextBtn = screen.getByTitle(ButtonTitle.Next);

    expect(firstBtn).toHaveAttribute('disabled');
    expect(prevBtn).toHaveAttribute('disabled');
    expect(lastBtn).not.toHaveAttribute('disabled');
    expect(nextBtn).not.toHaveAttribute('disabled');

    clickElement(lastBtn);
    expect(lastBtn).toHaveAttribute('disabled');
    expect(nextBtn).toHaveAttribute('disabled');
    expect(firstBtn).not.toHaveAttribute('disabled');
    expect(prevBtn).not.toHaveAttribute('disabled');
  });
});
