import React from 'react';

import {
    Form,
    Input,
    Button,
} from 'reactstrap';
import './Shops.css'


export default class Shops extends React.Component {
  constructor() {
    super();
    this.state = {
      open:false
    };
  }

  render() {


    return (
      <div className='shops'>
        {this.state.open &&
          <Container>
              2
        </Container>
      }

      </div>


    );
  }
}
