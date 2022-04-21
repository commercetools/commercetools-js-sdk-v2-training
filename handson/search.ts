import { apiRoot } from "./client";

export const getAllProducts = () =>
  apiRoot.products().get().execute();

// filter query recalculates everything
// filter facet recalculates others only
export const simulateSearch = () =>
  apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: "categories.id:\"19052d26-a074-4073-8f5f-55eddf721168\"",
        facet: ["variants.attributes.size", "variants.attributes.weight_in_kg"],
        "filter.query": "variants.attributes.size:\"box\"",
      },
    })
    .execute();

export const simulatePagination = async (perPage: number, where: string | undefined) =>
  apiRoot
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
