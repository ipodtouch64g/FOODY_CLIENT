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
import {searchListFromApi , createRest} from 'api/posts.js'
import Shops from './Shops.jsx'
import Recommend from './Recommend.jsx'
import './Main.css';
import MyNavbar from './Navbar.jsx'
import SignUpPage from './SignUpPage.jsx'

import MapsPlace from 'material-ui/svg-icons/maps/place';
import SvgIcon from 'material-ui/SvgIcon';
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {fullWhite} from 'material-ui/styles/colors';
import FoodMap from './FoodMap.jsx'
import FloatingActionButton from 'material-ui/FloatingActionButton';

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
      ascending: 'no',
      city: '',
      category: '',
      price: 0,
      hasMore: true,
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

    console.log(response);
    if(response.status==='unknown')
      return;
    this.setState({
      FBLoginin: response,
      FBLoggedIn: true
    }, () => {
      console.log(this.state)
    });

  }

  handleFBLogout = () => {

    this.setState({
      FBLoginin: {},
      FBLoggedIn: false
    }, () => {
      console.log("fblogout", this.state)
    });
  }

  handleResort(asc){
    this.setState({
      Loading: true,
      ascending: asc?'ture':'false'
    }, () => {
      searchListFromApi(this.state.searchText,this.state.city,this.state.category,this.state.price,this.state.ascending).then(posts => {
        this.setState({
          posts,
          Loading: false
        }, () => {
          console.log("ajax call", this.state.posts);
          let a = "/list/"+this.state.searchText;
          history.push(a) ;
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
      Loading: true,
      city: '',
      category:'',
      price:'',
      ascending: 'no'
    }, () => {
      searchListFromApi(searchText,this.state.city,this.state.category,this.state.price,this.state.ascending).then(posts => {
        this.setState({
          posts,
          Loading: false,
          hasMore: true
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
  handleMoreRests =() =>{
    if(this.state.posts.length!==0){
      const start={
        id:this.state.posts[this.state.posts.length-1].id,
        average:this.state.posts[this.state.posts.length-1].average
      };
      this.setState({
        Loading: true,
        hasMore: false
      }, () => {
        searchListFromApi(this.state.searchText,this.state.city,this.state.category,this.state.price,this.state.ascending,start).then(newPosts => {
          if(newPosts.length===0){
            this.setState({
              posts:[...this.state.posts,...newPosts],
              Loading: false,
              hasMore: false
            }, () => {
              console.log("ajax call", this.state.posts);
              let a = "/list/" + this.state.searchText;
              history.push(a);
            });
          }
          else{
            this.setState({
              posts:[...this.state.posts,...newPosts],
              Loading: false,
              hasMore: true
            }, () => {
              console.log("ajax call", this.state.posts);
              let a = "/list/" + this.state.searchText;
              history.push(a);
            });
          }
        }).catch(err => {
          console.error('Error listing posts', err);
          this.setState({posts: [], Loading: false});
        });
      });
    }
  }
  handleADVsearch(place, category, price) {
    this.setState({
      Loading: true,
      city: place,
      category: category,
      price: price
    }, () => {
      searchListFromApi(this.state.searchText,place,category,price,this.state.ascending).then(posts => {
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

                        <SearchBar onSearch={this.handleSearch}/>

                        <div className="the-fucking-button">
                          <Link to={`/map`}>
                            <RaisedButton labelColor="#FFF" label="食起來" labelPosition="before" backgroundColor="#a4c639" icon={< MapsPlace color = {
                              fullWhite
                            } />}/>
                          </Link>
                        </div>

                      </div>
                    </div>
                  )}/>

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
              <Route exact path="/" render={() => (<SearchList hasMore={this.state.hasMore} moreRests={this.handleMoreRests} ADVsearch={this.handleADVsearch} reSort={this.handleResort} posts={this.state.posts} searchText={this.state.searchText} handleSearchItemClick={this.handleSearchItemClick}/>)}/>
              <Route path="/list" render={() => (<SearchList hasMore={this.state.hasMore} moreRests={this.handleMoreRests} ADVsearch={this.handleADVsearch} reSort={this.handleResort} posts={this.state.posts} searchText={this.state.searchText} handleSearchItemClick={this.handleSearchItemClick}/>)}/>
              <Route path="/shop" render={() => (<Shops  FBinfo={this.state.FBLoginin}  rests={this.state.posts} shopIndex={this.state.indexOfList}/>)}/>
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
