import { ClientResponse, ProductPagedQueryResponse } from "@commercetools/platform-sdk";
import { simulatePagination } from "./handson/search";
import { log } from "./utils/logger";

let lastPage = false,
    lastId: string | undefined,
    products: ClientResponse<ProductPagedQueryResponse>,
    productsCount = 0,
    pageNumber = 0,
    perPage = 2,
    where: string | undefined;

const getPagedQueryResults = async () => {
    while (!lastPage) {
        where = lastId !== undefined ? `id > "${lastId}"` : undefined;
        products = await simulatePagination(perPage, where);
        log(`==== Page number ${++pageNumber} ====`);
        log("");
        products.body.results.forEach(element => {
            log(element.id);
        });
        log("");
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
