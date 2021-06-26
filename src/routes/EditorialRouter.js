const {Router} = require('express');
const Editorial = require('../models/Editorial');

const router = Router();

router.get('/Editorial',(req,resp)=>{
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Editorial.find({}).skip(desde).exec(
        (err, editoriales) => {
            if (err) {
                return resp.status(500).json({
                    ok: false,
                    mensaje: 'Error al Traer Editoriales!',
                    errors: err
                });
            }
            Editorial.count({}, (err, conteo) => {
                resp.status(200).json({
                    ok: true,
                    editoriales: editoriales,
                    total: conteo
            });
        })
    });

});

router.get('/Editorial/:id',(req,resp)=>{
    var id = req.params.id;
    Editorial.findById(id,(err,editorial)=>{
        if(err){
            return resp.status(500).json({
                ok:false,
                mensaje: 'Error al buscar editorial!',
                errors:err
            });
        }
    
        if(!editorial){
            return resp.status(400).json({
                ok:false,
                mensaje: 'la editorial con el '+id+' no existe.'
            });
        }
        resp.status(200).json({
            ok: true,
            editorial: editorial
        });
    })
});
router.post('/Editorial',(req,resp)=>{
    const data = req.body;
    const editorial = new Editorial({
        Nombre:data.Nombre,
        Direccion:data.Direccion,
        Telefono:data.Telefono,
        Correo:data.Correo,
        Max_Libro:data.Max_Libro
    });
    editorial.save((error,registroGuardado)=>{
        if (error){
            return resp.status(400).json({
                ok:false,
                mensaje: 'Error al guardar registro Editorial!',
                errors:error
            })
        }
        resp.status(201).json({
            ok:true,
            editorial: registroGuardado,
        });

    })
    
});

router.put('/Editorial',(req,resp)=>{
    var data = req.body;
    var id = req.params.id;
    Editorial.findById(id,(err,editorial)=>{
        if(err){
            return resp.status(500).json({
                ok:false,
                mensaje: 'Error al buscar editorial!',
                errors:err
            });
        }
    
        if(!editorial){
            return resp.status(400).json({
                ok:false,
                mensaje: 'la editorial con el '+id+' no existe.'
            });
        }

        editorial.Nombre = data.Nombre;
        editorial.Correo = data.Correo;
        editorial.Direccion = data.Direccion;
        editorial.Telefono = data.Telefono;
        editorial.Max_Libro = data.Max_Libro;
        
        editorial.save((error,registroGuardado)=>{
            if (error){
                return resp.status(400).json({
                    ok:false,
                    mensaje: 'Error al actualizar Editorial!',
                    errors:error
                })
            }
            resp.status(201).json({
                ok:true,
                editorial: registroGuardado,
            });
    
        })
    })
    

});
router.delete('/Editorial/:id',(req,resp)=>{
    var id = req.params.id;
    Editorial.findByIdAndRemove(id,(err, editorialEliminado)=>{
        if(err){
            return resp.status(500).json({
                ok:false,
                mensaje: 'Error al buscar editorial!',
                errors:err
            });
        }
    
        if(!editorialEliminado){
            return resp.status(400).json({
                ok:false,
                mensaje: 'La editorial con el '+id+' no existe.'
            });
        }
        resp.status(200).json({
            ok: true,
            autor: editorialEliminado
        });
    })
    
});

module.exports = router;