const { connectDatabase } = require("./mongoose");
const { connectRedis } = require("./redisCon");
const DbConnection = async () => {
    const res = await Promise.all([connectDatabase(),connectRedis()]);
    return res[0] ? true : false;
}
module.exports = { connectDB: DbConnection };



