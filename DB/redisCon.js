const redis = require("redis");
const chalk = require("chalk");
const client = redis.createClient({
  password: process.env.redis_password,
  socket: {
    host: process.env.redis_url,
    port: 13020
  },
  keepAlive:true
});

const connectClient = function () {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(chalk.bold.yellow("Connecting to redis...."));
      await client.connect();
      client.on("error", async (e) => {
        console.log(chalk.bold.red("Redis connection error",e));
        //await client.connect();
        
      })
      console.log(chalk.bold.green("Redis Client Ready"));
      resolve(true);
    } catch (e) {
      console.log(chalk.bold.red("Error:  " + e.message));
      reject(false);
    }
  });
};
module.exports = { connectRedis: connectClient, redisClient: client };
