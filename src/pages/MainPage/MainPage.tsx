import { ERR_SOMETHING_WRONG, IconCloseCircleOutline } from '@common/constants.ts';
import { CardList } from '@components/CardList/CardList.tsx';
import { SearchBar } from '@components/SearchBar/SearchBar.tsx';
import { getCharactersByName } from '@services/api.ts';
import type { CharacterInfo } from '@services/types.ts';
import { getErrorMessage } from '@utils/index.ts';
import type { ReactNode } from 'react';
import { Component } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
import {
  ERROR_ICON_PROPS,
  INITIAL_STATE,
  LOADER_VISIBILITY_DURATION,
  QUERY_PLACEHOLDER,
  SPINNER_PROPS,
  getPersistedQuery,
  setPersistedQuery,
} from './index.ts';
import styles from './MainPage.module.scss';

export type MainPageState = {
  query: string;
  results: CharacterInfo[];
  isLoading: boolean;
  errorMessage: string;
};

export default class MainPage extends Component {
  public state: MainPageState = {
    query: getPersistedQuery(),
    ...INITIAL_STATE,
  };

  public componentDidMount(): void {
    this.handleQuery(this.state.query);
  }

  private handleQuery = (query: string): void => {
    setPersistedQuery(query);
    this.setState({
      query,
      ...INITIAL_STATE,
      isLoading: true,
    });
    void getCharactersByName(query)
      .then(infos => {
        this.setState({ results: infos });
      })
      .catch((error: unknown) => {
        this.setState({
          errorMessage: getErrorMessage(error, ERR_SOMETHING_WRONG),
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
    const { errorMessage, results } = this.state;
    const searchResults = !errorMessage ? (
      <CardList infos={results} />
    ) : (
      <pre data-testid={TestId.SearchError} className={styles.errorInfo}>
        <IconCloseCircleOutline data-testid={TestId.SearchErrorIcon} {...ERROR_ICON_PROPS} />
        <b data-testid={TestId.SearchErrorMessage}>Error: {errorMessage}</b>
      </pre>
    );
    return (
      <div data-testid={TestId.MainPage}>
        <section className={styles.section}>
          <SearchBar
            className={styles.searchBar}
            placeholder={QUERY_PLACEHOLDER}
            onQuery={this.handleQuery}
            onChange={this.handleChange}
            value={this.state.query}
          />
        </section>
        <section className={styles.section}>
          {this.state.isLoading ? (
            <div data-testid={TestId.Loader} className={styles.loader}>
              <img {...SPINNER_PROPS} />
            </div>
          ) : (
            searchResults
          )}
        </section>
      </div>
    );
  }
}
