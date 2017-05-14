import React from 'react';
import PropTypes from 'prop-types';
import {Container, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

import './SearchSort.css';

export default class SearchSort extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.changeRec = this.changeRec.bind(this);
    this.changeBS = this.changeBS.bind(this);
    this.changeSB = this.changeSB.bind(this);
    this.state = {
      dropdownOpen: false,
      chosen: "推薦順序"
    };
  }

  changeRec(e) {

    this.setState({chosen: "推薦順序"});
  }
  changeBS(e) {

    this.setState({chosen: "金額：由大至小"});
  }
  changeSB(e) {

    this.setState({chosen: "金額：由小至大"});
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret size="sm">
          {this.state.chosen}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            <div onClick={this.changeRec}>推薦順序</div>
          </DropdownItem>
          <DropdownItem>
            <div onClick={this.changeBS}>金額：由大至小</div>
          </DropdownItem>
          <DropdownItem>
            <div onClick={this.changeSB}>金額：由小至大</div>
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}
