const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const servidor = http.createServer((pedido, respuesta) => {
    const url = new URL('http://localhost:8888' + pedido.url);
    let camino = 'static' + url.pathname;

    if (camino === 'static/') {
        camino = 'static/index.html';
    }

    fs.stat(camino, (error, stats) => {
        if (!error && stats.isFile()) {
            // Detección del tipo de contenido
            const ext = path.extname(camino);
            const mimeTypes = {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'application/javascript',
                '.json': 'application/json',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.gif': 'image/gif',
                '.svg': 'image/svg+xml',
                '.ico': 'image/x-icon',
            };
            const contentType = mimeTypes[ext] || 'application/octet-stream';

            fs.readFile(camino, (error, contenido) => {
                if (error) {
                    respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
                    respuesta.write('Error interno del servidor');
                } else {
                    respuesta.writeHead(200, { 'Content-Type': contentType });
                    respuesta.write(contenido);
                }
                respuesta.end();
            });
        } else {
            respuesta.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
            respuesta.write('<!doctype html><html><head><title>404</title></head><body><h1>Error 404: Recurso no encontrado</h1></body></html>');
            respuesta.end();
        }
    });
});

// Inicia el servidor en el puerto 8888
servidor.listen(8888, () => {
    console.log('Servidor web iniciado en http://localhost:8888');
});
