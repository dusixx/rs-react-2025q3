import { ERR_SOMETHING_WRONG } from '@common/constants.ts';
import type { ReactNode } from 'react';
import { Component } from 'react';
import { TestId } from '../constants.ts';

export class ProblematicChildMock extends Component<{ throwError?: boolean }> {
  public render(): ReactNode {
    if (this.props.throwError) {
      throw Error(ERR_SOMETHING_WRONG);
    }
    return <div data-testid={TestId.ProblematicChildMock}></div>;
  }
}
