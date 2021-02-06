import axios from 'axios';

export function get(url, params) {
    return axios.get(getBaseUrl() + url, getTokenHeader());
}

export function post(url, data) {
    return axios.post(getBaseUrl()  + url, data, getTokenHeader());
}


export function remove (url) {
    return axios.delete(getBaseUrl()  + url, getTokenHeader());
}

const getBaseUrl = () => {
    return 'https://api.bely.me/';
}

const getTokenHeader = () => {
    return { headers: { "GB-Access-Token": '6cd429c13bf7a5cf57cf25298b3f43eb' } };
}