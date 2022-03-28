import NodeState from './NodeState.js';

class Node {
  constructor(value) {
    this.initElement(value);
    this.state = NodeState.NONE;
  }

  initElement(value) {
    this.$element = document.createElement('div');
    this.$element.classList.add('node');
    this.$element.style.height = `${value}px`;
    this.$element.appendChild(document.createTextNode(value));
  }

  set state(state) {
    const namesOfStates = Object.keys(NodeState).map((state) => state.toLowerCase());
    this.$element.classList.remove(...namesOfStates);
    switch (state) {
      case NodeState.NONE:
        this.$element.classList.add('none');
        break;
      case NodeState.COMPARED:
        this.$element.classList.add('compared');
        break;
      case NodeState.SWAPPED:
        this.$element.classList.add('swapped');
        break;
      default:
        console.log(`${state} is not a valid state.`);
    }
  }

  get state() {
    return this.state;
  }

  // for comparison operator
  valueOf() {
    return parseFloat(this.$element.textContent);
  }
}

export default Node;
