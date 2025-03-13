const fs = require('node:fs/promises')
fs.readFile('./archivo1b.txt')
    .then(datos => {
        console.log(datos.toString())
    })
    .catch(error => {
        console.log(error)
    })
console.log('última línea del programa')