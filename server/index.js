// Importar Express

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');

const configs = require('./config');

const db = require('./config/database');

db.authenticate()
    .then(() => console.log('Db conectada'))
    .catch(error => console.log(error));

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
    res.locals.ruta = req.path;
    return next();
});

// Ejecutamos body-parser

app.use(bodyParser.urlencoded({extended: true}));

// Cargar las rutas

app.use('/', routes());

app.listen(3000);