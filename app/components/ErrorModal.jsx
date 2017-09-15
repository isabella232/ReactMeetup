var React = require('react');

var ErrorModal = React.createClass({
    getDefaultProps: function () {
        return {
            title: 'Error'
        };
    },
    propTypes: {
        title: React.PropTypes.string,
        message: React.PropTypes.string.isRequired
    },
    componentDidMount: function () {
        var modal = new Foundation.Reveal($('#error-modal'));
        modal.open();
    },
    render: function () {
        var {title, message} = this.props;
        return (
            <div id="error-modal" className="reveal small text-center" data-reveal="">
                <h4 className="error-msg">{title}</h4>
                <p className="error-msg">{message}</p>
                <p>
                    <button className="button hollow" data-close="">
                        Okay
                    </button>
                </p>
            </div>
        );
    }
});

module.exports = ErrorModal;