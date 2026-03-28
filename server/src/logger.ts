import log from "loglevel";

const level = process.env.LOG_LEVEL || "info";
log.setLevel(level as log.LogLevelDesc);

// Optional: prefix helper for consistent messages
export function prefixLogger(prefix: string) {
  return {
    trace: (...args: any[]) => log.trace(`[${prefix}]`, ...args),
    debug: (...args: any[]) => log.debug(`[${prefix}]`, ...args),
    info: (...args: any[]) => log.info(`[${prefix}]`, ...args),
    warn: (...args: any[]) => log.warn(`[${prefix}]`, ...args),
    error: (...args: any[]) => log.error(`[${prefix}]`, ...args),
  };
}

export default log;
