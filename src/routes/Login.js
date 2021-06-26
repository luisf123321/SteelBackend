const {Router} = require('express');
const router = Router();
const Usuarios = require('./../models/Usuarios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/Login',(req,resp)=>{
    const data = req.body;
    
    Usuarios.findOne({Username:data.Username},(err, usuarioDB)=>{
        if(err){
            return resp.status(500).json({
                ok:false,
                mensaje: 'Error al buscar usuario!',
                errors:err
            });
        }

        if(!usuarioDB){
            return resp.status(400).json({
                ok:false,
                mensaje: 'Credenciales no validas - username.',
                errors:err
            });
        }

        if(!bcrypt.compareSync(data.Password, usuarioDB.Password)){
            return resp.status(400).json({
                ok:false,
                mensaje: 'Credenciales no validas-password.',
                errors:err
            });

        }

        var token = jwt.sign({usuario: usuarioDB},"secretokey",{expiresIn:14400}); // 4 horas y luego expirara el token.

        resp.status(200).json({
            usuario:usuarioDB,
            token
        });

    });

})



module.exports = router;