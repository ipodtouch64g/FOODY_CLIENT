import React from 'react';
import PropTypes from 'prop-types';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

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
import Search from './Search.jsx'
import Shops from './Shops.jsx'
import Recommend from './Recommend.jsx'
import './Main.css';

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText : '',
      openList : false,
      openShop : false
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(searchtext){
    this.setState({
        searchText: searchtext,
        openList : true
    });
  }


  render() {
    return (
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
              <Container fluid >
                <div>
                <Search searchtext={this.state.searchText} open={this.state.openList} />
                <Shops open={this.state.openShop}/>
                </div>
              </Container>
            </div>
            <div className='footer'>
              FOODY | BY TEAM SIX
            </div>
          </div>
        </MuiThemeProvider>



    );
  }
}
