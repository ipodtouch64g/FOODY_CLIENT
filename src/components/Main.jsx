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
              <div className='container d-flex flex-column  justify-content-between align-items:center main-title'>
                <div></div>
                <div className="mx-auto wow fadeInDown">
                  <div>
                    <h1>FOODY |</h1>
                  </div>
                  <div>
                    <h3>your choice for food</h3>
                  </div>
                </div>
                <div className='container align-items:center searchBar'>

                </div>

              </div>
          </Container>
          </div>
          {/* <Route exact path="/" render={() => (

                    )}/> */}

          <div className='footer'>
            FOODY.
          </div>
        </div>
      </Router>
    );
  }

}
