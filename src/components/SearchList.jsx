import React from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import SearchItem from 'components/SearchItem.jsx';
import './SearchList.css';


export default class SearchList extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps);

  }

  render() {
      const posts = this.props.posts;

      let children = (
          <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
              <div className='empty-text'>幫ＱＱ<br /></div>
          </ListGroupItem>
      );
      if (posts.length) {

          children = posts.map(p => (
              <ListGroupItem key={p.id} action>
                  <SearchItem {...p}/>
              </ListGroupItem>
          ));
      }

      return (
          <div className='search-list'>
              <ListGroup>{children}</ListGroup>
          </div>
      );
  }


}
