import Axios from 'axios';

class RestClient {
    fetch = (url, params = {}) => Axios.get(url, {
        params: params
    }).then(res => res.data);

    post = (url, data, params = {}) => Axios.post(url, data, {
        params: params
    }).then(res => res.data);

    authFetch = (url, token, params = {}) => Axios.get(url, {
        params: params,
        headers: { Authorization: 'Bearer ' + token }
    }).then(res => res.data);

    authPost = (url, token, data, params = {}) => Axios.post(url, data, {
        params: params,
        headers: { Authorization: 'Bearer ' + token }
    }).then(res => res.data);
    authUpload = (url, token, file) => {
        const formData = new FormData();
        formData.append('file', file);

        return Axios.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data', Authorization: 'Bearer ' + token },
        }).then(response => response.data);
    };
}

export default new RestClient();