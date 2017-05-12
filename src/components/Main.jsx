import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
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
import SearchBar from './SearchBar.jsx'
import SearchList from './SearchList.jsx'
import Shops from './Shops.jsx'
import Recommend from './Recommend.jsx'
import './Main.css';

export default class Main extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>

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
                &nbsp;  &nbsp;  &nbsp;
                <div className='container align-items:center searchBar'>
                    <div className='container searchIcon'><i className="fa fa-search" aria-hidden="true"></i></div>
                    <SearchBar/>
                </div>
                <Nav>
                  <NavItem>
                    <NavLink tag={Link} to='/shops'>SHOPS!!!!!!!!</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to='/'>RECOMMENDS!!!!!!!!</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to='/lists'>LISTS!!!!!!!!!</NavLink>
                  </NavItem>
                </Nav>

              </div>
          </Container>
          </div>
          <div className='contents'>
            <Container fluid>
              <Route exact path="/" render={() => (
                  <Recommend/>
              )}/>
              <Route exact path="/lists" render={() => (
                  <SearchList/>
              )}/>
              <Route exact path="/shops" render={() => (
                  <Shops/>
              )}/>
            </Container>
          </div>


          <div className='footer'>
            FOODY | BY TEAM SIX
          </div>
        </div>
      </Router>
    );
  }


}
