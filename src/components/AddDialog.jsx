import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import {blue500,red500, green500} from 'material-ui/styles/colors';


/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */
export default class AddDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueName: 'Restaurant Name',
      valueCategory: 'Restaurant Category',
      valueAddress: 'Restaurant address',
      valueAverage: 'Restaurant Average',
      valueTelephone: 'Restaurant Telephone'
    };

    this.myStyles = {
      errorStyle: {
        color: red500,
      },
      underlineStyle: {
        borderColor: blue500,
      },
      floatingLabelStyle: {
        color: blue500,
      },
      floatingLabelFocusStyle: {
        color: green500,
      }
    };
  }

  handleClose = () => {
    this.props.close();
  };

  handleChange = (event ,which) => {
    this.setState({
      valueName: which==='name'?event.target.value:this.state.valueName,
      valueCategory: which==='category'?event.target.value:this.state.valueCategory,
      valueAddress: which==='address'?event.target.value:this.state.valueAddress,
      valueAverage: which==='average'?event.target.value:this.state.valueAverage,
      valueTelephone: which==='telephone'?event.target.value:this.state.valueTelephone
    });
  };

  handleSubmit = () =>{
    this.props.close();
    let addValue ={
      name:this.state.valueName,
      category:this.state.valueCategory,
      address:this.state.valueAddress,
      average:this.state.valueAverage,
      telephon:this.state.valueTelephone
    };
    console.log(addValue);
    this.props.addSubmit(addValue);
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleSubmit}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Dialog With Date Picker"
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.handleClose}
        >
          餐廳加加
          <div>
            <TextField
              value={this.state.valueName}
              floatingLabelText="Restaurant Name"
              errorText="This field is required."
              errorStyle={this.myStyles.errorStyle}
              onChange={(e) =>{this.handleChange(e,'name');}}
            /><br />
            <TextField
              value={this.state.valueCategory}
              floatingLabelText="Restaurant Category"
              errorText="This field is required."
              errorStyle={this.myStyles.errorStyle}
              onChange={(e) =>{this.handleChange(e,'category');}}
            /><br />
            <TextField
              value={this.state.valueAddress}
              floatingLabelText="Restaurant Address"
              floatingLabelStyle={this.myStyles.floatingLabelStyle}
              floatingLabelFocusStyle={this.myStyles.floatingLabelFocusStyle}
              onChange={(e) =>{this.handleChange(e,'address');}}
            /><br />
            <TextField
              value={this.state.valueTelephone}
              floatingLabelText="Restaurant Telephone"
              floatingLabelStyle={this.myStyles.floatingLabelStyle}
              floatingLabelFocusStyle={this.myStyles.floatingLabelFocusStyle}
              onChange={(e) =>{this.handleChange(e,'telephone');}}
            /><br />
            <TextField
              value={this.state.valueAverage}
              floatingLabelText="Restaurant Average"
              floatingLabelStyle={this.myStyles.floatingLabelStyle}
              floatingLabelFocusStyle={this.myStyles.floatingLabelFocusStyle}
              onChange={(e) =>{this.handleChange(e,'average');}}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}
