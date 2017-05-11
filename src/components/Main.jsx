import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {
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
                    <div className='bg-faded'>
                        <div className='container'>

                        </div>
                    </div>

                    {/* <Route exact path="/" render={() => (

                    )}/> */}

                    <div className='footer'>
                        DataLab.
                    </div>
                </div>
            </Router>
        );
    }

}
