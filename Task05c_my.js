const {getMe, getMyOrders } = require("./handson/my");
const { log } = require("./logger");

// TODO: SPA api-client

// getMe().then(log).catch(log);

getMyOrders().then(log).catch(log);
