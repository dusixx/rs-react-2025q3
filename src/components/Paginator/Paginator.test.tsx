import { render, screen } from '@testing-library/react';
import { clickElement, getNestedChild } from 'src/test-utils/index.ts';
import { vi } from 'vitest';
import { ButtonTitle, Paginator } from './Paginator.tsx';

describe('CardList', () => {
  it(`Displays the correct initial counter state`, () => {
    render(<Paginator initialPage={2} totalPages={10} />);
    expect(getNestedChild('Paginator', 'PaginatorCounterCurrent')).toHaveTextContent('2');
    expect(getNestedChild('Paginator', 'PaginatorCounterTotal')).toHaveTextContent('10');
  });

  it(`Displays the correct counter values and handles callback correctly`, () => {
    const handleClick = vi.fn();
    render(<Paginator initialPage={5} totalPages={10} onClick={handleClick} />);

    const firstBtn = screen.getByTitle(ButtonTitle.First);
    const lastBtn = screen.getByTitle(ButtonTitle.Last);
    const prevBtn = screen.getByTitle(ButtonTitle.Prev);
    const nextBtn = screen.getByTitle(ButtonTitle.Next);
    const currentPage = getNestedChild('PaginatorCounterCurrent');

    clickElement(firstBtn, { times: 2 });
    expect(currentPage).toHaveTextContent('1');
    expect(handleClick).toHaveBeenCalledWith(1);

    clickElement(nextBtn, { times: 2 });
    expect(currentPage).toHaveTextContent('3');
    expect(handleClick).toHaveBeenCalledWith(3);

    clickElement(lastBtn, { times: 2 });
    expect(currentPage).toHaveTextContent('10');
    expect(handleClick).toHaveBeenCalledWith(10);

    clickElement(prevBtn);
    expect(currentPage).toHaveTextContent('9');
    expect(handleClick).toHaveBeenCalledWith(9);
  });

  it(`Disables buttons in extreme positions`, () => {
    render(<Paginator initialPage={5} totalPages={10} />);

    const firstBtn = screen.getByTitle(ButtonTitle.First);
    const lastBtn = screen.getByTitle(ButtonTitle.Last);
    const prevBtn = screen.getByTitle(ButtonTitle.Prev);
    const nextBtn = screen.getByTitle(ButtonTitle.Next);

    expect(firstBtn).not.toHaveAttribute('disabled');
    expect(lastBtn).not.toHaveAttribute('disabled');
    expect(nextBtn).not.toHaveAttribute('disabled');
    expect(prevBtn).not.toHaveAttribute('disabled');

    clickElement(firstBtn);
    expect(firstBtn).toHaveAttribute('disabled');
    expect(prevBtn).toHaveAttribute('disabled');

    clickElement(lastBtn);
    expect(lastBtn).toHaveAttribute('disabled');
    expect(nextBtn).toHaveAttribute('disabled');
  });
});
