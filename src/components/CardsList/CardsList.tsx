import type { CharacterInfo } from '@services/types.ts';
import type { ReactNode } from 'react';
import { Component } from 'react';
import styles from './CardsList.module.scss';
import { Card } from './components/Card/Card.tsx';

type CardsListProps = {
  infos: CharacterInfo[];
};

export class CardsList extends Component<CardsListProps> {
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
