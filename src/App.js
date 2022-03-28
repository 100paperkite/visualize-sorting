import NodeArray from './components/NodeArray.js';
import { BubbleSort } from './algorithms.js';
import { $, randomInt } from './utils.js';

class App {
  constructor() {
    this.init();
  }

  init() {
    const $randomNodeBtn = $('#random-node-btn');
    const $runAlgoBtn = $('#run-algo-btn');
    const $display = $('#display');

    $randomNodeBtn.addEventListener('click', () => {
      const randoms = Array.from({ length: 10 }, () => randomInt());
      this.array = new NodeArray(randoms);

      $display.replaceChildren(this.array.$element);
    });

    $runAlgoBtn.addEventListener('click', (event) => {
      const algoName = event.target.parentNode.querySelector('select').value;
      this.run(algoName, 200);
    });
  }

  run(algorithm, timeSpan) {
    let stepIter = null;

    switch (algorithm) {
      case 'bubble':
        stepIter = BubbleSort(this.array);
        break;

      default:
        console.log(`${algorithm}은 구현되지 않았습니다.`);
    }

    // timespan 마다 실행.
    const interval = setInterval(() => {
      const res = stepIter.next();

      if (res.done) {
        clearInterval(interval);
        console.log(`total step: ${res.value}`);
      }
    }, timeSpan);
  }
}

export default App;
