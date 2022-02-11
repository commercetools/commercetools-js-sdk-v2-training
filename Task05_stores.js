const { getCustomersInStore, getMe } = require("./handson/store");
const { log } = require("./logger");

getCustomersInStore('berlin-store').then(log).catch(log);

//getMe().then(log).catch(log);
