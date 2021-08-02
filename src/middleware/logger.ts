import { Logger, createLogger, transports, format } from "winston";

const testTransport = new transports.File({
  filename: "./log/test.log",
  level: "debug",
  format: format.combine(
    format.label({ label: "[DiarySNS Test Server]" }),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.printf(
      (info: TransformableInfo) =>
        `${info.timestamp} - $ ${info.level}: ${info.message}`
    )
  )
});

enum LOG_OPTION {
  TEST,
  DEV,
  PRODUCTION
}

interface TransformableInfo {
  level: string;
  message: string;
  [key: string]: any;
}

const consoleTransport = new transports.Console({
  format: format.combine(
    format.label({ label: "[DiarySNS Test Server]" }),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.colorize(),
    format.printf(
      (info: TransformableInfo) =>
        `${info.timestamp} - $ ${info.level}: ${info.message}`
    )
  )
});

const productionTransport = new transports.File({
  filename: "./log/server.log",
  level: "info",
  format: format.combine(
    format.label({ label: "[DiarySNS Test Server]" }),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.printf(
      (info: TransformableInfo) =>
        `${info.timestamp} - $ ${info.level}: ${info.message}`
    )
  )
});

const logger: Logger = createLogger({
  transports: [consoleTransport, productionTransport]
});

export default logger;
