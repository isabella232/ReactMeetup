var React = require('react');
var Web3 = require('web3');
const contract = require('truffle-contract');
const MeetupTokenContract = require('../../build/contracts/MeetupToken.json');

var Account = React.createClass({ 
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
  render: function() {
        var {account, balance} = this.state;
        return (
            <div className="columns medium-6 large-4 small-centered">
                <h1 className="text-center page-title">Account</h1>
                <p className="text-center">{account}</p>
                <p className="text-center">Your MET balance: {balance}</p>
            </div>
        )
    }
});


module.exports = Account;