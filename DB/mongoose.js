const mongoose = require('mongoose');
const chalk = require("chalk");
const url = process.env.MongodbUrl.toString();
const mongoConnection = () => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(chalk.bold.blue("Connecting  to  MongoDB...."));
              mongoose.connect(url, {
                useNewUrlParser: true,
                keepAlive: true,
         }).then(() => {
            console.log(chalk.bold.green("Connected to DB"));
             resolve(true);  
             
            })
        } catch (e) {
            console.log(chalk.bold.red(err.message));
            reject(false);
        }
    })
}
mongoose.connection.on("error", (e) => {
    console.log(chalk.bold.red(e.message));
})




module.exports = { connectDatabase: mongoConnection };

