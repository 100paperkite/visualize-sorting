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
    this.$children = [];
    const $array = this.$element.querySelector('.node-array');

    for (let id = 0; id < this.state.numbers.length; id++) {
      const node = new Node($array.querySelector(`#node-${id}`), { value: this.state.numbers[id] });
      this.$children.push(node);
    }
  }

  get length() {
    return this.$children.length;
  }

  get values() {
    return this.$children.map((node) => node.state.value);
  }

  /**
   *
   * @param {number} index
   * @returns {number} value of the node at index
   */
  at(index) {
    return this.$children[index].state.value;
  }

  #manipulate(fn, ...indexes) {
    // 이전에 변경된 노드의 상태 되돌리기.
    this.#nodesToReset.forEach((node) => node.setState({ state: NodeState.NONE }));
    fn();
    this.#nodesToReset = indexes.map((index) => this.$children[index]);
  }

  /**
   *  set values of the nodes at indexes
   * @param {Array} values
   * @param {Array} indexes
   */
  set(values, indexes) {
    console.assert(values.length === indexes.length);

    this.#manipulate(() => {
      indexes.forEach((index, valueIndex) =>
        this.$children[index].setState({ value: values[valueIndex], state: NodeState.SWAPPED })
      );
    }, ...indexes);
  }

  /**
   * compare the nodes at indexes
   * @param {number} index1
   * @param {number} index2
   * @param {function} comparator
   * @returns {boolean}
   */
  compare(index1, index2, comparator) {
    this.#manipulate(
      () => {
        this.$children[index1].setState({ state: NodeState.COMPARED });
        this.$children[index2].setState({ state: NodeState.COMPARED });
      },
      index1,
      index2
    );

    return comparator(this.$children[index1], this.$children[index2]);
  }

  /**
   * swap the nodes at indexes
   * @param {number} index1
   * @param {number} index2
   */
  swap(index1, index2) {
    this.#manipulate(
      () => {
        this.$children[index1].setState({ state: NodeState.SWAPPED });
        this.$children[index2].setState({ state: NodeState.SWAPPED });

        const { value: firstValue } = this.$children[index1].state;
        const { value: secondValue } = this.$children[index2].state;

        this.$children[index1].setState({ value: secondValue });
        this.$children[index2].setState({ value: firstValue });
      },
      index1,
      index2
    );
  }
}

export default NodeArray;
