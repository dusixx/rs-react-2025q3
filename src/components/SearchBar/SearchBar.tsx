import { IconClose, IconSearch } from '@common/constants.ts';
import { Component, type JSX, type ReactNode, type SyntheticEvent } from 'react';
import styles from './SearchBar.module.scss';

const ICON_SIZE = 20;
const INITIAL_VALUE = '';

type InputAttributes = Pick<
  JSX.IntrinsicElements['input'],
  'value' | 'className' | 'placeholder' | 'style'
>;

type SearchBarProps = InputAttributes & {
  onChange?: (value: string) => void;
  onQuery?: (value: string) => void;
};

export class SearchBar extends Component<SearchBarProps> {
  public state = {
    value: this.props.value ?? INITIAL_VALUE,
  };

  private handleChange = ({ target }: SyntheticEvent): void => {
    if (target instanceof HTMLInputElement) {
      this.props.onChange?.(target.value);
      this.setState({ value: target.value });
    }
  };

  private handleFocus = ({ target }: SyntheticEvent): void => {
    if (target instanceof HTMLInputElement) {
      target.select();
    }
  };

  private handleSubmit = (event: SyntheticEvent): void => {
    this.props.onQuery?.(this.state.value.toString());
    event.preventDefault();
  };

  private handleClearClick = (): void => {
    this.setState({ value: '' });
    this.props.onChange?.('');
  };

  public render(): ReactNode {
    const { className, style, placeholder } = this.props;

    return (
      <div className={className} style={style}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <input
            className={styles.input}
            type='text'
            onFocus={this.handleFocus}
            value={this.state.value}
            onChange={this.handleChange}
            placeholder={placeholder}
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
