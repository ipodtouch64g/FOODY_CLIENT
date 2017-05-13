import React from 'react';
import PropTypes from 'prop-types';
import {
    ListGroup,
    ListGroupItem
} from 'reactstrap';

import SearchItem from 'components/SearchItem.jsx';
import {searchList_fake} from 'api/posts.js';

import './SearchList.css';

export default class SearchList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };


    }

    render() {
        const {posts} = this.props;

        let children = (
            <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
                <div className='empty-text'>找不到餐廳喔<br />試試看別的吧</div>
            </ListGroupItem>
        );
        if (posts.length) {
            children = posts.map(p => (
                <ListGroupItem key={p.id} action>
                    <SearchItem {...p}/>
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
