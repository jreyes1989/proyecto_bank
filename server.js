require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');

//autentificacion de la base de datos
db.authenticate()
  .then(() => console.log('Database Authenticated! 😁'))
  .catch((error) => console.log(error));

//sicronizacion de la base de datos
db.sync({ force: true })
  .then(() => console.log('Database Synced! 🤣'))
  .catch((error) => console.log(error));

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
