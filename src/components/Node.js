class Node {
  constructor(value) {
    this.value = value;
    this.selected = false;
  }

  select() {
    this.selected = true;
  }

  unselect() {
    this.selected = false;
  }

  render() {
    return `<div class="node ${this.selected ? 'selected' : ''}">${this.value}</div>`;
  }

  // for comparison operator
  valueOf() {
    return this.value;
  }
}

export default Node;
