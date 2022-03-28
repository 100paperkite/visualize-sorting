import Node from './Node.js';

class NodeArray {
  #selected = [];

  constructor(numbers) {
    this.initElement(numbers);
  }

  get length() {
    return this.nodes.length;
  }

  initElement(numbers) {
    this.$element = document.createElement('div');
    this.$element.classList.add('node-array');

    this.nodes = numbers.map((number) => new Node(number));
    this.nodes.forEach((node) => this.$element.appendChild(node.$element));
  }

  select(indexes) {
    this.#selected.forEach((index) => this.nodes[index].unselect());
    this.#selected = indexes;
    indexes.forEach((index) => this.nodes[index].select());
  }

  swap(i, j) {
    this.$element.insertBefore(this.nodes[j].$element, this.nodes[i].$element);
    this.select([i, j]);

    // @todo animation
    const temp = this.nodes[i];
    this.nodes[i] = this.nodes[j];
    this.nodes[j] = temp;
  }
}

export default NodeArray;
