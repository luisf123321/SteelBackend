const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://luis:luis@neivaroutes.ymunc.mongodb.net/pruebasteel?retryWrites=true&w=majority',{
    useNewUrlParser : true,
    useUnifiedTopology:true
}).then(db => {
    console.log("database contado mongo atlas")
}).catch( error =>{
    console.log('error :' + error)
});

