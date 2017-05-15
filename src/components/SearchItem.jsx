import React from 'react';

import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import {Container, Row, Col} from 'reactstrap';
import FlatButton from 'material-ui/FlatButton';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './SearchItem.css'

export default class SearchItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.props.handleSearchItemClick(this.props.indexOfList);
  }

  render() {
    return (

      <div className='searchitem' onClick={this.handleClick}>
        <Link to={`/shop/${this.props.id}`}>
          <a href={''}>
            <Card className="card">
              <CardTitle title={this.props.name} subtitle={this.props.address}/>

              <img className="images"  src={this.props.image==='-1'?'../images/default.png':this.props.image} height="120" width="120"/>
              <CardTitle className="title" title={this.props.category} subtitle={`均消 : ${this.props.average}元`}/>
            </Card>
          </a>
        </Link>

      </div>

    )
  };
}
