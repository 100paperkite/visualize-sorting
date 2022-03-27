import Node from './Node.js';

class NodeArray {
  #selected = [];

  constructor(numbers) {
    this.nodes = numbers.map((x) => new Node(x));
  }

  get length() {
    return this.nodes.length;
  }

  select(indexes) {
    this.#selected.forEach((index) => this.nodes[index].unselect());
    this.#selected = indexes;
    indexes.forEach((index) => this.nodes[index].select());
  }

  swap(i, j) {
    this.select([i, j]);
    // @todo animation
    const temp = this.nodes[i];
    this.nodes[i] = this.nodes[j];
    this.nodes[j] = temp;
  }

  render() {
    return `<div class="node-array">${this.nodes.map((node) => node.render()).join('')}</div>`;
  }
}

export default NodeArray;
