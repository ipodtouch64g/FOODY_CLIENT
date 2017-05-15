import React from 'react';
import PropTypes from 'prop-types';
import {
    ListGroup,
    ListGroupItem
} from 'reactstrap';

import PostItem from 'components/PostItem.jsx';


export default class PostList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };

    }

    render() {

        let children = (
            <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
                <div className='empty-text'>No post here.<br />Go add some posts.</div>
            </ListGroupItem>
        );
        if (this.props.posts.length) {
            children = this.props.posts.map(p => (
                <ListGroupItem key={p.p_id} action>
                    <PostItem {...p}  />
                </ListGroupItem>
            ));
        }
        return (
            <div className='post-list'>
                <ListGroup>{children}</ListGroup>
            </div>
        );
    }
}
