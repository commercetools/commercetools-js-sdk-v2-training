const { getAllProducts, simulateSearch } = require("./handson/search");
const { log } = require("./logger");

 getAllProducts().then(log).catch(log)

//simulateSearch().then(log).catch(log);
