const { redisClient } = require("../DB/redisCon");


const setVal = async (key,val) => {
    const res = await redisClient.SET(key, val);
    console.log(res);
    return res;
}
const getVal = async (key) => {
    const res = await redisClient.GET(key);
    console.log(res);
    return res;
}


module.exports = { setVal, getVal };

