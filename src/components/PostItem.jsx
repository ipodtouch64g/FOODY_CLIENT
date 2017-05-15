import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class PostItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {p_id, text, ts} = this.props;
        return (
            <div className='post-item d-flex flex-column' onClick={this.handleClick}>
                <div className='post d-flex'>
                    <div className='wrap'>
                        <div className='ts'>{moment(ts * 1000).calendar()}</div>
                        <div className='text'>{text}</div>
                    </div>
                </div>
            </div>
        );
    }
}
