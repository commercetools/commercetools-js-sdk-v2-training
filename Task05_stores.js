const { getCustomersInStore, getMe } = require("./handson/store");
const { log } = require("./logger");

getCustomersInStore('de-store').then(log).catch(log);

//getMe().then(log).catch(log);
