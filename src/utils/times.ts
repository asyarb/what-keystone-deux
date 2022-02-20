export function times<T>(amount: number, iteratee: (idx: number) => T): T[] {
  const res: T[] = []

  for (let i = 0; i < amount; i++) {
    res.push(iteratee(i))
  }

  return res
}
