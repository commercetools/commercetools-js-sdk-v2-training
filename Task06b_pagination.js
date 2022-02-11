const { simulatePagination } = require("./handson/search");
const { log } = require("./logger");


var perPage = 2, lastPage = false, products =  null, lastId = null, where = null;

const getPagedQueryResults = async _ => {
    while (!lastPage){
        where = lastId != null ? `id > "${lastId}"`: null;
        products = await simulatePagination(perPage,where)
        log("//////////////////")
        products.body.results.forEach(element => {
            log(element.id)
        });
        productCount = products.body.count;
        if(productCount == perPage){
            lastId = products.body.results[productCount - 1].id;
        }
        else {
            lastPage = true;
        }
    }
}

getPagedQueryResults().catch(log);
