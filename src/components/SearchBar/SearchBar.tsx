import { IconClose, IconSearch } from '@common/constants.ts';
import type { ChangeEvent } from 'react';
import { Component, type JSX, type ReactNode, type SyntheticEvent } from 'react';
import styles from './SearchBar.module.scss';

const ICON_SIZE = 20;
const INITIAL_VALUE = '';

type InputAttributes = Pick<JSX.IntrinsicElements['input'], 'value' | 'className' | 'placeholder'>;

type SearchBarProps = InputAttributes & {
  onChange?: (value: string) => void;
  onQuery?: (value: string) => void;
};

export class SearchBar extends Component<SearchBarProps> {
  public state = {
    value: this.props.value?.toString() ?? INITIAL_VALUE,
  };

  private handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => {
    this.props.onChange?.(value);
    this.setState({ value });
  };

  private handleSubmit = (event: SyntheticEvent): void => {
    const value = this.state.value.trim();
    this.setState({ value });
    this.props.onQuery?.(value);
    event.preventDefault();
  };

  private handleClearClick = (): void => {
    this.setState({ value: INITIAL_VALUE });
    this.props.onChange?.(INITIAL_VALUE);
  };

  public render(): ReactNode {
    const { className, placeholder } = this.props;

    return (
      <div className={className}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <input
            className={styles.input}
            value={this.state.value}
            placeholder={placeholder}
            onChange={this.handleChange}
          />
          {this.state.value && (
            <button className={styles.clearBtn} type='button' onClick={this.handleClearClick}>
              <IconClose size={ICON_SIZE} />
            </button>
          )}
          <button className={styles.btn} type='submit' disabled={!this.state.value}>
            <IconSearch size={ICON_SIZE} />
          </button>
        </form>
      </div>
    );
  }
}
