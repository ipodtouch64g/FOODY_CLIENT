import React from 'react';
import PropTypes from 'prop-types';
import {
    Container
} from 'reactstrap';
import SearchList from 'components/SearchList.jsx';
import './Search.css';
import {searchList_fake} from 'api/posts.js';

export default class Search extends React.Component {

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
          console.log("ss");
          this.listPosts(this.state.searchText);

        }
      });

  }

  render() {
    return (
          <div className='contents'>
            {this.state.open &&
              <Container fluid>
                <div>
                  <SearchList posts={this.state.posts}/>
                </div>
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
                console.log("ajax call",this.state.posts);
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
