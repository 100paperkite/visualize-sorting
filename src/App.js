import Component from './core/Component.js';
import { $, randomInt } from './utils.js';
import { NodeArray } from './components/index.js';
import { algorithm, Runner } from './algorithm/index.js';

class App extends Component {
  setup({ length }) {
    this.state = { length };
    this.algoRunner = null;
  }

  template() {
    return `<header>
              <select name="sort-algo" id="sort-algo-select">
                ${Object.keys(algorithm.SortAlgorithm)
                  .map(
                    (name) =>
                      `<option value="${name}">${name.split('_').join(' ').toLowerCase()}</option>`
                  )
                  .join('')}
              </select>
              <button id="run-algo-btn" class="button" type="button">Run</button>
              <button id="random-node-btn" class="button" type="button">Random</button>
              <div>
                <input type="range" id="sort-speed-range" name="speed" min="5" max="200" value="50" step="10">
                <label for="speed">speed</label>
              </div>
            </header>
            <div id="display"></div>
          `;
  }

  mounted() {
    this.$children = [];
    const numbers = Array.from({ length: this.state.length }, () => randomInt());
    const nodeArray = new NodeArray(this.$element.querySelector('#display'), { numbers });
    this.$children.push(nodeArray);
  }

  setEvent() {
    const $randomNodeBtn = $('#random-node-btn');
    const $runAlgoBtn = $('#run-algo-btn');
    const $sortSpeedRange = $('#sort-speed-range');

    const { length } = this.state;

    $randomNodeBtn.addEventListener('click', () => {
      const randoms = Array.from({ length }, () => randomInt());
      this.$children[0].setState({ numbers: randoms });
    });

    $runAlgoBtn.addEventListener('click', (event) => {
      const algoName = event.target.parentNode.querySelector('select').value;
      this.algoRunner = new Runner(algorithm.SortAlgorithm[algoName], this.$children[0]);
      this.algoRunner.run(5000 / $sortSpeedRange.value);
    });

    $sortSpeedRange.addEventListener('change', (event) => {
      const { value } = event.target;
      if (this.algoRunner) {
        this.algoRunner.setSpeed(5000 / value);
      }
    });
  }
}

export default App;
