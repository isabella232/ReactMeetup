var React = require('react');
var SendForm = require('SendForm');
var TokenMessage = require('TokenMessage');
var ErrorModal = require('./ErrorModal');
var Web3 = require('web3');
const contract = require('truffle-contract');
const MeetupTokenContract = require('../../build/contracts/MeetupToken.json');


var SendToken = React.createClass({
    getInitialState: function () {
        return {
            isLoading: false
        }
    },
    componentWillMount: function() {
        var account;
        var self = this;
        // Get network provider and web3 instance.
        if (typeof web3 !== 'undefined') {
            // Use Mist/MetaMask's provider.
            web3 = new Web3(web3.currentProvider)
        } else {
            // Fallback to localhost if no web3 injection.
            var provider = new Web3.providers.HttpProvider('http://localhost:8545')

            web3 = new Web3(provider)
        }
        web3.eth.getAccounts((error, accounts) => { 
           account = accounts[0];
           self.setState({
               account: account
           })
        })
        this.setState({
            web3: web3
        })
  },
    handleSend: function (addressTo, amount) {
        var self = this;

        this.setState({
            isLoading: true,
            errorMessage: undefined
        });

        const MeetupToken = contract(MeetupTokenContract)
        MeetupToken.setProvider(this.state.web3.currentProvider)
        
        MeetupToken.at('0xac55f0311b290118adabe46d9767dbb91aaf3df3').then((instance) => {
            instance.transfer(addressTo, amount, {from: this.state.account, gas: 80000}).then((res) => {
            var txHash = res.tx;
            self.setState({
                txHash: txHash,
                isLoading: false
                })
            }).catch(function(e) {
            self.setState({
                    isLoading: false,
                    errorMessage: e.message
                });
            });
        });
    },
    render: function () {
        var {isLoading, txHash, errorMessage, account} = this.state;
        function renderMessage() {
            if (isLoading) {
                return <h3 className="text-center">Sending Transaction...</h3>;
            } else if (txHash) {
                return <TokenMessage txHash={txHash} />;
            }
        }

        function renderError () {
            if (typeof errorMessage === 'string') {
                return (
                    <ErrorModal message={errorMessage}/>
                )
            }
        }

        return (
            <div>
                <h1 className="text-center page-title">Share the Love</h1>
                <h4 className="text-center sub-title">Send Your Tokens Anywhere!</h4>
                <SendForm onSend={this.handleSend}/>
                {renderMessage()}
                {renderError()}
            </div>
        );
    }
});

module.exports = SendToken;
