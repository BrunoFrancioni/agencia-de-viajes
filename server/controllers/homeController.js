const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

exports.consultasHomePage = async (req, res) => {
    const viajes = await Viaje.findAll({
        limit: 3
    }).catch(error => console.log(error));

    const testimoniales = await Testimonial.findAll({
        limit: 3
    }).catch(error => console.log(error));

    res.render('index', {
        clase: 'home',
        viajes,
        testimoniales
    });
}