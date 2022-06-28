import http from "http";


const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/JSON');
    response.setHeader('X-Powered-By', 'NodeJS');
    const { url, method } = request;

    if (url === '/') {
        if (method === 'GET') {
            response.end(JSON.stringify({
                message: "Ini adalah homepage"
            }));
        } else {
            response.end(JSON.stringify({
                message: "IHalaman tidak bisa diakses"
            }));
        }

    } else if (url === '/about') {
        if (method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: "Ini adalah halaman about"
            }));
        } else if (method === 'POST') {
            let body = [];
            request.on('data', (chunk) => {
                body.push(chunk);
            });
            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.statusCode = 200;
                response.end(JSON.stringify({
                    message: "Halo, ${name}! Ini adalah halaman about"
                }));
            });
        } else {
            response.statusCode = 404;
            response.end(JSON.stringify({
                message: "Halaman tidak dapat diakses dengan <any> request",
            }));
        }
    } else {
        response.statusCode = 404;
        response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan!',
        }));
    }












    // if (method === 'PUT') {
    //     response.end('<h1>Bonjour!</h1>');
    // }

    // if (method === 'DELETE') {
    //     response.end('<h1>Salam!</h1>');
    // }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});