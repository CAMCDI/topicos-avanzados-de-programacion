function escaparCaracteres(datos) {
  const caracteresEspeciales = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
  }

  let cadena = ''
  for (let i = 0; i < datos.length; i++) {
    const caracter = datos.charAt(i)
    if (caracteresEspeciales[caracter] != undefined) {
      cadena += caracteresEspeciales[caracter]
    } else {
      cadena += caracter
    }
  }

  return cadena
}

module.exports = {
  escaparCaracteres
}
