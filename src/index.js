import App from './App.js';
import { $ } from './utils.js';
import css from './index.css';

const $target = $('body');
new App($target, { length: 30 });
