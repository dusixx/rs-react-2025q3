import type { JSX } from 'react';
import React from 'react';
import { toast } from 'react-toastify';

export default class HomePage extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  public render(): JSX.Element {
    return (
      <div>
        Home <button onClick={() => toast.success('Hello')}>Click me</button>
      </div>
    );
  }
}
