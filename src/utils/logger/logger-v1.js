import winston from "winston";
// eslint-disable-next-line no-unused-vars
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, printf, colorize } = winston.format;
const { createLogger, transports } = winston;

class WinstonLogger {
  constructor(options = {}) {
    // Default options
    const defaultOptions = {
      level: "info",
      dirname: "logs",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
      console: true,
      format: combine(
        timestamp({
          format: "YYYY-MM-DD HH:mm:ss.SSS",
        }),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
      ),
    };

    // Merge default options with user-provided options
    this.options = { ...defaultOptions, ...options };

    // Create transports array
    this.transports = [];

    // Console transport
    if (this.options.console) {
      this.transports.push(
        new transports.Console({
          level: this.options.level,
          format: combine(colorize({ all: true }), this.options.format),
        })
      );
    }

    // Daily rotating file transport for each level
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
        new transports.DailyRotateFile({
          level: level,
          dirname: `${this.options.dirname}/${level}`,
          filename: `${level}-%DATE%.log`,
          datePattern: this.options.datePattern,
          zippedArchive: true,
          maxSize: this.options.maxSize,
          maxFiles: this.options.maxFiles,
          format: this.options.format,
        })
      );
    });

    // Create the logger instance
    this.logger = createLogger({
      levels: winston.config.npm.levels,
      transports: this.transports,
      exitOnError: false,
    });

    // Add custom HTTP level
    this.logger.http = (message) => {
      this.logger.log("http", message);
    };
  }

  // Proxy methods to the winston logger
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

  // Add a new transport
  addTransport(transport) {
    this.logger.add(transport);
  }

  // Remove a transport
  removeTransport(transport) {
    this.logger.remove(transport);
  }

  // Get the logger instance
  getLogger() {
    return this.logger;
  }
}

// Example usage:
export const logger = new WinstonLogger({
  level: "debug",
  dirname: "application-logs",
  datePattern: "YYYY-MM-DD-HH",
  maxSize: "50m",
  maxFiles: "30d",
});
