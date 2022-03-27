import NodeArray from './components/NodeArray.js';
import { BubbleSort } from './algorithms.js';
import { $, randomInt } from './utils.js';

class App {
  constructor() {
    this.initalize();
  }

  initalize() {
    const $randomNodeBtn = $('#random-node-btn');
    const $runAlgoBtn = $('#run-algo-btn');
    const $display = $('#display');

    $randomNodeBtn.addEventListener('click', () => {
      const randomNumbers = Array.from({ length: 10 }, () => randomInt());
      this.array = new NodeArray(randomNumbers);
      $display.innerHTML = this.array.render();
    });

    $runAlgoBtn.addEventListener('click', (event) => {
      const algoName = event.target.parentNode.querySelector('select').value;
      this.run(algoName, 500);
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

      /**
       * @todo 현재 매번 렌더링하는데 바뀐 부분만 렌더링하도록 변경하기
       */
      $('#display').innerHTML = this.array.render();

      if (res.done) {
        clearInterval(interval);
      }
    }, timeSpan);
  }
}

export default App;
