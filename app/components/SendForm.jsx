var React = require('react');

var SendForm = React.createClass({
    onFormSubmit: function (e) {
        e.preventDefault();

        var addressTo  = this.refs.addressTo.value;
        var amount  = this.refs.amount.value;

        if (addressTo.length > 0 && amount.length > 0) {
            this.refs.addressTo.value = '';
            this.refs.amount.value = '';
            this.props.onSend(addressTo, amount);
        }
    },    
    render: function () {
        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <input type="text" ref="addressTo" placeholder="Enter the address to send to"/>
                    <input type="text" ref="amount" placeholder="Enter the amount you want to send"/>
                    <button className="button expanded">Send</button>
                </form>
            </div>
        );
    }
});

module.exports = SendForm;