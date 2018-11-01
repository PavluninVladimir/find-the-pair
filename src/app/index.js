import { hydrate } from 'react-dom';
import App from './app.jsx';

const dev = process.env.NODE_ENV === 'development';
const prod = process.env.NODE_ENV === 'production';

const init = () => hydrate(<App />, document.getElementById('root'));

if (module.hot && dev) {
    module.hot.accept();
    init();
}
if(prod){
    init();
}


