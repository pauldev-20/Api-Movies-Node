import { createRequire } from 'module'
const require = createRequire(import.meta.url)
export const requireJson = (path) => require(path)