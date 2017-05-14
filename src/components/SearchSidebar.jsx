import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import React from 'react';
import PropTypes from 'prop-types';
import {Container, Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import Slider from 'material-ui/Slider';
import './SearchSidebar.css'

export default class SearchSidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      open:false
    };
    this.handleToggle=this.handleToggle.bind(this);
    this.handleNestedListToggle=this.handleNestedListToggle.bind(this);
  }
  handleToggle = () => {
   this.setState({
     open: !this.state.open,
   });
 };

 handleNestedListToggle = (item) => {
   this.setState({
     open: item.state.open,
   });
 };
  render() {
    return (
      <div>
        <div className="advance-search">
          <List>
            <Subheader>進階搜尋</Subheader>
            <ListItem
              primaryText="地點"
              initiallyOpen={true}
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem
                  key={1}
                  primaryText="台北市"
                />,
                <ListItem
                  key={2}
                  primaryText="新北市"
                />,
                <ListItem
                  key={3}
                  primaryText="新竹市"
                />,
                <ListItem
                  key={4}
                  primaryText="其他"
                  disabled={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="Drafts"  />,
                  ]}
                />,

              ]}
            />
            <ListItem
              primaryText="食物類型"
              initiallyOpen={true}
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem
                  key={1}
                  primaryText="日式料理"
                />,
                <ListItem
                  key={2}
                  primaryText="咖啡"
                />,
                <ListItem
                  key={3}
                  primaryText="咖哩"
                />,
                <ListItem
                  key={4}
                  primaryText="其他"
                  disabled={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="Drafts"  />,
                  ]}
                />,
              ]}
            />
            <ListItem primaryText="價格區間" />
            <div className="slider">
              <Slider step={0.10} value={0.5} />
            </div>

          </List>

        </div>
      </div>

    );
  }
}
