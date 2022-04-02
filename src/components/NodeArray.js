import Component from '../core/Component.js';
import Node from './Node.js';
import NodeState from './NodeState.js';

class NodeArray extends Component {
  #nodesToReset = [];
  setup({ numbers }) {
    this.state = { numbers };
  }

  template() {
    const { length } = this.state.numbers;
    return `<div class="node-array">
              ${Array.from({ length }, (_, index) => `<div id="node-${index}"></div>`).join(' ')}
            </div>`;
  }

  mounted() {
    const $array = this.$element.querySelector('.node-array');

    for (let id = 0; id < this.state.numbers.length; id++) {
      const node = new Node($array.querySelector(`#node-${id}`), { value: this.state.numbers[id] });
      this.$children.push(node);
    }
  }

  get length() {
    return this.$children.length;
  }

  #manipulate(i, j, action) {
    // 이전에 변경된 노드의 상태 되돌리기.
    this.#nodesToReset.forEach((node) => node.setState({ state: NodeState.NONE }));
    action();
    this.#nodesToReset = [this.$children[i], this.$children[j]];
  }

  compare(i, j, comparator) {
    this.#manipulate(i, j, () => {
      this.$children[i].setState({ state: NodeState.COMPARED });
      this.$children[j].setState({ state: NodeState.COMPARED });
    });

    return comparator(this.$children[i], this.$children[j]);
  }

  swap(i, j) {
    this.#manipulate(i, j, () => {
      this.$children[i].setState({ state: NodeState.SWAPPED });
      this.$children[j].setState({ state: NodeState.SWAPPED });

      const { value: ithValue } = this.$children[i].state;
      const { value: jthValue } = this.$children[j].state;

      this.$children[i].setState({ value: jthValue });
      this.$children[j].setState({ value: ithValue });
    });
  }
}

export default NodeArray;
