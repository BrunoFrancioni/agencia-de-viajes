const express = require('express');
const router = express.Router();

module.exports = () => {
    router.get('/', (req, res) => {
        res.send('Inicio');
    });

    router.get('/nosotros', (req, res) => {
        res.send('Nosotros');
    });

    return router;
}