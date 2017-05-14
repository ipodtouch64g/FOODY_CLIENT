import React from 'react';

import {Form, Input, Button, Container} from 'reactstrap';
import './Shops.css'

export default class Shops extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      shopPost: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      shopPost: nextProps.posts[nextProps.shopIndex]
    });
  }

  render() {

    return (
      <div className='shops'>

        <Container>
          <div className='referenceArticle'>
            <h3>參考文章</h3>
          </div>
        </Container>

      </div>

    );
  }
}
