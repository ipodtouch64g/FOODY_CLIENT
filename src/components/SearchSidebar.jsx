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
      open:false,
      city:'',
      category:'',
      price:0
    };
    this.handleToggle=this.handleToggle.bind(this);
    this.handleNestedListToggle=this.handleNestedListToggle.bind(this);
    this.handlecityclick=this.handlecityclick.bind(this);
    this.handlepriceclick=this.handlepriceclick.bind(this);
    this.handlecategoryclick=this.handlecategoryclick.bind(this);

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
 handlecityclick(searchText){
   this.setState({
     city:searchText
   },()=>{
     this.props.onSearch(this.state.searchText,this.state.category,this.state.price);
     console.log("handlecityclick",this.state);
   });

 }
 handlecategoryclick(cat){
   this.setState({
     category:cat
   },()=>{
     this.props.onSearch(this.state.searchText,this.state.category,this.state.price);
     console.log("handlecategoryclick",this.state);
   });
 }
 handlepriceclick(price){
   this.setState({
     price:price
   },()=>{
     this.props.onSearch(this.state.searchText,this.state.category,this.state.price);
     console.log("handlepriceclick",this.state);
   });
 }
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
                  onClick={()=>this.handlecityclick("台北市")}
                />,
                <ListItem
                  key={2}
                  primaryText="新北市"
                  onClick={()=>this.handlecityclick("新北市")}

                />,
                <ListItem
                  key={3}
                  primaryText="新竹市"
                  onClick={()=>this.handlecityclick("新竹市")}

                />,
                <ListItem
                  key={4}
                  primaryText="其他"
                  disabled={true}
                  nestedItems={[
                    <ListItem key={1}
                      primaryText="直轄市"
                      disabled={true}
                      nestedItems={
                        [
                          <ListItem
                            key={1}
                            primaryText="桃園市"
                            onClick={()=>this.handlecityclick("桃園市")}

                          />,
                          <ListItem
                            key={2}
                            primaryText="台中市"
                            onClick={()=>this.handlecityclick("台中市")}

                          />,
                          <ListItem
                            key={3}
                            primaryText="台南市"
                            onClick={()=>this.handlecityclick("台南市")}

                          />,
                          <ListItem
                            key={4}
                            primaryText="高雄市"
                            onClick={()=>this.handlecityclick("高雄市")}

                          />
                        ]
                      }
                    />,
                    <ListItem key={2}
                      primaryText="縣"
                      disabled={true}
                      nestedItems={
                        [
                          <ListItem
                            key={1}
                            primaryText="新竹縣"
                            onClick={()=>this.handlecityclick("新竹縣")}

                          />,
                          <ListItem
                            key={2}
                            primaryText="苗栗縣"
                            onClick={()=>this.handlecityclick("苗栗縣")}

                          />,
                          <ListItem
                            key={3}
                            primaryText="彰化縣"
                            onClick={()=>this.handlecityclick("彰化縣")}

                          />,
                          <ListItem
                            key={4}
                            primaryText="南投縣"
                            onClick={()=>this.handlecityclick("南投縣")}

                          />,
                          <ListItem
                            key={5}
                            primaryText="雲林縣"
                            onClick={()=>this.handlecityclick("雲林縣")}

                          />,
                          <ListItem
                            key={6}
                            primaryText="嘉義縣"
                            onClick={()=>this.handlecityclick("嘉義縣")}

                          />,
                          <ListItem
                            key={7}
                            primaryText="屏東縣"
                            onClick={()=>this.handlecityclick("屏東縣")}

                          />,
                          <ListItem
                            key={8}
                            primaryText="宜蘭縣"
                            onClick={()=>this.handlecityclick("宜蘭縣")}

                          />,
                          <ListItem
                            key={9}
                            primaryText="花蓮縣"
                            onClick={()=>this.handlecityclick("花蓮縣")}

                          />,
                          <ListItem
                            key={10}
                            primaryText="台東縣"
                            onClick={()=>this.handlecityclick("台東縣")}

                          />,
                          <ListItem
                            key={11}
                            primaryText="澎湖縣"
                            onClick={()=>this.handlecityclick("澎湖縣")}

                          />
                        ]
                      }
                    />,
                    <ListItem key={3}
                      primaryText="市"
                      disabled={true}
                      nestedItems={
                        [
                          <ListItem
                            key={1}
                            primaryText="基隆市"
                            onClick={()=>this.handlecityclick("基隆市")}

                          />,
                          <ListItem
                            key={2}
                            primaryText="嘉義市"
                            onClick={()=>this.handlecityclick("嘉義市")}
                          />,

                        ]
                      }
                    />
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
              <Pricebar onpricechange={this.handlepriceclick}/>
            </div>

          </List>

        </div>
      </div>

    );
  }
}
class Pricebar extends React.Component {

  state = {
    secondSlider: 0

  };

  handleSecondSlider = (event, value) => {
    this.setState({secondSlider: value},()=>{
      this.props.onpricechange(this.state.secondSlider);
    });
  };



  render() {
    return (
      <div>
        <Slider
          min={0}
          max={3000}
          step={50}
          value={this.state.secondSlider}
          onChange={this.handleSecondSlider}
        />
        <p className="p">
          <span>{this.state.secondSlider}</span>
          <span className="yuan">元</span>
        </p>
      </div>
    );
  }
}
