const {getMe, getMyOrders } = require("./handson/my");
const { log } = require("./logger");

// TODO: SPA api-client

getMe().then(log).catch(log);

//getMyOrders().then(orders =>
//    orders.body.results.forEach(order =>
//        log(order.id + " : " + order.totalPrice.centAmount)
//    )
//).catch(log);
