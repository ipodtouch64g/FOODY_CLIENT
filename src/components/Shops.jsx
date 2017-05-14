import React from 'react';

import {
    Container,
    Form,
    Input,
    Button,
} from 'reactstrap';
import './Shops.css'


export default class Shops extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.shopIndex);
    console.log(this.props.posts[this.props.shopIndex]);
    return (
      <div className='shop'>
          <Container>
            <div className='referenceArticle'>
              <h3>參考文章</h3>
              {this.props.posts[this.props.shopIndex].review1!=='-1'?<a href={this.props.posts[this.props.shopIndex].review1}>iPeen參考文章1<br/></a>:<p>目前暫無文章</p>}
              {(this.props.posts[this.props.shopIndex].review2!=='-1')&&<a href={this.props.posts[this.props.shopIndex].review2}>iPeen參考文章2<br/></a>}
              {(this.props.posts[this.props.shopIndex].review3!=='-1')&&<a href={this.props.posts[this.props.shopIndex].review3}>iPeen參考文章3<br/></a>}
            </div>
        </Container>
      </div>
    );
  }
}
