const Redis = require("ioredis");

let cacheInstance = new Redis({
  port: 10097,
  host: "redis-10097.crce179.ap-south-1-1.ec2.cloud.redislabs.com",
  password: "hDsgdt4e0JQEcyPQkxh88lE5LzYleBhx",
});

module.exports = cacheInstance;