const { projectApiRoot } = require("./client");

module.exports.getAllProducts = () =>
  projectApiRoot.products().get().execute();


module.exports.simulateSearch = (searchParams) =>
  projectApiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        staged: searchParams.staged,
        markMatchingVariants: searchParams.markMatchingVariants,
        withTotal: searchParams.withTotal,
        "filter.query": searchParams["filter.query"],
        "filter.facets": searchParams["filter.facets"],
        facet: searchParams.facet,
        filter: searchParams.filter,
      },
    })
    .execute();

module.exports.simulatePagination = async (perPage, where) =>
  projectApiRoot
    .products()
    .get({
      queryArgs: {
        sort: "id asc",
        limit: perPage,
        where: where,
        withTotal: false
      },
    })
    .execute();
