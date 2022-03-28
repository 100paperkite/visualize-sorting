export function* BubbleSort(array) {
  let steps = 0;

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array.compare(j, j + 1, (i, j) => i > j)) {
        yield;
        array.swap(j, j + 1);
      }
      yield ++steps;
    }
  }
  return steps;
}
