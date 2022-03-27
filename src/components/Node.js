class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }

  render() {
    return `<div class="node">${this.value}</div>`;
  }
}

export default Node;
