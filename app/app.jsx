var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
var SendToken = require('SendToken');
var About = require('About');
var LinumLabs = require('LinumLabs');

// Load foundation
require('style!css!foundation-sites/dist/foundation.min.css');
$(document).foundation();

// app.css
require('style!css!applicationStyles')

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            <Route path="about" component={About}/>
            <Route path="examples" component={LinumLabs}/>
            <IndexRoute component={SendToken}/>
        </Route>
    </Router>, 
    document.getElementById('app')
);