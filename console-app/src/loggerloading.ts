import logger from "./logger";
import pino from 'pino';

logger.info('info');
logger.trace("traceを出力します。");
logger.debug("debugを出力します。");
logger.info({ parameter: "parameter情報です。" }, "infoを出力します。");
logger.warn("warnを出力します。");
logger.error({ error: "error情報です" }, "errorを出力します。");
logger.fatal("fatalを出力します。");

// Pinoの設定でpino-prettyを指定
const logger2 = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true, // ログに色を付ける
        // ignore: 'pid,hostname', // ログからプロセスIDとホスト名を省略
      }
    }
});
  
logger2.info({ lang: 'JavaScript', version: 'ES6' }, 'ログメッセージにパラメータを含めることもできます');
logger2.info('これは情報ログです');
logger2.error('これはエラーログです'); 