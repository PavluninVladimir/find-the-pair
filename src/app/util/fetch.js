import axios from 'axios';

const fetchAPI = (function fetchAPI() {
    return {
        GET: function () {
            return axios.get('/api/v1/login', {
                params: {
                    ID: 12345
                }
            })
                .then(function (response) {
                    return response;
                })
                .catch((err) => {
                    return err;
                })
        },
        post: () => {
            return axios.post('/api/v1/login')
                .then(function (response) {
                    return Promise.resolve(response);
                })
                .catch((err) => {
                    return Promise.reject(err);
                })

        }
    }
})();

export default fetchAPI;