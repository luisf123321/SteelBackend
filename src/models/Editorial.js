const express = require('express');
const {Schema, model} = require('mongoose');

const Editorial = new Schema({
    Nombre:{type:String, required:[true,'El Nombre De la Editorial Es Necesario']},
    Direccion:{type:String, required:[true,'La Direccion De La Editorial Es Necesario']},
    Telefono:{type:Number, required:[true,'El Telefono De La Editorial Es Necesario']},
    Correo:{type:String, required:[true,'El Correo De La Editorial Es Necesario']},
    Max_Libro:{type:Number, required:[true,'El Maximo de Libros Es Necesario']}
})

module.exports = model('Editorial',Editorial);