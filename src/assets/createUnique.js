const createUnique = (arr, key) => [
  ...new Map(arr.map((item) => [item[key], item])).keys(),
]

export default createUnique
