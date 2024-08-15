const express = require('express');
const app = express();
const port = 3000;

// Configurar para servir arquivos estáticos (HTML, CSS, JS) de uma pasta chamada 'public'
app.use(express.static('public'));

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});
