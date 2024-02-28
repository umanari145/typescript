import logger from "./logger";


logger.info('info');
logger.trace("traceを出力します。");
logger.debug("debugを出力します。");
logger.info({ parameter: "parameter情報です。" }, "infoを出力します。");
logger.warn("warnを出力します。");
logger.error({ error: "error情報です" }, "errorを出力します。");
logger.fatal("fatalを出力します。");