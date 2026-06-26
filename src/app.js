import { logger } from "./application/logging.js";
import { web } from "./application/web.js";


logger.info("App loaded in port 4993");
web.listen(4993);


export default web;

