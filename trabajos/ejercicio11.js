const http = require('node:http');
const fs = require('node:fs');

const mime = {
    'html': 'text/html',
    'css': 'text/css',
    'jpg': 'image/jpeg',
    'ico': 'image/x-icon',
    'mp3': 'audio/mpeg',
    'mp4': 'video/mp4'
};

const cache = {};

const servidor = http.createServer((pedido, respuesta) => {
    const url = new URL('http://localhost:8888' + pedido.url);
    let camino = 'static' + url.pathname;

    if (camino === 'static/') {
        camino = 'static/index.html';
    }

    if (cache[camino]) {
        const extension = camino.split('.').pop();
        const mimearchivo = mime[extension] || 'application/octet-stream';
        
        respuesta.writeHead(200, { 'Content-Type': mimearchivo });
        respuesta.end(cache[camino]);
        console.log('Recurso recuperado del caché: ' + camino);
    } else {
        fs.stat(camino, (error, stats) => {
            if (!error && stats.isFile()) {
                fs.readFile(camino, (error, contenido) => {
                    if (error) {
                        respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
                        respuesta.end('Error interno del servidor');
                    } else {
                        cache[camino] = contenido;

                        const extension = camino.split('.').pop();
                        const mimearchivo = mime[extension] || 'application/octet-stream';
                        
                        respuesta.writeHead(200, { 'Content-Type': mimearchivo });
                        respuesta.end(contenido);
                        console.log('Recurso leído del disco: ' + camino);
                    }
                });
            } else {
                respuesta.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
                respuesta.end('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');
            }
        });
    }
});

// Iniciar el servidor en el puerto 8888
servidor.listen(8888, () => {
    console.log('Servidor web iniciado en http://localhost:8888');
});
