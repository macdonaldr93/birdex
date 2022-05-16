const isSessionStorageSupported =
  typeof window !== 'undefined' && window.sessionStorage;

export const LogLevel = {
  Debug: 0,
  Log: 1,
  Info: 2,
  Warn: 3,
  Error: 4,
};

let param = getParameterByName('debug');

if (isSessionStorageSupported) {
  let persistedParam = window.sessionStorage.getItem('debug');

  if (persistedParam && !param) {
    param = persistedParam;
  }
}

const tag = '[Birdle]';
export let logLevel = param ? parseInt(param, 10) : LogLevel.Info;

if (isSessionStorageSupported) {
  window.sessionStorage.setItem('debug', logLevel.toString());
}

export function debug(...args: any[]) {
  if (logLevel > LogLevel.Debug) {
    return;
  }

  console.debug(tag, ...args);
}

export function log(...args: any[]) {
  if (logLevel > LogLevel.Log) {
    return;
  }

  console.log(tag, ...args);
}

export function info(...args: any[]) {
  if (logLevel > LogLevel.Info) {
    return;
  }

  console.info(tag, ...args);
}

export function warn(...args: any[]) {
  if (logLevel > LogLevel.Warn) {
    return;
  }

  console.warn(tag, ...args);
}

export function error(...args: any[]) {
  if (logLevel > LogLevel.Error) {
    return;
  }

  console.error(tag, ...args);
}

function getParameterByName(
  name: string,
  url = typeof window === 'undefined' ? '' : window.location.href,
) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
