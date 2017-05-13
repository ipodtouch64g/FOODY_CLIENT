import React from 'react';
import PropTypes from 'prop-types';
import {Container, Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import SearchItem from 'components/SearchItem.jsx';
import './SearchList.css';

export default class SearchList extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);

  }

  render() {
    const posts = this.props.posts;

    let children = (
      <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
        <div className='empty-text'>讀取中...<br/></div>
      </ListGroupItem>
    );
    if (posts.length) {

      children = posts.map(p => (<SearchItem {...p}/>));
    }

    return (

      <div className='search-list'>
        <div className='search-title'>
          <h3>{`"${this.props.searchText}"的搜尋結果`}</h3>
        </div>
        <div className='wrapper'>
          <Container>
            <Row>
              <Col sm="3" className="advance-search-col">
                <div className="advance-search">ccccc</div>
              </Col>
              <Col sm="9" >
                <div className="wrapper-cards">{children}</div>
              </Col>

            </Row>

          </Container>
        </div>

      </div>
    );
  }

}
