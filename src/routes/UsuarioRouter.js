const {Router} = require('express');
const router = Router();
const Usuario = require('./../models/Usuarios');
const bcrypt = require('bcrypt');

router.post('/Usuario',(req,resp)=>{
    const data = req.body;
    const usuario = new Usuario({
        Nombre: data.Nombre,
        Apellido: data.Apellido,
        NumeroDocumento: data.NumeroDocumento,
        Fecha_Nacimiento: new Date(data.Fecha_Nacimiento),
        Ciudad: data.Ciudad,
        Correo: data.Correo,
        Username: data.Username,
        Password: bcrypt.hashSync(data.Password, 10)
    });
    usuario.save((error,registroGuardado)=>{
        if (error){
            return resp.status(400).json({
                ok:false,
                mensaje: 'Error al registar Usuario!',
                errors:error
            })
        }
        resp.status(201).json({
            ok:true,
            usuario: registroGuardado,
        });

    });
});

router.put('/Usuario/:id',(req,resp)=>{
    var id = req.params.id;
    const data = req.body;
    Usuario.findById(id,(err,usuario)=>{
        if(err){
            return resp.status(500).json({
                ok:false,
                mensaje: 'Error al buscar usuario!',
                errors:err
            });
        }
    
        if(!usuario){
            return resp.status(400).json({
                ok:false,
                mensaje: 'El Usuario con el '+id+' no existe.'
            });
        }

        usuario.Nombre = data.Nombre;
        usuario.Apellido = data.Apellido;
        usuario.NumeroDocumento = data.NumeroDocumento;
        usuario.Fecha_Nacimiento = new Date(data.Fecha_Nacimiento);
        usuario.Correo = data.Correo;
        usuario.Ciudad = data.Ciudad;

        usuario.save((error,registroGuardado)=>{
            if (error){
                return resp.status(400).json({
                    ok:false,
                    mensaje: 'Error al registar Usuario!',
                    errors:error
                })
            }
            resp.status(201).json({
                ok:true,
                usuario: registroGuardado,
            });    
        });
    });
})



module.exports = router;