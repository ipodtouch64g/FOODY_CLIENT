import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { useRouterHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import createHistory from 'history/createBrowserHistory'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
const history = createHistory();
const location = history.location;
const unlisten = history.listen((location, action) => {
  // location is an object like window.location
  console.log(action, location.pathname, location.state)
})
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Input,
  Button
} from 'reactstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SearchBar from './SearchBar.jsx'
import SearchList from './SearchList.jsx'
import {searchListFromApi} from 'api/posts.js'
import Shops from './Shops.jsx'
import Recommend from './Recommend.jsx'
import './Main.css';

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      openList: false,
      openShop: false,
      indexOfList: 0,
      Loading: false,
      posts: []
    };
    this.listPosts = this.listPosts.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchItemClick = this.handleSearchItemClick.bind(this);
  }
  handleSearchItemClick(index){
    this.setState({
      openList : false,
      openShop :true,
      indexOfList: index
    });
  }

  handleSearch(searchtext) {
    this.setState({
      searchText: searchtext,
      openList: true,
      Loading: true
    }, () => {
      if (this.state.openList) {
        console.log("ss");
        this.listPosts(this.state.searchText);
      }
    });
  }

  listPosts(searchText) {
    this.setState({
      Loading: true
    }, () => {
      searchListFromApi(searchText).then(posts => {
        this.setState({
          posts,
          Loading: false
        }, () => {
          console.log("ajax call", this.state.posts);
          let a = "/list/"+searchText;
          history.push(a) ;
        });
      }).catch(err => {
        console.error('Error listing posts', err);
        this.setState({posts: [], Loading: false});
      });
    });
  }

  render() {
    return (
      <Router history={history}>
        <MuiThemeProvider>
          <div className='main'>
            <div className='bg'>
              <Container fluid>
                <div className='container d-flex flex-column  justify-content-between align-items:center '>
                  &nbsp;
                  <div></div>
                  <div className="mx-auto wow fadeInDown main-title">
                    <div>
                      <h1>FOODY |</h1>
                    </div>
                    <div>
                      <h3>your choice for food</h3>
                    </div>
                  </div>
                  &nbsp; &nbsp; &nbsp;
                  <div className='container align-items:center searchBar'>
                    <div className='container searchIcon'>
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </div>
                    <SearchBar onSearch={this.handleSearch}/>
                  </div>
                </div>
              </Container>
            </div>
            <div className='contents'>
              <Route exact path="/" render={() => (<SearchList posts={this.state.posts} searchText={this.state.searchText} handleSearchItemClick={this.handleSearchItemClick}/>)}/>
              <Route path="/list" render={() => (<SearchList posts={this.state.posts} searchText={this.state.searchText} handleSearchItemClick={this.handleSearchItemClick}/>)}/>
              <Route path="/shop" render={() => (<Shops rests={this.state.posts} shopIndex={this.state.indexOfList}/>)}/>
            </div>
            <div className='footer'>
              FOODY | BY TEAM SIX
            </div>
          </div>
        </MuiThemeProvider>
      </Router>

    );
  }
}
