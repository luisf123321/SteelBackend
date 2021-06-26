const express = require('express');
const {Schema, model} = require('mongoose');

const Autor = new Schema({
    Nombre:{type:String, required:[true,'El Nombre Del Autor Es Necesario']},
    Apellido:{type:String, required:[true,'El Apellido Del Autor Es Necesario']},
    Fecha_Nacimiento:{type: Date, required:[true,'La Fecha de Nacimiento  del Autor Es Necesario']},
    Ciudad:{type:String, required:[true,'La Ciudad De Autor Es Necesario']},
    Correo:{type:String, required:[true,'El Correo Del Autor Es Necesario']}
},{
    timestamps:true
});

module.exports = model('Autor', Autor);





