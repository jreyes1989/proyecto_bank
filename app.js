// librerias
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// importar rutas
const userRouter = require('./routes/user.routes');
const transferRouter = require('./routes/transfer.routes');

// instanciar la app de express
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//  middleware

app.use(express.json());
app.use(cors());

//routes

app.use('/api/v1/users', userRouter);
app.use('/api/v1/transfers', transferRouter);

module.exports = app;
