const Viaje = require('../models/Viajes');

exports.mostrarViajes = (req, res) => {
    Viaje.findAll()
        .then(viajes => res.render('viajes', {
            pagina: 'Próximos Viajes',
            viajes
        }))
        .catch(error => console.log(error))
}

exports.mostrarViaje = (req, res) => {
    Viaje.findByPk(req.params.id)
        .then(viaje => res.render('viaje', {
            viaje
        }))
        .catch(error => console.log(error))
}