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
            // Use Status'/MetaMask's provider.
            web3 = new Web3(web3.currentProvider)
        } else {
            this.setState({
                errorMessage: 'Unable to connect to Ethereum. Please check you have MetaMask installed and that you have access to your account.',
            })
            return
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

        const MeetupToken = contract(MeetupTokenContract)
        MeetupToken.setProvider(web3.currentProvider)

            MeetupToken.at('0xac55f0311b290118adabe46d9767dbb91aaf3df3').then((instance) => {
                instance.balanceOf(account, {from: account, gas: 80000}).then(function(res) {
                    var balance = res.toNumber();
                    self.setState({
                        balance: balance
                    })          
                })
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
        var {isLoading, txHash, errorMessage, account, balance} = this.state;
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
            <div className="columns medium-6 large-4 small-centered">
                <h1 className="text-center page-title">Share the Love</h1>
                <h4 className="text-center page-title">Account</h4>
                <p className="text-center">{account}</p>
                <p className="text-center">Your MET balance: {balance}</p>
                <br/>
                <h4 className="text-center sub-title">Send Your Tokens Anywhere!</h4>
                <SendForm onSend={this.handleSend}/>
                {renderMessage()}
                {renderError()}
            </div>
        );
    }
});

module.exports = SendToken;
