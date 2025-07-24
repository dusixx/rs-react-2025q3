import type { CharacterInfo } from '@services/api.types.ts';
import type { ReactNode } from 'react';
import { Component } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './CardList.module.scss';
import { Card } from './components/Card/Card.tsx';

type CardListProps = {
  infos: CharacterInfo[];
};

export class CardList extends Component<CardListProps> {
  public render(): ReactNode {
    return (
      <ul data-testid={TestId.CardList} className={styles.list}>
        {this.props.infos.map(info => (
          <Card info={info} key={info.id} />
        ))}
      </ul>
    );
  }
}
