const { simulatePagination } = require("./handson/search");
const { log } = require("./logger");


var page = 1, perPage = 3, lastPage = false, products =  null;

const getPagedQueryResults = async _ => {
    while (!lastPage){
        products = await simulatePagination(perPage,page)
        log("Showing results for page " + page)
        products.body.results.forEach(element => {
            log(element.id)
        });
        lastPage = (products.body.count < perPage)? true : false;
        page++;
    }
}

getPagedQueryResults().catch(log);
