import axios from 'axios';
const BASE_URL = 'http://localhost:3500';

export default axios.create({
    baseURL: BASE_URL
});

// #14 we create new axios 
// we going use with intersoptor,
//  that will use for refresh the token for geting new expire 
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    // this code will be attach in all request, 
    // for success the request 
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

//  for #15 go to useAxiosPrivet.js