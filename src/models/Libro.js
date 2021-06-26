const express = require('express');
const {Schema, model} = require('mongoose');


const Libro = new Schema({
    Titulo:{type:String, required:[true,'El Titulo del Libro Es Necesario']},
    Descripcion:{type:String, required:[true,'La Descripcion del Libro Es Necesario']},
    Genero:{type:String, required:[true,'El Genero Del Libro Es Necesario']},
    Paginas:{type:Number, required:[true,'El Numero De Paginas Es Necesario']},
    Editorial:{type: Schema.Types.ObjectId,ref:"Editorial", required:[true,'La Editorial Es Necesario']},
    Autor:{type: Schema.Types.ObjectId, ref:"Autor", required:[true,'El Autor Es Necesario']}
});

module.exports = model('Libro',Libro);