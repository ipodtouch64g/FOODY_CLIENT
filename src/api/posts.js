import axios from 'axios';
import uuid from 'uuid/v4';
import moment from 'moment';
import 'babel-polyfill';

// Develop server URL
const postBaseUrl = 'http://localhost:3000/api';

// Staging server URL
// const postBaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api';

// Production server URL
// const postBaseUrl = 'http://weathermood-production.us-west-2.elasticbeanstalk.com/api';

export function searchList_fake(searchText = '') {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(_searchList_fake(searchText));
        }, 500);
    });
}

// Simulated server-side code
function _searchList_fake(searchText='') {
    // let postString = localStorage.getItem(postKey);
    // let posts = postString
    //     ? JSON.parse(postString)
    //     : [];
    // if (posts.length > 0 && searchText) {
    //     posts = posts.filter(p => {
    //         return p.text.toLocaleLowerCase().indexOf(searchText.toLowerCase()) !== -1
    //     });
    // }

    let post = require('../data.json');

    console.log(searchText);
    if (post.rests.length > 0 ) {
      console.log("CHECK!");
      post.rests = post.rests.filter(p => {
          return p.name.indexOf(searchText) !== -1 || p.category.indexOf(searchText) !== -1
      });
    }


    console.log(post);
    return post;
};


// export function listPosts(searchText = '', start) {
//     let url = `${postBaseUrl}/posts`;
//     let query = [];
//     if (searchText)
//         query.push(`searchText=${searchText}`);
//     if (start)
//         query.push(`start=${start}`);
//     if (query.length)
//         url += '?' + query.join('&');
//
//     console.log(`Making GET request to: ${url}`);
//
//     return axios.get(url).then(function(res) {
//         if (res.status !== 200)
//             throw new Error(`Unexpected response code: ${res.status}`);
//
//         return res.data;
//     });
// }
//
// export function createPost(mood, text) {
//     let url = `${postBaseUrl}/posts`;
//
//     console.log(`Making POST request to: ${url}`);
//
//     return axios.post(url, {
//         mood,
//         text
//     }).then(function(res) {
//         if (res.status !== 200)
//             throw new Error(`Unexpected response code: ${res.status}`);
//
//         return res.data;
//     });
// }
//
// export function createVote(id, mood) {
//     let url = `${postBaseUrl}/posts/${id}/${mood.toLowerCase()}Votes`;
//
//     console.log(`Making POST request to: ${url}`);
//
//     return axios.post(url).then(function(res) {
//         if (res.status !== 200)
//             throw new Error(`Unexpected response code: ${res.status}`);
//
//         return res.data;
//     });
// }
