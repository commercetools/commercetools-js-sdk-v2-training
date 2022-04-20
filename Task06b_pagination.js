const { simulatePagination } = require("./handson/search");
const { log } = require("./logger");


let perPage = 2, lastPage = false, products = null, productsCount = 0, lastId = null, where = null;

const getPagedQueryResults = async _ => {
    while (!lastPage) {
        where = lastId != null ? `id > "${lastId}"` : null;
        products = await simulatePagination(perPage, where)
        log("//////////////////")
        products.body.results.forEach(element => {
            log(element.id)
        });
        productsCount = products.body.count;
        if (productsCount == perPage) {
            lastId = products.body.results[productsCount - 1].id;
        }
        else {
            lastPage = true;
        }
    }
}

getPagedQueryResults().catch(log);
