import { Logger, createLogger, transports, format } from "winston";
import { ServerStatus } from "../types/types";

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

const devTransport = new transports.File({
  filename: "./log/server.log",
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

interface LogOption {
  status: ServerStatus;
}

const logger = (logOption: LogOption) => {
  switch (logOption.status) {
    case ServerStatus.DEV: {
      return createLogger({
        transports: [devTransport, consoleTransport]
      });
    }
    case ServerStatus.TEST: {
      return createLogger({
        transports: [testTransport]
      });
    }
    default:
      throw new Error(
        `Logger is initialized with strange Option: ${logOption}`
      );
  }
};

export default logger;
