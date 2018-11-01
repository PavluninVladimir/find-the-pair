import Hapi from 'hapi';
import path from 'path';
import fs from 'fs';
import { renderToString } from 'react-dom/server';
import App from '../app/app'
import pluginInit from './plugins/pluginsInit';
import images from './pictures/111.jpg';
const isLocal = process.env.NODE_ENV === 'development';
const host = isLocal ? 'localhost' : 'localhost'
const server = Hapi.server({
    port: 3001,
    host
});

const loadHtml = async (urlPath) => {
    const htmlFilePath = path.resolve('.build', 'assets', 'index.html');
    const htmlFile = await fs.readFileSync(htmlFilePath, "utf8");
    const reactHtml = `<div id="root">${renderToString(<App url={`${urlPath}`} />)}</div>`
    const html = htmlFile.replace('<div id="root"></div>', reactHtml);
    return html;
}

const init = async () => {
    await server.register(pluginInit())
    await server.route({
        method: 'GET',
        path: '/{path*}',
        handler: async (request, h) => {
            return await loadHtml(request.path)
        }
    });
    await server.route({
        method: 'GET',
        path: '/img',
        handler: (request, h) => {

            return `<img src="${images}" />`
        }
    });
    await server.route({
        method: 'GET',
        path: '/assets/{path*}',
        handler: {
            directory: {
                path: './.build/assets',
                listing: false,
                index: false
            }
        }
    });
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();