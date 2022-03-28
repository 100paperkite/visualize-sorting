import Node from './Node.js';
import NodeState from './NodeState.js';

class NodeArray {
  #prevNodes = [];

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

  updateState(i, j, state) {
    this.#prevNodes.forEach((index) => (this.nodes[index].state = NodeState.NONE));
    this.nodes[i].state = state;
    this.nodes[j].state = state;
    this.#prevNodes = [i, j];
  }

  compare(i, j, comparator) {
    this.updateState(i, j, NodeState.COMPARED);
    return comparator(this.nodes[i], this.nodes[j]);
  }

  swap(i, j) {
    this.updateState(i, j, NodeState.SWAPPED);
    this.$element.insertBefore(this.nodes[j].$element, this.nodes[i].$element);

    // @todo animation
    const temp = this.nodes[i];
    this.nodes[i] = this.nodes[j];
    this.nodes[j] = temp;
  }
}

export default NodeArray;
