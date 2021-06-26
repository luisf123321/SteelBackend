const express = require("express")
const app = express();
var cors = require('cors')
app.use(cors());
const PORT = 3000;
require('./Database');

app.use(express.json());
app.use(require('./routes/app'));
app.use(require('./routes/AutorRouter'));
app.use(require('./routes/EditorialRouter'));
app.use(require('./routes/LibroRouter'));
app.use(require('./routes/Login'));
app.use(require('./routes/UsuarioRouter'))



let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);