import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import createHistory from 'history/createBrowserHistory'
import {useRouterHistory} from 'react-router'
import FacebookLogin from 'react-facebook-login';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
const history = createHistory();
const location = history.location;
const unlisten = history.listen((location, action) => {
  // location is an object like window.location
  console.log(action, location.pathname, location.state)
})

import {Container, Collapse, Input, Button} from 'reactstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SearchBar from './SearchBar.jsx'
import SearchList from './SearchList.jsx'
import {searchListFromApi, sortListFromApi, createRest} from 'api/posts.js'
import Shops from './Shops.jsx'
import Recommend from './Recommend.jsx'
import './Main.css';
import MyNavbar from './Navbar.jsx'
import SignUpPage from './SignUpPage.jsx'
/* 新的地圖*/
import MapsPlace from 'material-ui/svg-icons/maps/place';
import SvgIcon from 'material-ui/SvgIcon';
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {fullWhite} from 'material-ui/styles/colors';
import FoodMap from './FoodMap.jsx'
import FloatingActionButton from 'material-ui/FloatingActionButton';
/* 新的地圖*/
export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      FBLoggedIn: false,
      FBLoginin: {},
      searchText: '',
      openList: false,
      openShop: false,
      indexOfList: 0,
      Loading: false,
      posts: []
    };
    this.handleResort = this.handleResort.bind(this);
    this.handleAddRestaurant = this.handleAddRestaurant.bind(this);
    this.listPosts = this.listPosts.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchItemClick = this.handleSearchItemClick.bind(this);
    this.handleADVsearch = this.handleADVsearch.bind(this);

  }
  handleSearchItemClick(index) {
    this.setState({openList: false, openShop: true, indexOfList: index});
  }
  handleAddRestaurant(newRest) {
    createRest(newRest).then(n => {
      this.listPosts(this.state.searchText);
      console.log("ajax call", n);
    }).catch(err => {
      console.error('Error listing posts', err);
      this.setState({posts: []});
    });
  }

  handleFBLogin = (response) => {
    if (response.status === "unknown")
      return;
    else {
      this.setState({
        FBLoginin: response,
        FBLoggedIn: true
      }, () => {
        console.log("handleFBLogin", this.state)
      });
    }

  }

  handleFBLogout = () => {

    this.setState({
      FBLoginin: [],
      FBLoggedIn: false
    }, () => {
      console.log("fblogout", this.state)
    });
  }

  handleResort(asc) {
    this.setState({
      Loading: true
    }, () => {
      sortListFromApi(this.state.searchText, asc).then(posts => {
        this.setState({
          posts,
          Loading: false
        }, () => {
          console.log("ajax call", this.state.posts);
          let a = "/list/" + this.state.searchText;
          history.push(a);
        });
      }).catch(err => {
        console.error('Error listing posts', err);
        this.setState({posts: [], Loading: false});
      });
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
          let a = "/list/" + searchText;
          history.push(a);
        });
      }).catch(err => {
        console.error('Error listing posts', err);
        this.setState({posts: [], Loading: false});
      });
    });
  }
  handleADVsearch(place, catagory, price) {
    this.setState({
      Loading: true
    }, () => {
      searchListFromApi(this.state.searchText, place, catagory, price).then(posts => {
        this.setState({
          posts,
          Loading: false
        }, () => {
          console.log("ajax call", this.state.posts);
          let a = "/list/" + this.state.searchText;
          history.push(a);
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

                <div className="navbar">
                  <MyNavbar isFBLogin={this.state.FBLoggedIn} fblogout={this.handleFBLogout} fblogin={this.handleFBLogin} addSubmit={this.handleAddRestaurant}/>
                </div>
                {/* 新map */}
                <div className="main-map-or-search">
                  <Route exact path="/" render={() => (
                    <div className='container d-flex flex-column justify-content-between align-items:center '>
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
                        <SearchBar onSearch={this.handleSearch}/> {/* 新map案件 */}
                        <div className="the-fucking-button">
                          <Link to={`/map`}>
                            <RaisedButton labelColor="#FFF" label="食起來" labelPosition="before" backgroundColor="#a4c639" icon={< MapsPlace color = {
                              fullWhite
                            } />}/>
                          </Link>
                        </div>
                        {/* 新map案件 */}
                      </div>
                    </div>
                  )}/>
                  {/* 新map */}
                  <Route path="/map" render={() => (
                    <div>
                      <FoodMap/>
                      <Link to={'/'}>
                        < FloatingActionButton secondary={true} style={{float:"right"}}>
                          <ActionHighlightOff/>
                        < /FloatingActionButton>
                      </Link>
                    </div>
                  )
                  }/>

                </div>

              </Container>
            </div>
            <div className='contents'>
              <Route exact path="/" render={() => (<SearchList ADVsearch={this.handleADVsearch} reSort={this.handleResort} posts={this.state.posts} searchText={this.state.searchText} handleSearchItemClick={this.handleSearchItemClick}/>)}/>
              <Route path="/list" render={() => (<SearchList ADVsearch={this.handleADVsearch} reSort={this.handleResort} posts={this.state.posts} searchText={this.state.searchText} handleSearchItemClick={this.handleSearchItemClick}/>)}/>
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
