const capitalize = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1)

const kebabToCamel = (kebab: string) => {
  const splitted = kebab.split('-')

  return splitted.reduce((prev, curr, index) => {
    if (index === 0) return curr.toLowerCase()

    return prev + capitalize(curr)
  }, '')
}

export default kebabToCamel
