import { Logger, createLogger, transports, format } from "winston";

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
        `${info.timestamp} - $ ${info.level}: ${info.level} ${info.message}`
    )
  )
});

const fileTransport = new transports.File({
  filename: "./server.log",
  format: format.combine(
    format.label({ label: "[DiarySNS Test Server]" }),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.printf(
      (info: TransformableInfo) =>
        `${info.timestamp} - $ ${info.level}: ${info.level} ${info.message}`
    )
  )
});

const logger: Logger = createLogger({
  transports: [fileTransport, consoleTransport]
});

export default logger;
