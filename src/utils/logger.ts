const info = (message: string): void => {
  console.log(`\x1b[36m[ INFO] ${message}\x1b[0m`);
}

const error = (message: string): void => {
  console.log(`\x1b[31m[ERROR] ${message}\x1b[0m`);
}

const debug = (message: string): void => {
  console.log(`\x1b[37m[DEBUG] ${message}\x1b[0m`);
}

export const logger = {
  info,
  error,
  debug
}
