import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import './Navbar.css'
import ActionPermIdentity from 'material-ui/svg-icons/action/perm-identity'
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add'
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Dialog from 'material-ui/Dialog';
import SignUpPage from './SignUpPage.jsx';
import LoginPage from './LoginPage.jsx';
import {white, blue500, red500, greenA200} from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';
import AddDialog from './AddDialog.jsx'
import FacebookLogin from 'react-facebook-login';
const styles = {
  smallIcon: {
    width: 36,
    height: 36
  },
  mediumIcon: {
    width: 48,
    height: 48,
    color:'rgb(252, 251, 255)',

  },
  largeIcon: {
    width: 60,
    height: 60
  },
  small: {
    width: 72,
    height: 72,
    padding: 16
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24
  },
  no:{
    display:'none'
  },
  h:{
    color:'white',
    width: 96,
    height: 96,
    padding: 24
  },
  large: {
    width: 120,
    height: 120,
    padding: 30
  }
};

export default class MyNavbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
      openlogin: false,
      opensignup: false,
      openAdd:false
    };
  }
  handleOpenS = () => {
    this.setState({opensignup: true});
  };

  handleCloseS = () => {
    this.setState({opensignup: false});
  };
  handleOpenL = () => {
    this.setState({openlogin: true});
  };

  handleCloseL = () => {
    this.setState({openlogin: false});
  };

  handleOpenA = () => {
    this.setState({openAdd: true});
  };

  handleCloseA = () => {
    this.setState({openAdd: false});
  };
  handleChange = (event, index, value) => this.setState({value});


  render() {
    console.log(this.props.isFBLogin.length?styles.no:styles.medium)
    return (
      <div>
        <Toolbar className="navbar">

          <ToolbarGroup>


              <IconButton className="icb" hoveredStyle={styles.h}  iconStyle={this.props.isFBLogin?styles.no:styles.mediumIcon} style={this.props.isFBLogin?styles.no:styles.medium} tooltip="登入">
                <FacebookLogin  cssClass="fbicon" icon={<ActionPermIdentity color="white" style={styles.mediumIcon}/>} textButton="" appId="1674155752890129" autoLoad={true} fields="name,email,picture" callback={this.props.fblogin}/>
              </IconButton>

                <IconButton className="icb" hoveredStyle={styles.h}  iconStyle={this.props.isFBLogin?styles.mediumIcon:styles.no} style={this.props.isFBLogin?styles.medium:styles.no} tooltip="登出">
                  <FacebookLogin  cssClass="fbicon" icon={<ActionPermIdentity color="darkorange" style={styles.mediumIcon}/>} textButton="" appId="1674155752890129" autoLoad={true} fields="name,email,picture" callback={this.props.fblogout}/>
                </IconButton>






            <ToolbarSeparator/>
            <IconButton className="icb" hoveredStyle={styles.h} onTouchTap={this.handleOpenA} iconStyle={styles.mediumIcon} style={styles.medium} tooltip="新增餐廳">
              <ActionNoteAdd/>
            </IconButton>
          </ToolbarGroup>
        </Toolbar>

        <Dialog modal={false} open={this.state.opensignup} className="dialog">
          <SignUpPage/>
          <RaisedButton onTouchTap={this.handleCloseS} label="Close" className="close"/>

        </Dialog>

        <Dialog modal={false} open={this.state.openlogin} className="dialog">
          <LoginPage/>
          <RaisedButton onTouchTap={this.handleCloseL} label="Close" className="close"/></Dialog>


        <AddDialog addSubmit = {this.props.addSubmit} open={this.state.openAdd} close={this.handleCloseA} className="dialog"/>

      </div>

    );
  }
}
