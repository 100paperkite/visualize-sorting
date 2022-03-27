import NodeArray from './components/NodeArray.js';

const $ = (selector) => document.querySelector(selector);

const randomInt = (min = 0, max = 100) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
};

const sortAlgorithms = ['bubble'];

class App {
  constructor() {
    this.sortAlgorithms = sortAlgorithms;

    this.initalize();
  }

  initalize() {
    const $algoSelect = $('#sort-algo-select');
    const $randomNodeBtn = $('#random-node-btn');
    const $display = $('#display');
    const algoOptionTemplate = sortAlgorithms.map((algo) => `<option>${algo}</option>`).join('');
    $algoSelect.insertAdjacentHTML('beforeend', algoOptionTemplate);

    $randomNodeBtn.addEventListener('click', () => {
      const randomNumbers = Array.from({ length: 10 }, () => randomInt());
      const array = new NodeArray(randomNumbers);
      $display.innerHTML = array.render();
    });
  }

  run(algorithm) {}
}

export default App;
