import pino, { LoggerOptions } from 'pino';
import pretty from 'pino-pretty';

/*
// Pinoのカスタム設定を定義
const _options: LoggerOptions = {
  transport: {
    target: 'pino-pretty',
  },
};

const prettyOptions = {
  colorize: true, // カラー表示を有効化
  translateTime: 'yyyy-mm-dd HH:MM:ss', // 日時フォーマット
  ignore: 'pid,hostname,parameter,error',
  messageFormat: (log: { parameter?: string; error?: string; msg: string }) => {
    const para_msg = log.parameter ? `パラメーター:${log.parameter}` : '';
    const err_msg = log.error ? `エラー:${log.error}` : '';
    return `${para_msg} ${err_msg} ${log.msg}`;
  },
};*/

// pino-prettyの設定を適用するためには、pinoのtransportオプションに直接含めます。
const logger = pino({
  //..._options,
  transport: {
    target: 'pino-pretty',
  //  options: prettyOptions,
  },
});

logger.level = 'info';

export default logger;