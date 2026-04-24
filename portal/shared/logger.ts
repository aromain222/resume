// ============================================================
// Structured JSON logger
// ============================================================
//
// Each log line is a JSON object with at minimum:
//   { level, message, timestamp }
// plus any additional metadata passed by the caller.
//
// Output goes to stdout via console.log so it is compatible
// with log-aggregation tools (Datadog, CloudWatch, etc.).
// ============================================================

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  [key: string]: unknown;
}

/**
 * Normalise the overloaded function signature into
 * { message, meta } regardless of argument order.
 *
 * Two call signatures are supported:
 *   logger.info('plain message')
 *   logger.info({ userId: '123', action: 'upsert' }, 'Upserted player')
 */
function resolveArgs(
  metaOrMessage: Record<string, unknown> | string,
  message?: string,
): { message: string; meta: Record<string, unknown> } {
  if (typeof metaOrMessage === 'string') {
    return { message: metaOrMessage, meta: {} };
  }
  return {
    message: message ?? '(no message)',
    meta: metaOrMessage,
  };
}

function emit(level: LogLevel, metaOrMessage: Record<string, unknown> | string, message?: string): void {
  const { message: msg, meta } = resolveArgs(metaOrMessage, message);

  const entry: LogEntry = {
    level,
    message: msg,
    timestamp: new Date().toISOString(),
    ...meta,
  };

  // Use console.error for warn/error so they appear in stderr streams;
  // use console.log for info/debug to keep stdout clean for piping.
  if (level === 'error' || level === 'warn') {
    console.error(JSON.stringify(entry));
  } else {
    console.log(JSON.stringify(entry));
  }
}

export const logger = {
  /**
   * Debug-level messages — verbose operational detail.
   * @param metaOrMessage  Either a metadata object or a plain string message.
   * @param message        Human-readable message (required when first arg is an object).
   */
  debug(metaOrMessage: Record<string, unknown> | string, message?: string): void {
    emit('debug', metaOrMessage, message);
  },

  /**
   * Info-level messages — normal pipeline milestones.
   */
  info(metaOrMessage: Record<string, unknown> | string, message?: string): void {
    emit('info', metaOrMessage, message);
  },

  /**
   * Warn-level messages — recoverable issues worth flagging.
   */
  warn(metaOrMessage: Record<string, unknown> | string, message?: string): void {
    emit('warn', metaOrMessage, message);
  },

  /**
   * Error-level messages — failures that require attention.
   */
  error(metaOrMessage: Record<string, unknown> | string, message?: string): void {
    emit('error', metaOrMessage, message);
  },
};
