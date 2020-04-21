const express = require('express');
const router = express.Router();

const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

module.exports = () => {
    router.get('/', (req, res) => {
        const promises = [];

        promises.push(Viaje.findAll({
            limit: 3
        }))

        promises.push(Testimonial.findAll({
            limit: 3
        }))

        const resultado = Promise.all(promises);
        
        resultado
            .then(resultado => res.render('index', {
                clase: 'home',
                viajes: resultado[0],
                testimoniales: resultado[1]
            }))
            .catch(error => console.log(error))
    });

    router.get('/nosotros', (req, res) => {
        res.render('nosotros', {
            pagina: 'Sobre Nosotros'
        });
    });

    router.get('/viajes', (req, res) => {
        Viaje.findAll()
            .then(viajes => res.render('viajes', {
                pagina: 'Próximos Viajes',
                viajes
            }))
            .catch(error => console.log(error))
    });

    router.get('/viajes/:id', (req, res) => {
        Viaje.findByPk(req.params.id)
            .then(viaje => res.render('viaje', {
                viaje
            }))
            .catch(error => console.log(error))
    });

    router.get('/testimoniales', (req, res) => {
        Testimonial.findAll()
            .then(testimoniales => res.render('testimoniales', {
                pagina: 'Testimoniales',
                testimoniales
            }))
    });

    router.post('/testimoniales', (req, res) => {
        let {nombre, correo, mensaje} = req.body;

        let errores = [];
        if(!nombre) {
            errores.push({'mensaje': 'Agrega tu nombre'});
        }
        if(!correo) {
            errores.push({'mensaje': 'Agrega tu correo'});
        }
        if(!mensaje) {
            errores.push({'mensaje': 'Agrega tu mensaje'});
        }

        if(errores.length > 0) {
            res.render('testimoniales', {
                errores,
                nombre,
                correo,
                mensaje
            });
        } else {
            Testimonial.create({
                nombre,
                correo,
                mensaje
            }).then(testimonial => res.redirect('/testimoniales'))
            .catch(error => console.log(error))
        }
    });

    return router;
}