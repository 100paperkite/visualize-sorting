import { SortAlgorithm, bubbleSort, selectionSort, mergeSort } from './algorithm.js';

export default class AlgorithmRunner {
  #iter;
  #interval;
  #callback;
  constructor(algorithm, array) {
    this.algorithm = algorithm;
    this.array = array;
    this.#iter = null;
    this.#interval = null;
  }

  #setInterval(timespan, callback) {
    if (callback) this.#callback = callback;

    this.#interval = setInterval(() => {
      const { done } = this.#iter.next();

      if (done) {
        clearInterval(this.#interval);
        callback();
      }
    }, timespan);
  }

  run(timespan, callback) {
    switch (this.algorithm) {
      case SortAlgorithm.BUBBLE_SORT:
        this.#iter = bubbleSort(this.array);
        break;
      case SortAlgorithm.SELECTION_SORT:
        this.#iter = selectionSort(this.array);
        break;
      case SortAlgorithm.MERGE_SORT:
        this.#iter = mergeSort(this.array);
        break;
      default:
        console.log(`${this.algorithm.description}은 구현되지 않았습니다.`);
        return;
    }

    this.#setInterval(timespan, callback);
  }

  stop() {
    clearInterval(this.#interval);
    if (this.#callback) this.#callback();
  }

  setSpeed(timespan) {
    // 속도 초기화
    clearInterval(this.#interval);
    this.#setInterval(timespan, this.#callback);
  }
}
