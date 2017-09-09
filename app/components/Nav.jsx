var React = require('react');
var {Link, IndexLink} = require('react-router');

var Nav = React.createClass ({
    render: function () {
        return (
            <div className="top-bar">
                <div className="top-bar-left">
                    <ul className="menu">
                        <li className="menu-text">Meetup Token</li>
                        <li>
                            <IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Send</IndexLink>
                        </li>
                        <li>
                            <IndexLink to="/account" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Account</IndexLink>
                        </li>
                         <li>
                            <IndexLink to="/about" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>About</IndexLink>
                        </li>
                         <li>
                            <IndexLink to="/examples" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Linum Labs</IndexLink>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = Nav;
