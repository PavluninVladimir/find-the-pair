'use strict';
import getImg from '../util/list-img';

const pluginFetchAPI = {
    name: 'fetchAPI',
    version: '0.1.0',
    register: async function (server, options) {
        server.route({
            method: 'GET',
            path: options.url,
            handler: function (request, h) {
                return h.response(getImg(Number(request.params.count)));
            }
        });
    }
};

export default pluginFetchAPI;