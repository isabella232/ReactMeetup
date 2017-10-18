var React = require('react');
var Web3 = require('web3');
var ErrorModal = require('./ErrorModal');
const contract = require('truffle-contract');
const LinumCert = require('../../build/contracts/LinumCert.json');
const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI('localhost', '5001')

var Certificates = React.createClass({ 
    getInitialState: function () {
        return {
            web3: this.props.web3
        }
    },
    componentWillMount: function() {
        var account;
        var self = this;
        if (typeof web3 === 'undefined') {
            this.setState({
                errorMessage: 'Unable to connect to Ethereum. Please check you have MetaMask installed and that you have access to your account.',
            })
            return
        } else {
            this.setState({web3: web3});
            web3.eth.getAccounts((error, accounts) => { 
                account = accounts[0];
                console.log(account);
                self.setState({
                    account: account
                })
             })
        }
    },
    handleSubmit: function (event) {
        event.preventDefault()
    },
    captureFile: function (event) {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.onloadend = () => this.saveToIpfs(reader)
        reader.readAsArrayBuffer(file)
    },
    saveToIpfs: function (reader) {
        let ipfsId
        const buffer = Buffer.from(reader.result)
        ipfs.add(buffer)
        .then((response) => {
        console.log(response)
        ipfsId = response[0].hash
        this.setState({added_file_hash: ipfsId})
        }).catch((err) => {
        console.error(err)
        })
    },
    captureName: function (event) {
        event.preventDefault()
        this.setState({name: event.target.value});
    },
    captureAddress: function (event) {
       event.preventDefault()
        this.setState({address: event.target.value});
    },
    captureId: function (event) {
        event.preventDefault()
        this.setState({certId: event.target.value});
    },
    saveToEthereum: function () {
        let yourHash
        let txProof
        const Certificate = contract(LinumCert)
        Certificate.setProvider(this.state.web3.currentProvider)

        let instance = Certificate.at('0x9e77ffd4d8352a0a6b2cc8dd59dda21c85ff8072')
        instance.storeHash(this.state.added_file_hash, this.state.name, this.state.address, {from: this.state.account, gas: 250000 })
            .then((result) => {
            for (var i = 0; i < result.logs.length; i++) {
                    var log = result.logs[i];

                    if (log.event == "HashStored") {
                        console.log(log);
                        txProof = log.transactionHash;
                        this.setState({txHash: txProof});
                        yourHash = log.args.hashId.toNumber();
                        this.setState({hashID: yourHash });
                    break;
                }}
            }).catch(function(err) {
                // There was an error! Handle it.
                console.log(err);
        });
    },
    getFromEthereum: function () {
    let certificate
    let learner
    const Certificate = contract(LinumCert)
    Certificate.setProvider(this.state.web3.currentProvider)
    let instance = Certificate.at('0x9e77ffd4d8352a0a6b2cc8dd59dda21c85ff8072')
    instance.getHashByAddress(this.state.certId, {from:this.state.account, gas:100000})
    .then((result) => {
        for (var i = 0; i < result.logs.length; i++) {
                var log = result.logs[i];
                if (log.event == "HashReturned") {
                    certificate = log.args.certificate.toString();
                    this.setState({added_file_hash_conf: certificate });
                    learner = log.args.name.toString();
                    this.setState({name_conf: learner})
                break;
            }}
            }).catch(function(err) {
            // There was an error! Handle it.
            console.log(err);
        });
    },
    render: function() {
        var {errorMessage} = this.state;
        function renderError () {
            if (typeof errorMessage === 'string') {
                return (
                    <ErrorModal message={errorMessage}/>
                )
            }
        }
        return (
            <div className="columns medium-10 large-6 small-centered">
                <h1 className="text-center page-title">Course Certificates</h1>
                <p>LinumLabs offers a range of courses, from Beginner's and Introductory course to Executive and Hardcore Developer Training.
                    We issue immutable certificates, stored on the Interplanetary File System (IPFS) and then published
                    provably, transparently and forever into the Ethereum chain, using hashes. This means that when we issue you
                    with a certificate for one of our courses, your name is stored forever more in Ethereum, which we think is pretty cool.</p>
                <form id="captureMedia" onSubmit={this.handleSubmit}>
                    <p className="text-center">
                    <label htmlFor="file-upload" className="custom-file-upload">
                        Select File
                    </label>
                    <input type="file" id="file-upload" onChange={this.captureFile} />
                    </p>
                </form>
                <p>Link to file on IPFS: <a target="_blank"
                    href={'https://ipfs.io/ipfs/' + this.state.added_file_hash}>
                    {this.state.added_file_hash}
                </a></p>
                <p>You can, of course, use this to upload any file to IPFS - so please feel free to do so if you're in a rush and don't want to
                    run the daemon yourself. However, the smart contracts that stores the hashes can only be used by an account controlled by Linum,
                    so you will not be able to use the Ethereum form below.</p>
                <input className="field" type="text" onChange={this.captureName} placeholder="Enter Learner Name" /><br/>
                <input className="field" type="text" onChange={this.captureAddress} placeholder="Enter Learner Address" /><br/>
                <button className="button expanded" onClick={this.saveToEthereum}>Save to Ethereum!</button>
                <p>Unique CertificateID on Ethereum: {this.state.hashID}</p>
                <p>Proof of Publication (transaction hash): <a target="_blank"
                    href={'https://etherscan.io/tx/' + this.state.txHash}>
                    {this.state.txHash}
                </a></p>
                <br/>
                <h4>Retrieve Your Certificate from Ethereum and View on IPFS</h4>
                <input className="field" type="text" onChange={this.captureId} placeholder="Enter Your Unique CertificateID" /><br/>
                <button className="button expanded" type="button" onClick={this.getFromEthereum}>Retrieve Certificate</button>
                <p>IPFS Hash Returned by Smart Contract: <a target="_blank"
                    href={'https://ipfs.io/ipfs/' + this.state.added_file_hash_conf}>
                    {this.state.added_file_hash_conf}
                </a></p>
                <p>Name of learner: {this.state.name_conf}</p>
                {renderError()}
            </div>
        )
    }
});


module.exports = Certificates;