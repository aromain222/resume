type Level = 'debug' | 'info' | 'warn' | 'error'

function log(level: Level, messageOrMeta: string | Record<string, unknown>, message?: string): void {
  let msg: string
  let meta: Record<string, unknown>

  if (typeof messageOrMeta === 'string') {
    msg = messageOrMeta
    meta = {}
  } else {
    meta = messageOrMeta
    msg = message ?? '(no message)'
  }

  const entry: { level: Level; message: string; timestamp: string; [key: string]: unknown } = {
    level,
    message: msg,
    timestamp: new Date().toISOString(),
    ...meta,
  }

  if (level === 'error' || level === 'warn') {
    console.error(JSON.stringify(entry))
  } else {
    console.log(JSON.stringify(entry))
  }
}

export const logger = {
  debug(messageOrMeta: string | Record<string, unknown>, message?: string): void {
    log('debug', messageOrMeta, message)
  },
  info(messageOrMeta: string | Record<string, unknown>, message?: string): void {
    log('info', messageOrMeta, message)
  },
  warn(messageOrMeta: string | Record<string, unknown>, message?: string): void {
    log('warn', messageOrMeta, message)
  },
  error(messageOrMeta: string | Record<string, unknown>, message?: string): void {
    log('error', messageOrMeta, message)
  },
}
