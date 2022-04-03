export const SortAlgorithm = Object.freeze({
  BUBBLE_SORT: Symbol('BUBBLE_SORT'),
  SELECTION_SORT: Symbol('SELECTION_SORT'),
  MERGE_SORT: Symbol('MERGE_SORT'),
});

/**
 * @param {NodeArray} array
 */
export function* bubbleSort(array) {
  let [swap, compare] = [0, 0];

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      const isTrue = array.compare(j, j + 1, (i, j) => i > j);
      yield ++compare;

      if (isTrue) {
        array.swap(j, j + 1);
        yield ++swap;
      }
    }
  }
  return { swap, compare };
}

/**
 * @param {NodeArray} array
 */
export function* selectionSort(array) {
  let [swap, compare] = [0, 0];

  for (let i = 0; i < array.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < array.length; j++) {
      const isTrue = array.compare(min, j, (i, j) => i > j);
      yield ++compare;

      if (isTrue) {
        min = j;
      }
    }
    if (min !== i) {
      array.swap(i, min);
      yield ++swap;
    }
  }
  return { swap, compare };
}

/**
 * @param {NodeArray} array
 */
export function* mergeSort(array) {
  let [assign, compare] = [0, 0];

  function* merge(left, mid, right, array) {
    let _left = left;
    let _mid = mid + 1;

    let _array = [];

    while (_left <= mid && _mid <= right) {
      if (array.compare(_left, _mid, (i, j) => i < j)) {
        _array.push(array.at(_left++));
      } else {
        _array.push(array.at(_mid++));
      }
      compare++;
      assign++;
      yield;
    }
    while (_left <= mid) {
      _array.push(array.at(_left++));
      yield assign++;
    }

    while (_mid <= right) {
      _array.push(array.at(_mid++));
      yield assign++;
    }

    console.assert(_array.length === right - left + 1);

    const indexes = _array.map((_, index) => left + index);
    array.set(_array, indexes);
    assign += indexes.length;
    yield;
    return { assign, compare };
  }

  // [left, right]
  function* mergeSort(left, right) {
    if (left < right) {
      const mid = parseInt((left + right) / 2);
      yield* mergeSort(left, mid);
      yield* mergeSort(mid + 1, right);
      yield* merge(left, mid, right, array);
    }
  }
  yield* mergeSort(0, array.length - 1);
}
