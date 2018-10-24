import inert from 'inert';
import PluginsAPI from './pluginsAPI';


const pluginsInit = function() {
    return [
        { plugin: inert },
        { plugin: PluginsAPI, options: {url: '/api/v1/login'} }
    ]
}

export default pluginsInit;
