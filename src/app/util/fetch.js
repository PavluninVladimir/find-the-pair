import axios from 'axios';

const fetchAPI = (url) => {
    return {
        GET: function () {
            return axios.get(url, {
            })
                .then(function (response) {
                    return response;
                })
                .catch((err) => {
                    return err;
                })
        }
    }
};

export default fetchAPI;