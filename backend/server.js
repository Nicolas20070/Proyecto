const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuarioRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});