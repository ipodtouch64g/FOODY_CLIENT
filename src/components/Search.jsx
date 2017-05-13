import React from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import SearchItem from 'components/SearchItem.jsx';
import './Search.css';
import {searchList_fake} from 'api/posts.js';

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        open: false,
        Loading: false,
        searchText : '',
        posts: []
    };
    this.listPosts = this.listPosts.bind(this);

  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        open : nextProps.open,
        Loading : nextProps.loading,
        searchText : nextProps.searchtext
      },()=>{
        if(this.state.open)
        {
          this.listPosts(this.state.searchText);
          console.log("jhegjkhegjhjhfghjgrhi",this.state.posts);
        }
      });

  }

  render() {
    return (
          <div className='contents'>
            {this.state.open &&
              <Container>

              </Container>
          }

          </div>
    );
  }
  listPosts(searchText) {
      this.setState({
          Loading: true
      }, () => {
          searchList_fake(searchText).then(posts => {
              this.setState({
                  posts,
                  Loading: false
              },()=>{
                console.log("After call",this.state.posts);
              });
          }).catch(err => {
              console.error('Error listing posts', err);
              this.setState({
                  posts: [],
                  Loading: false
              });
          });
      });
  }

}
