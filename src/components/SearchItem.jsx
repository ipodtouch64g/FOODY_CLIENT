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

import './SearchItem.css'

export default class SearchItem extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>

        <div className='searchitem'>
          <Card className="card">
            < CardTitle title={this.props.name} subtitle={this.props.address}/>

            <img className="images" alt="X" src={this.props.img_src} height="120" width="120"/>
            <CardTitle className="title" title={this.props.category} subtitle={`   均消 : ${this.props.average}元`}/>
          </Card>
        </div>

      </div>

    )
  };
}
