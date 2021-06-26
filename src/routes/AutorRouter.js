const {Router} = require('express');
const Autor = require('../models/Autor');

const router = Router();

router.get('/Autor',(req,resp)=>{
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Autor.find({}).skip(desde).exec(
        (err, autores) => {
            if (err) {
                return resp.status(500).json({
                    ok: false,
                    mensaje: 'Error al traer Autores!',
                    errors: err
                });
            }
            Autor.count({}, (err, conteo) => {
                resp.status(200).json({
                    ok: true,
                    autores: autores,
                    total: conteo
            });
        })
    });
});

router.get('/Autor/:id',(req,resp)=>{
    var id = req.params.id;
    Autor.findById(id,(err,autor)=>{
        if(err){
            return resp.status(500).json({
                ok:false,
                mensaje: 'Error al buscar autor!',
                errors:err
            });
        }
    
        if(!autor){
            return resp.status(400).json({
                ok:false,
                mensaje: 'El Autor con el '+id+' no existe.'
            });
        }
        resp.status(200).json({
            ok: true,
            autor: autor
        });
    })
})


router.post('/Autor',(req,resp)=>{
    const data = req.body;
    const autor = new Autor({
        Nombre:data.Nombre,
        Fecha_Nacimiento: new Date(data.Fecha_Nacimiento),
        Ciudad:data.Ciudad,
        Correo:data.Correo,
        Apellido:data.Apellido
    });
    autor.save((error,registroGuardado)=>{
        if (error){
            return resp.status(400).json({
                ok:false,
                mensaje: 'Error al guardar registro Autor!',
                errors:error
            })
        }
        resp.status(201).json({
            ok:true,
            autor: registroGuardado,
        });

    });

})


router.put('/Autor/:id',(req,resp)=>{
    const data = req.body;
    var id = req.params.id;
    Autor.findById(id,(err,autor)=>{
        if(err){
            return resp.status(500).json({
                ok:false,
                mensaje: 'Error al buscar autor!',
                errors:err
            });
        }
    
        if(!autor){
            return resp.status(400).json({
                ok:false,
                mensaje: 'El Autor con el '+id+' no existe.'
            });
        }

        autor.Nombre = data.Nombre;
        autor.Correo = data.Correo;
        autor.Ciudad = data.Ciudad;
        autor.Fecha_Nacimiento = data.Fecha_Nacimiento;
        autor.Apellido = data.Apellido;
        
        autor.save((error,registroGuardado)=>{
            if (error){
                return resp.status(400).json({
                    ok:false,
                    mensaje: 'Error al actualizar Autor!',
                    errors:error
                })
            }
            resp.status(201).json({
                ok:true,
                autor: registroGuardado,
            });
    
        });
    })
    
})

router.delete('/Autor/:id',(req,resp)=>{

    var id = req.params.id;
    Autor.findByIdAndRemove(id,(err,autorEliminado)=>{
        if(err){
            return resp.status(500).json({
                ok:false,
                mensaje: 'Error al buscar autor!',
                errors:err
            });
        }
    
        if(!autorEliminado){
            return resp.status(400).json({
                ok:false,
                mensaje: 'El Autor con el '+id+' no existe.'
            });
        }
        resp.status(200).json({
            ok: true,
            autor: autorEliminado
        });
    })

})






module.exports = router;