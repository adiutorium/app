export const convertToHex = number => {
  number = parseInt(number, 10)
  return `000000${number.toString(16)}`.substr(-6).toUpperCase()
}

export const convertFromHex = hex => {
  return parseInt(hex.toLowerCase(), 16)
}
