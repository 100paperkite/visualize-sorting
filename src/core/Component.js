export default class Component {
  state;
  $element;
  $children;

  constructor($element, props) {
    this.$element = $element;
    this.$children = [];
    this.setup(props);
    this.render();
    this.setEvent();
  }

  setup() {}

  template() {
    return '';
  }

  setState(state) {
    this.state = { ...this.state, ...state };
    this.render();
  }

  setEvent() {}

  mounted() {}

  render() {
    this.$element.innerHTML = this.template();
    this.mounted();
  }
}
