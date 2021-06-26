const express = require('express');
const {Schema, model} = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Usuario = new Schema({
    Nombre:{type:String, required:[true,'El Nombre Del Usuario Es Necesario']},
    Apellido:{type:String, required:[true,'El Apellido Del Usuario Es Necesario']},
    NumeroDocumento:{type:Number, unique: true,required:[true,'El Numero De Documento Del Usuario Es Necesario']},
    Fecha_Nacimiento:{type: Date, required:[true,'La Fecha de Nacimiento  del Autor Es Necesario']},
    Correo:{type:String, required:[true,'El Correo Del Usuario Es Necesario']},
    Ciudad:{type:String, required:[true,'La Ciudad Del Usuario Es Necesario']},
    Username:{type:String, required:[true,'El Usuario Del Usuario Es Necesario']},
    Password:{type:String, required:[true,'El Password Del Usuario Es Necesario']}
});
Usuario.plugin(uniqueValidator, { message: ' debe ser unico' });
module.exports = model('Usuario',Usuario);