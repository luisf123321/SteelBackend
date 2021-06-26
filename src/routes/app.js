const {Router} = require('express');

const router = Router();

router.get('/', (req, resp)=>{
    resp.send("hello word services Prueba Steel Software")
})

module.exports = router;

