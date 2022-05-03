const { simulatePagination } = require("./handson/search");
const { log } = require("./utils/logger");

// UseCases
// Fetching ALL products
// Fetching ALL products of a certain type
// Fetching ALL orders
// Pagination of some entities BUT only ordered via id

const getPagedQueryResults = async () => {

    // Instead of using offset to get a page, ask for products being greater than the id of the
    // previous products in your project

    const PAGE_SIZE = 2; // How many products per page

    let lastId, where, seenlastPage;

    do {

        // Ask for next page of products
        const { results: products, count } = (await simulatePagination(PAGE_SIZE, where)).body;

        // Process/print products
        products.forEach(p => log(p.id));

        // Have we processed the last page of products
        seenlastPage = count < PAGE_SIZE;

        // In case this was not the last page, prepare new query predicate
        if (count === PAGE_SIZE) {
            lastId = products[products.length - 1].id;
            where = `id > "${lastId}"`;
        }

    } while (!seenlastPage)
}

getPagedQueryResults().catch(log);
