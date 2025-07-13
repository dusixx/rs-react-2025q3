import { IconCloseCircleOutline } from '@common/constants.ts';
import { CardList } from '@components/CardList/CardList.tsx';
import { SearchBar } from '@components/SearchBar/SearchBar.tsx';
import { getCharactersByName } from '@services/api.ts';
import type { CharacterInfo } from '@services/types.ts';
import type { ReactNode } from 'react';
import { Component } from 'react';
import { BeatLoader } from 'react-spinners';
import {
  ERROR_ICON_PROPS,
  INITIAL_STATE,
  LOADER_PROPS,
  LOADER_VISIBILITY_DURATION,
  QUERY_PLACEHOLDER,
} from './MainPage.constants.ts';
import styles from './MainPage.module.scss';
import { getErrorMessage, getPersistedQuery, setPersistedQuery } from './MainPage.utils.ts';

export type MainPageState = {
  query: string;
  results: CharacterInfo[];
  isLoading: boolean;
  errorMessage: string;
};

export default class MainPage extends Component<object, MainPageState> {
  constructor(props: object) {
    super(props);
    this.state = {
      query: getPersistedQuery(),
      ...INITIAL_STATE,
    };
  }

  public componentDidMount(): void {
    this.handleQuery(this.state.query);
  }

  private handleQuery = (query: string): void => {
    setPersistedQuery(query);
    this.setState({
      query,
      ...INITIAL_STATE,
    });
    void getCharactersByName(query)
      .then(infos => {
        this.setState({ results: infos });
      })
      .catch((error: unknown) => {
        this.setState({
          errorMessage: getErrorMessage(error),
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ isLoading: false });
        }, LOADER_VISIBILITY_DURATION);
      });
  };

  private handleChange = (query: string): void => {
    if (!query) {
      this.handleQuery(query);
    }
  };

  public render(): ReactNode {
    const { errorMessage } = this.state;
    const searchResults =
      errorMessage.length === 0 ? (
        <CardList infos={this.state.results} />
      ) : (
        <pre className={styles.errorInfo}>
          <IconCloseCircleOutline {...ERROR_ICON_PROPS} />
          <b>Error: {errorMessage}</b>
        </pre>
      );
    return (
      <div className={styles.wrapper}>
        <SearchBar
          className={styles.searchBar}
          placeholder={QUERY_PLACEHOLDER}
          onQuery={this.handleQuery}
          onChange={this.handleChange}
          value={this.state.query}
        />
        {this.state.isLoading ? (
          <div className={styles.loader}>
            <BeatLoader {...LOADER_PROPS} />
          </div>
        ) : (
          searchResults
        )}
      </div>
    );
  }
}
