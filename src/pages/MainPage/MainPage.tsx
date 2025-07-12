import { CardsList } from '@components/CardsList/CardsList.tsx';
import { SearchBar } from '@components/SearchBar/SearchBar.tsx';
import { getCharactersByName } from '@services/api.ts';
import type { CharacterInfo } from '@services/types.ts';
import { isError } from '@utils/index.ts';
import type { ReactNode } from 'react';
import { Component } from 'react';
import { BeatLoader } from 'react-spinners';
import styles from './MainPage.module.scss';
import { getPersistedQuery, setPersistedQuery } from './MainPage.utils.ts';

const QUERY_PLACEHOLDER = 'Input name (e.g. rick)...';
const LOADER_VISIBILITY_DURATION = 500;
const LOADER_PROPS = {
  color: 'var(--color-violet)',
  size: 14,
};

type MainPageState = {
  query: string;
  results: CharacterInfo[];
  isLoading: boolean;
};

export default class MainPage extends Component<object, MainPageState> {
  public state = {
    query: getPersistedQuery(),
    results: [],
    isLoading: false,
  };

  public componentDidMount(): void {
    this.handleQuery(this.state.query);
  }

  private handleQuery = (query: string): void => {
    setPersistedQuery(query);
    this.setState({
      query,
      results: [],
      isLoading: true,
    });
    void getCharactersByName(query)
      .then(infos => {
        this.setState({ results: infos });
      })
      .catch((error: unknown) => {
        if (isError(error)) {
          throw error;
        }
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
    return (
      <div className={styles.wrapper}>
        <SearchBar
          className={styles.searchBar}
          placeholder={QUERY_PLACEHOLDER}
          onQuery={this.handleQuery}
          onChange={this.handleChange}
          value={this.state.query}
        />
        {this.state.isLoading && (
          <div className={styles.loader}>
            <BeatLoader {...LOADER_PROPS} />
          </div>
        )}
        {!this.state.isLoading && <CardsList infos={this.state.results} />}
      </div>
    );
  }
}
