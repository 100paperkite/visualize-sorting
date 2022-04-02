import NodeArray from './components/NodeArray.js';
import { SortAlgorithm, bubbleSort } from './algorithms.js';
import { $, randomInt } from './utils.js';
import Component from './core/Component.js';

class App extends Component {
  setup({ length }) {
    this.state = { length };
  }

  template() {
    return `<header>
              <select name="sort-algo" id="sort-algo-select">
                ${Object.keys(SortAlgorithm)
                  .map(
                    (name) =>
                      `<option value="${name}">${name.split('_').join(' ').toLowerCase()}</option>`
                  )
                  .join('')}
              </select>
              <button id="run-algo-btn" class="button" type="button">Run</button>
              <button id="random-node-btn" class="button" type="button">Random</button>
            </header>
            <div id="display"></div>
          `;
  }

  mounted() {
    const numbers = Array.from({ length: this.state.length }, () => randomInt());
    const nodeArray = new NodeArray(this.$element.querySelector('#display'), { numbers });
    this.$children.push(nodeArray);
  }

  setEvent() {
    const $randomNodeBtn = $('#random-node-btn');
    const $runAlgoBtn = $('#run-algo-btn');
    const { length } = this.state;

    $randomNodeBtn.addEventListener('click', () => {
      const randoms = Array.from({ length }, () => randomInt());
      this.$children[0].setState({ numbers: randoms });
    });

    $runAlgoBtn.addEventListener('click', (event) => {
      const algoName = event.target.parentNode.querySelector('select').value;
      this.run(SortAlgorithm[algoName], 200);
    });
  }

  run(algorithm, timespan = 500) {
    let iter;
    const nodeArray = this.$children[0];

    switch (algorithm) {
      case SortAlgorithm.BUBBLE_SORT:
        iter = bubbleSort(nodeArray);
        break;
      default:
        console.log(`${algorithm}은 구현되지 않았습니다.`);
        return;
    }

    // timespan 마다 실행.
    const interval = setInterval(() => {
      const { done } = iter.next();

      if (done) {
        clearInterval(interval);
        console.log(`total step: ${res.value}`);
      }
    }, timespan);
  }
}

export default App;
