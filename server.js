require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_API);
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const path = require('path');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Servir el directorio público
app.use(express.static('public'));

// Ruta para servir swagger_output.json
app.get('/swagger_output.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'swagger_output.json'));
});

// Ruta Base -> Documentación
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
  res.status(204).send(); // 204 No Content
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
