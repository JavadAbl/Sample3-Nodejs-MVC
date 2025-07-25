import winston, {
  createLogger as createWinstonLogger,
  format,
  transports,
} from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, printf, colorize } = format;

const levelFilter = (level) =>
  format((info) => (info.level === level ? info : false))();

class WinstonLogger {
  transports = [];
  options = {};
  logger;

  constructor(options = {}) {
    const defaultOptions = {
      level: "info",
      dirname: "logs",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
      console: true,
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
        printf(({ timestamp, level, message, context, ...meta }) => {
          const extra = Object.keys(meta).length ? JSON.stringify(meta) : "";
          return `[${timestamp}] ${level}${context ? ` [${context}]` : ""}: ${message} ${extra}`;
        })
        // printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
      ),
    };

    this.options = { ...defaultOptions, ...options };

    // Console transport
    if (this.options.console) {
      this.transports.push(
        new transports.Console({
          level: this.options.level,
          format: combine(colorize({ all: true }), this.options.format),
        })
      );
    }

    const levels = [
      "error",
      "warn",
      "info",
      "verbose",
      "debug",
      "silly",
      "http",
    ];

    levels.forEach((level) => {
      this.transports.push(
        new DailyRotateFile({
          level: "silly", // to capture all messages, filtering happens via `format`
          dirname: `${this.options.dirname}/${level}`,
          filename: `${level}-%DATE%.log`,
          datePattern: this.options.datePattern,
          zippedArchive: true,
          maxSize: this.options.maxSize,
          maxFiles: this.options.maxFiles,
          format: combine(
            levelFilter(level),
            //  colorize({ all: true }),
            this.options.format
          ),
        })
      );
    });

    this.logger = createWinstonLogger({
      levels: winston.config.npm.levels,
      transports: this.transports,
      exitOnError: false,
    });

    this.logger.http = (message) => {
      this.logger.log("http", message);
    };
  }
  createContextLogger(contextName) {
    return this.logger.child({ context: contextName });
  }
  error(message, meta) {
    this.logger.error(message, meta);
  }
  warn(message, meta) {
    this.logger.warn(message, meta);
  }
  info(message, meta) {
    this.logger.info(message, meta);
  }
  verbose(message, meta) {
    this.logger.verbose(message, meta);
  }
  debug(message, meta) {
    this.logger.debug(message, meta);
  }
  silly(message, meta) {
    this.logger.silly(message, meta);
  }
  http(message, meta) {
    this.logger.http(message, meta);
  }

  addTransport(transport) {
    this.logger.add(transport);
  }

  removeTransport(transport) {
    this.logger.remove(transport);
  }

  getLogger() {
    return this.logger;
  }
}

const baseLogger = new WinstonLogger();

export const createLogger = (contextName) => {
  return baseLogger.createContextLogger(contextName);
};
