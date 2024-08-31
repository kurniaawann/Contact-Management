import { logger } from "./aplication/loging.js";
import { web } from "./aplication/web.js";

web.listen(4000, () => {
  logger.info("App Start");
});
