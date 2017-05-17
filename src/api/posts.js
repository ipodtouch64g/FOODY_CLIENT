import axios from 'axios';

// Develop server URL
  // const postBaseUrl = 'http://localhost:3000/api';

// Staging server URL
const postBaseUrl = 'http://foody.us-west-2.elasticbeanstalk.com/api';

// Production server URL
// const postBaseUrl = 'http://weathermood-production.us-west-2.elasticbeanstalk.com/api';

export function searchListFromApi(searchText = '',place = '',category = '', price = 0) {
    let url = `${postBaseUrl}/rests`;
    let query = [];
    if (searchText)
        query.push(`searchText=${searchText}`);
    if (place)
        query.push(`place=${place}`);
    if (category)
        query.push(`category=${category}`);
    if (price !== 0)
        query.push(`price=${price}`);
    if(query.length)
      url += '?' + query.join('&');

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function sortListFromApi(searchText = '',ascending = true) {
    let url = `${postBaseUrl}/rests`;
    let query = [];
    if (searchText)
        query.push(`searchText=${searchText}`);
    query.push(`ascending=${ascending?'true':'false'}`);
    url += '?' + query.join('&');

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function listPostFromApi(r_id = 0) {
    let url = `${postBaseUrl}/posts`;
    let query;
    query =`r_id=${r_id}`;
    url += '?' + query;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function createPostFromApi(text,id) {
    let url = `${postBaseUrl}/posts`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        text,
        id
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function createRest(newRest) {
    let url = `${postBaseUrl}/rests`;

    console.log(`Making POST request to: ${url}`);
    console.log(newRest);
    return axios.post(url, {
        newRest
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function createVote(id, mood) {
    let url = `${postBaseUrl}/posts/${id}/${mood.toLowerCase()}Votes`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
