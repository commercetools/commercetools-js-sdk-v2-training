const { simulatePagination } = require("./handson/search");
const { log } = require("./logger");


simulatePagination(2,2).then(products =>{
    products.body.results.forEach(element => {
        log(element.id)
    });
}).catch(log);