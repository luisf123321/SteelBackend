const {Router} = require('express');
const Libro = require('../models/Libro');

const router = Router();

router.get('/Libro',(req,resp)=>{
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Libro.find({}).skip(desde).exec(
        (err, libros) => {
            if (err) {
                return resp.status(500).json({
                    ok: false,
                    mensaje: 'Error al traer Libros!',
                    errors: err
                });
            }
            Libro.count({}, (err, conteo) => {
                resp.status(200).json({
                    ok: true,
                    libros: libros,
                    total: conteo
            });
        })
    });

})


router.get('/Libro/id/:id',(req,resp)=>{
    var id = req.params.id;
    Libro.findById(id,(err,libro)=>{
        if(err){
            return resp.status(500).json({
                ok:false,
                mensaje: 'Error al buscar libro!',
                errors:err
            });
        }
    
        if(!libro){
            return resp.status(400).json({
                ok:false,
                mensaje: 'El Libro con el '+id+' no existe.'
            });
        }
        resp.status(200).json({
            ok: true,
            libro: libro
        });
    })
})

router.get('/Libro/list',(req,resp)=>{
    var desde = req.query.desde || 0;
    desde = Number(desde);

    // CAMBIO!!! -*-*-*-*-*-*-*
    Libro.find({}, 'Titulo Nombre Genero Paginas Editorial Autor _id')
        .populate({ path: 'Editorial', select: ('Editorial', 'Nombre') })
        .populate({ path: 'Autor', select: ('Autor', 'Nombre') })
        .skip(desde).limit(5).exec(
            (err, libros) => {

                if (err) {
                    return resp.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando libros!',
                        errors: err
                    });
                }

                Libro.count({}, (err, conteo) => {
                    resp.status(200).json({
                        ok: true,
                        libros: libros,
                        total: conteo
                    });
                })
            });
})


router.post('/Libro',(req,resp)=>{
    const data = req.body;
    const libro = new Libro({
        Titulo:data.Titulo,
        Genero:data.Genero,
        Descripcion:data.Descripcion,
        Paginas:data.Paginas,
        Editorial:data.Editorial,
        Autor:data.Autor
    });

    libro.save((error,registroGuardado)=>{
        if (error){
            return resp.status(400).json({
                ok:false,
                mensaje: 'Error al guardar registro Libro!',
                errors:error
            })
        }
        resp.status(201).json({
            ok:true,
            libro: registroGuardado,
        });

    });
    
});

router.delete('/Libro/:id',(req,resp)=>{
    var id = req.params.id;
    Libro.findByIdAndRemove(id,(err,libroEliminado)=>{
        if(err){
            return resp.status(500).json({
                ok:false,
                mensaje: 'Error al buscar libro!',
                errors:err
            });
        }
    
        if(!libroEliminado){
            return resp.status(400).json({
                ok:false,
                mensaje: 'El Libro con el '+id+' no existe.'
            });
        }
        resp.status(200).json({
            ok: true,
            autor: libroEliminado
        });
    });
});


router.put('/Libro/:id',(req,resp)=>{
    const data = req.body;
    var id = req.params.id;
    Libro.findById(id,(err,libro)=>{
        if(err){
            return resp.status(500).json({
                ok:false,
                mensaje: 'Error al buscar libro!',
                errors:err
            });
        }
    
        if(!libro){
            return resp.status(400).json({
                ok:false,
                mensaje: 'El Libro con el '+id+' no existe.'
            });
        }

        libro.Titulo = data.Titulo;
        libro.Descripcion = data.Descripcion;
        libro.Genero = data.Genero;
        libro.Paginas = data.Paginas;
        libro.Editorial = data.Editorial;
        libro.Autor = data.Autor;

        libro.save((error,registroGuardado)=>{
            if (error){
                return resp.status(400).json({
                    ok:false,
                    mensaje: 'Error al guardar registro Libro!',
                    errors:error
                })
            }
            resp.status(201).json({
                ok:true,
                libro: registroGuardado,
            });
    
        });
    })

});

router.get('/Libro/buscar/:nombre',(req,resp)=>{
    var nombre = req.params.nombre;
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Libro.find({"Titulo":{$regex:".*"+nombre}},'Titulo Nombre Genero Paginas Editorial Autor _id')
        .populate({ path: 'Editorial', select: ('Editorial', 'Nombre') })
        .populate({ path: 'Autor', select: ('Autor', 'Nombre') })
        .skip(desde).limit(5).exec(
            (err, libros) => {

                if (err) {
                    return resp.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando libros!',
                        errors: err
                    });
                }

                Libro.count({}, (err, conteo) => {
                    resp.status(200).json({
                        ok: true,
                        libros: libros,
                        total: conteo
                    });
                })
            });
})


module.exports = router;