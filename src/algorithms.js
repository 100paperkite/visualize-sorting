export function* BubbleSort(array) {
  let steps = 0;

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array.nodes[j] > array.nodes[j + 1]) {
        array.swap(j, j + 1);
      }
      yield ++steps;
    }
  }
}
