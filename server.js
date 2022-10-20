const chalk = require('chalk');

const app = require('./app');

const mongoose = require("mongoose")

const {DB_URL, PORT = 3000} = process.env

mongoose.connect(DB_URL)
  .then(() => {
    app.listen(PORT);
    console.log(chalk.blue.bgYellow.bold.italic(`Database connection successful.Server running port: ${PORT}`))
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1)
  })
