const { importApiRoot,projectKey } = require ('./client.js')
const csvtojsonV2 = require("csvtojson");


const createImportSink = (importSinkDraftData) => importApiRoot.withProjectKeyValue({projectKey})
                                                            .importSinks()
                                                            .post({
                                                                body:createImportSinkDraft(importSinkDraftData)
                                                            }).execute();
         
                                                            
const createImportSinkDraft = (importSinkDraftData) => {
    const {key, resourceType}=importSinkDraftData
    return {
        key,
        resourceType
    }
}


const importProducts = (importSinkKey) => importApiRoot.withProjectKeyValue({projectKey})
                                            .products()
                                            .importSinkKeyWithImportSinkKeyValue({importSinkKey})
                                            .post({
                                                body:createImportProductsDraft()
                                            })
                                            .execute();


const createImportProductsDraft = () => {
    return {
        type:"product-draft",
        resources:getProductDraftsArray()
    }
}


const getProductDraftsArray = () => {
    // get data from csv
    // create product drafts array and send it back
    let productDraftsArray = [];
    let participantNamePrefix= 'ff';
    return csvtojsonV2().fromFile('./products.csv').then(products => {
       
        products.forEach(product=>{
            productDraftsArray.push({
                key:participantNamePrefix+'-'+product.productName,
                name:product.productName,
                productType:product.productType,
                slug:participantNamePrefix+'-'+product.productName,
                description: product.description,
                masterVariant:{
                    sku:product.inventoryId,
                    prices:[{
                        value:{
                            currencyCode:product.currencyCode,
                            centAmount:product.basePrice
                        }
                    }],
                    images:[{
                        url:product.imageUrl
                    }]
                }   
            })
        })
        return productDraftsArray;
    });
}


module.exports.importProducts = importProducts;
module.exports.createImportSink = createImportSink;
