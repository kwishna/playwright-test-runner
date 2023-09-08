import log4js from 'log4js';
import { resolve } from 'path';

// Load the log4js configuration from the log4js.json file
log4js.configure(resolve('./log4js.json'));

// Create and export a logger instance
export const logger = log4js.getLogger();
