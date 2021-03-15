import { Website } from "./Website";

declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');

document.body.style.margin = '0 0 0 0'
ReactDOM.render(<Website />, document.getElementById('root'));