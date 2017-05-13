import React from 'react';

import {Form, Input, Button} from 'reactstrap';
import './SearchItem.css'

export default class SearchItem extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className='searchitem'>
        {this.props.name}
      </div>

    );
  }
}
