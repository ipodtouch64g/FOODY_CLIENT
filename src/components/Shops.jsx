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
      open:false,
      shopPost : {}
    };
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        shopPost : nextProps.posts[nextProps.shopIndex]
      });
  }

  render() {

    return (
      <div className='shops'>
        {this.state.open &&
          <Container>
            <div className='referenceArticle'>
              <h3>參考文章</h3>
              {this.shopPost.review1==='-1'?<a href={this.shopPost.review1}>iPeen參考文章1</a>:<p>目前暫無文章</p>}
              {(this.shopPost.review2==='-1')&&<a href={this.shopPost.review2}>iPeen參考文章2</a>}
              {(this.shopPost.review3==='-1')&&<a href={this.shopPost.review3}>iPeen參考文章3</a>}
            </div>
        </Container>
      }

      </div>


    );
  }
}
