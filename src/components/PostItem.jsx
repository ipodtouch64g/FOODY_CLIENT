import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './PostItem.css';

export default class PostItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      const {p_id, text, ts,u_id,img} = this.props;
  return (
      <div className='post-item d-flex flex-column' onClick={this.handleClick}>
          <div className='post d-flex'>
              <img className="images"  src={img==='-1'?'../images/default.png':img} height="60" width="70"/>
              <div className='wrap'>
                  <div className='ts'>{moment(ts * 1000).calendar()}  by  {u_id}</div>
                  <div className='text'>{text}</div>
              </div>
          </div>
      </div>
  );
    }
}
