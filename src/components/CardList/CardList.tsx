import type { CharacterInfo } from '@services/types.ts';
import type { ReactNode } from 'react';
import { Component } from 'react';
import styles from './CardList.module.scss';
import { Card } from './components/Card/Card.tsx';

type CardListProps = {
  infos: CharacterInfo[];
};

export class CardList extends Component<CardListProps> {
  public render(): ReactNode {
    return (
      <ul className={styles.list}>
        {this.props.infos.map(info => (
          <Card info={info} key={info.id} />
        ))}
      </ul>
    );
  }
}
