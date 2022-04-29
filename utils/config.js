require("dotenv").config();

module.exports.Prefix = {
    DEV: "DEV",
    IMPORT: "IMPORT",
    STORE: "BERLIN",
    ME: "ME",
    STORE_ME: "BERLIN_ME"
};

module.exports.readConfig = (prefix) => {
    return {
        clientId: process.env[prefix + "_CLIENT_ID"] || "",
        clientSecret: process.env[prefix + "_CLIENT_SECRET"] || "",
        projectKey: process.env[prefix + "_PROJECT_KEY"] || "",
        oauthHost: process.env[prefix + "_AUTH_URL"] || "",
        host: process.env[prefix + "_API_URL"] || "",
        username: process.env[prefix + "_CUSTOMER_EMAIL"] || "",
        password: process.env[prefix + "_CUSTOMER_PASSWORD"] || "",
        storeKey: process.env[prefix + "_STORE_KEY"] || ""
    };
}