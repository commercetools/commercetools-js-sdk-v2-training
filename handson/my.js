const { projectMyApiRoot, projectStoreMyApiRoot } = require("./client");

//TODO me client

module.exports.getMe = () => { }

module.exports.getMyOrders = () => { }

module.exports.createMyCart = (customerEmail) => { }

module.exports.getMyActiveCart = () => { }

// TODO in-store me client

// BUG: currently get method does not exist, once SDK is fixed enable this
module.exports.getStoreMe = () => { }

module.exports.getStoreMyOrders = () => { }

module.exports.createInStoreMyCart = (customerEmail) => { }

module.exports.getStoreMyActiveCart = () => { }