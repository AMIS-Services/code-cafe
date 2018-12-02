const http = require('http');
const querystring = require('querystring');

const countriesModule = require('./countries-module.js')
const server = http.createServer();
server.on('request', (request, response) => {
    if (request.method === 'GET') {

        var query = querystring.parse(request.url.split('?')[1]);
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('X-Powered-By', 'code-cafe');
        response.end(JSON.stringify(countriesModule.countriesQuery(query.region, query.name)));
    }//if GET
});
server.listen(8080);
console.log('JSON Server is running and listening at port 8080' )