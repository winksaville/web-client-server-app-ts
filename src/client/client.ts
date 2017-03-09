import * as m from 'mithril';
import nop = require('../dist/nop');
import callNop = require('./callnop');

function invokeNop() {
  nop();
}

function invokeCallNop() {
  callNop();
}

m.render(document.body,
  m('div', 'Hello, click to ', [
    m('a', {href: 'http://localhost:3000'}, 'reload'),
    m('br'),
    m('button', {id: 'invokeNop', onclick: invokeNop }, "invoke nop directly"),
    m('br'),
    m('button', {id: 'invokeCallNop', onclick: invokeCallNop}, "invoke nop via callNop js code"),
  ])
);
