var React = require('react');

var TokenMessage = ({txHash}) => {
        return (
            <div>
                <h3 className="text-center">Your transaction was successful!</h3>
                <p className="text-center"> The hash is <a href={"https://etherscan.io/tx/" + txHash}>{txHash}</a></p>
            </div>
        );
}

module.exports = TokenMessage;