import { Component, type JSX, type ReactNode, type SyntheticEvent } from 'react';
import { IoClose } from 'react-icons/io5';
import { RiSearchLine } from 'react-icons/ri';
import styles from './SearchBar.module.scss';

const ICON_SIZE = 20;
const INITIAL_VALUE = '';

type InputAttributes = Omit<JSX.IntrinsicElements['input'], 'onChange'>;

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
    const { onQuery: _, className, style, ...restProps } = this.props;
    return (
      <div className={className} style={style}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <input
            className={styles.input}
            type='text'
            {...restProps}
            onFocus={this.handleFocus}
            value={this.state.value}
            onChange={this.handleChange}
          />
          {this.state.value && (
            <button className={styles.clearBtn} onClick={this.handleClearClick}>
              <IoClose size={ICON_SIZE} />
            </button>
          )}
          <button className={styles.btn} type='submit'>
            <RiSearchLine size={ICON_SIZE} />
          </button>
        </form>
      </div>
    );
  }
}
