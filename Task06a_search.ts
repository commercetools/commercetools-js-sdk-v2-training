import { getAllProducts, simulateSearch } from "./handson/search";
import { log } from "./utils/logger";

getAllProducts().then(log).catch(log)

simulateSearch().then(log).catch(log);
