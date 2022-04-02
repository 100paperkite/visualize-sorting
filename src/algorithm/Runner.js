import { SortAlgorithm, bubbleSort } from './algorithm.js';

export default class AlgorithmRunner {
  #iter;
  #interval;
  constructor(algorithm, array) {
    this.algorithm = algorithm;
    this.array = array;
    this.#iter = null;
    this.#interval = null;
  }

  run(timespan) {
    switch (this.algorithm) {
      case SortAlgorithm.BUBBLE_SORT:
        this.#iter = bubbleSort(this.array);
        break;
      default:
        console.log(`${this.algorithm}은 구현되지 않았습니다.`);
        return;
    }

    // timespan 마다 실행.
    this.#interval = setInterval(() => {
      const { done } = this.#iter.next();

      if (done) {
        clearInterval(this.#interval);
      }
    }, timespan);
  }

  setSpeed(timespan) {
    // 속도 초기화
    clearInterval(this.#interval);
    this.#interval = setInterval(() => {
      const { done } = this.#iter.next();

      if (done) {
        clearInterval(this.#interval);
      }
    }, timespan);
  }
}
