import Component from '../core/Component.js';
import NodeState from './NodeState.js';

class Node extends Component {
  setup({ value }) {
    this.state = {
      value,
      state: NodeState.NONE,
    };
  }

  template() {
    const { state, value } = this.state;
    return `<div class="node ${state.description.toLowerCase()}" style="height: ${value}px">
              ${value}
            </div>`;
  }

  // for comparison operator
  valueOf() {
    return this.state.value;
  }
}

export default Node;
