// Importar Express

const express = require('express');
const path = require('path');
const routes = require('./routes');

const configs = require('./config');

// Configurar Express

const app = express();

// Habilitar Pug

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, './views'));

// Validar si estamos en desarrollo o en producción

const config = configs[app.get('env')];

app.locals.titulo = config.nombresitio;

// Cargar una carpeta estática

app.use(express.static('public'));

// Muestra el año actual

app.use((req, res, next) => {
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    return next();
});

// Cargar las rutas

app.use('/', routes());

app.listen(3000);