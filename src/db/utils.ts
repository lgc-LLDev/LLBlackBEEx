import { Query } from './base'

declare module './base' {
  export namespace Query {
    const excChar = '\\'
    function escape(str: string, extraEscape?: string[]): string
  }
}

Query.escape = (str, extraEscape = []) => {
  extraEscape = [...extraEscape, "'", '"', '`', '\\']
  extraEscape.forEach((char) => {
    str = str.replaceAll(char, `${Query.excChar}${char}`)
  })
  return str
}
