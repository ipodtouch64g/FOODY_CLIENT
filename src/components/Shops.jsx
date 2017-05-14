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
import './Shops.css'

export default class Shops extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.shopIndex);
    console.log(this.props.posts[this.props.shopIndex]);
    return (

      <div className='wrapper'>

          <div className="wrapper-title">
            <Container fluid>
              <Row>
                <Col sm="auto">
                  <img src={`${this.props.posts[this.props.shopIndex].image}`} className="title-image" height="200" width="200 "alt=""/>
                </Col>
                <Col sm="8">
                  <div>
                    <Row>
                      <div className="store-name">{this.props.posts[this.props.shopIndex].name}</div>
                    </Row>
                    <Row>
                      <div className="store-attributes">{`${this.props.posts[this.props.shopIndex].address}`}</div>
                    </Row>
                  </div>

                </Col>
              </Row>

            </Container>
          </div>

        <Container>




          <Row>
            <Col sm="4" className="description-col">
              <div className="description">
                <Card>
                  <CardTitle title="詳細資料"/>
                  <CardText>
                    <i className="fa fa-cutlery" aria-hidden="true"></i>&nbsp;&nbsp;{this.props.posts[this.props.shopIndex].name}
                    <br/><br/>
                    <i className="fa fa-hashtag" aria-hidden="true"></i>&nbsp;&nbsp;{this.props.posts[this.props.shopIndex].category}
                  <br/><br/>
                    <i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp;{this.props.posts[this.props.shopIndex].address}
                    <br/><br/>
                    <i className="fa fa-usd" aria-hidden="true"></i>&nbsp;&nbsp;{this.props.posts[this.props.shopIndex].average}元
                    <br/><br/>
                    <i className="fa fa-phone" aria-hidden="true"></i>&nbsp;&nbsp;{this.props.posts[this.props.shopIndex].telephon}
                    <br/>
                  </CardText>
                </Card>
              </div>
            </Col>
            <Col sm="8">
              <Row>
                <div className='slide-show'>
                  <h3>slide show</h3>
                </div>
              </Row>
              <Row>
                <div className='post'>
                  <h3>post</h3>
                </div>
              </Row>
              <Row>
                <div className="reference">
                  <Card>
                    <CardTitle title="參考文章"/>
                    <CardText>
                      {this.props.posts[this.props.shopIndex].review1 !== '-1'
                        ? <a href={this.props.posts[this.props.shopIndex].review1}>iPeen參考文章1<br/></a>
                        : <p>目前暫無文章</p>}
                      {(this.props.posts[this.props.shopIndex].review2 !== '-1') &&< a href = {
                        this.props.posts[this.props.shopIndex].review2
                      } > iPeen參考文章2 < br />< /a>}
                      {(this.props.posts[this.props.shopIndex].review3 !== '-1') &&< a href = {
                        this.props.posts[this.props.shopIndex].review3
                      } > iPeen參考文章3 < br />< /a>}
                    </CardText>
                  </Card>
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>

    );
  }
}
