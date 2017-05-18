import React from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import {
  Container,
  ButtonDropdown,
  Form,
  Input,
  Button,
  Row,
  Col
} from 'reactstrap';
import FlatButton from 'material-ui/FlatButton';
import './Shops.css';
import { listPostFromApi,createPostFromApi} from 'api/posts.js';
import PostList from './PostList.jsx';
import Map from './Map.jsx'
export default class Shops extends React.Component {
  constructor(props) {
  super(props);
    this.inputEl = null;
        this.state = {
            inputValue: '',
            formToggle: false,
            posts: []
        };

    this.createPost = this.createPosts.bind(this);
    this.listPost = this.listPost.bind(this);
    this.handleFormToggle = this.handleFormToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e) {
    this.setState({inputValue: e.target.value});
}

  handleFormToggle() {
        this.setState((prevState, props) => ({
            formToggle: !prevState.formToggle
        }));
    }

  handleSubmit(e) {
        e.preventDefault();
        console.log (this.props.FBinfo);
        this.inputEl.blur();
        if (this.state.inputValue && this.state.inputValue.trim()) {
            let tmp = this.props.FBinfo.picture?this.props.FBinfo.picture.data.url:'-1';
            //console.log("FB??",tmp);
            this.createPosts(this.state.inputValue,this.props.rests[this.props.shopIndex].id,this.props.FBinfo.name,tmp);
            this.handleFormToggle();
        } else {
            this.state.inputEl = '';
        }
    }

    listPost(r_id) {
      listPostFromApi(r_id).then(posts => {
        this.setState({
          posts:posts
          }, () => {
            console.log("ajax call", this.state.posts);
          });
        }).catch(err => {
          console.error('Error listing posts', err);
          this.setState({posts: []});
        });
    }

    createPosts(text,r_id,u_id,img) {
      //console.log("CREATE?",u_id,img);
        createPostFromApi(text,r_id,u_id,img).then(posts => {
            this.listPost(r_id);
            console.log("ajax call", this.state.posts);
        }).catch(err => {
          console.error('Error listing posts', err);
          this.setState({posts: []});
        });
    }

  componentWillMount(){
    this.listPost(this.props.rests[this.props.shopIndex].id);
  }

  render() {
    return (

      <div className='wrapper'>

        <div className="wrapper-title">
          <Container fluid>
            <Row>
              <div className="map">
                <Map lat={this.props.rests[this.props.shopIndex].lat} lng={this.props.rests[this.props.shopIndex].lng}/>
              </div>
              <Col sm="auto">
                <a href={"https://www.google.com.tw/maps/search/" + this.props.rests[this.props.shopIndex].name}>
                  <img src={this.props.rests[this.props.shopIndex].image === '-1'
                    ? '../images/default.png'
                    : this.props.rests[this.props.shopIndex].image} className="title-image" height="200" width="200 " alt=""/>
                </a>
              </Col>
              <Col sm="8">
                <div className="text">
                  <Row>
                    <div className="store-name">{this.props.rests[this.props.shopIndex].name}</div>
                  </Row>
                  <Row>
                    <div className="store-attributes">{`${this.props.rests[this.props.shopIndex].address}`}</div>
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
                    <i className="fa fa-cutlery" aria-hidden="true"></i>&nbsp;&nbsp;{this.props.rests[this.props.shopIndex].name}
                    <br/><br/>
                    <i className="fa fa-hashtag" aria-hidden="true"></i>&nbsp;&nbsp;{this.props.rests[this.props.shopIndex].category}
                  <br/><br/>
                    <i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp;{this.props.rests[this.props.shopIndex].address}
                    <br/><br/>
                    <i className="fa fa-usd" aria-hidden="true"></i>&nbsp;&nbsp;{this.props.rests[this.props.shopIndex].average}元
                    <br/><br/>
                    <i className="fa fa-phone" aria-hidden="true"></i>&nbsp;&nbsp;{this.props.rests[this.props.shopIndex].telephon}
                    <br/>
                  </CardText>
                </Card>
              </div>
            </Col>
            <Col sm="8">
              {/* <Row>
                <div className='slide-show'>
                  <h3>slide show</h3>
                </div>
              </Row> */}
              <Row>
                <div className="post-list">
                  <Card>
                    <CardTitle title="評論"/>
                    <PostList className="postList" posts={this.state.posts}/>
                      <div className={`post-form`}>{this.state.formToggle ?
                      <Form className='form-inline justify-content-center' onSubmit={this.handleSubmit}>
                              <Input type='textarea' name='postText' getRef={el => {this.inputEl = el}} value={this.state.inputValue} onChange={this.handleInputChange}></Input>&nbsp;
                              <Button color="danger">發表</Button>
                          </Form>
                          :<Button className='btn-form'  onClick={this.handleFormToggle}><i className='fa fa-commenting' aria-hidden="true"></i>&nbsp;&nbsp;給點建議&nbsp;&nbsp;</Button>
                      }</div>
                  </Card>
                </div>
              </Row>

              <Row>
                <div className="reference">
                  <Card>
                    <CardTitle title="參考文章"/>
                    <CardText>
                      {this.props.rests[this.props.shopIndex].review1 !== '-1'
                        ? <a href={this.props.rests[this.props.shopIndex].review1}>iPeen參考文章1<br/></a>
                        : <p>目前暫無文章</p>}
                      {(this.props.rests[this.props.shopIndex].review2 !== '-1') &&< a href = {
                        this.props.rests[this.props.shopIndex].review2
                      } > iPeen參考文章2 < br />< /a>}
                      {(this.props.rests[this.props.shopIndex].review3 !== '-1') &&< a href = {
                        this.props.rests[this.props.shopIndex].review3
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
