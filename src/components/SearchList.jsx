import React from 'react';
import PropTypes from 'prop-types';
import {Container, Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import SearchItem from 'components/SearchItem.jsx';
import SearchSort from 'components/SearchSort.jsx';
import InfiniteScroll from 'react-infinite-scroller';
import './SearchList.css';

import SearchSidebar from 'components/SearchSidebar.jsx';
export default class SearchList extends React.Component {

  constructor(props) {
    super(props);
    this.handleSearchItemClick = this.handleSearchItemClick.bind(this);
  }

  handleSearchItemClick(index){
      this.props.handleSearchItemClick(index);
    }

  render() {
    const posts = this.props.posts;

    let children = (
      <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
        <div className='empty-text'>{this.props.searchText?"讀取中":"來點美食吧？"}<br/></div>
      </ListGroupItem>
    );
    if (posts.length) {

      children = posts.map(( p , index )=> (<SearchItem {...p} indexOfList={index} handleSearchItemClick={this.handleSearchItemClick}/>));
    }

    return (

      <div className='search-list'>

        <div className='search-title'>
          <Container fluid>
            <Row>
              <Col>
                <h4>{this.props.searchText?this.props.searchText:""}</h4>
              </Col>
              <Col>
                <div className="search-sort"><SearchSort reSort={this.props.reSort}/></div>
              </Col>
            </Row>
          </Container>

        </div>

        <div className='wrapper'>
          <Container>
            <Row>
              <Col sm="4" className="advance-search-col">
                <div className="advance-search-bar"><SearchSidebar onSearch={this.props.ADVsearch}/></div>
              </Col>
              <Col sm="8">
                <div className="wrapper-cards">
                  <InfiniteScroll initialLoad={false} loadMore={this.props.moreRests} hasMore={this.props.hasMore}> 
                    {children}
                  </InfiniteScroll>
                </div>
              </Col>

            </Row>

          </Container>
        </div>

      </div>
    );
  }

}
