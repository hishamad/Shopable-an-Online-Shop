const mongoose = require('mongoose');

const dotenv = require('dotenv');

const app = require('./app');

// Configuration file
dotenv.config({ path: './config.env' });

// Connecting to the database
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connected'));

// Specifing the port, default = 9000
const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
