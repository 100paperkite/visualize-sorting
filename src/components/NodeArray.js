import Node from './Node.js';

class NodeArray {
  constructor(numbers) {
    this.nodes = numbers.map((number) => new Node(number));
  }

  render() {
    return `<div class="node-array">${this.nodes.map((node) => node.render()).join('')}</div>`;
  }
}

export default NodeArray;
