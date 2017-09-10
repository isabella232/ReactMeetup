var React = require('react');

var LinumLabs = (props) => {
        return (
            <div className="columns medium-10 large-6 small-centered">
                <h1 className="text-center page-title">Linum Labs</h1>
                <h4 className="text-center">TRAINING | ADVISORY | COMMUNITY</h4>
                <div className="area-div">
                    <p className="text-center"><img src="img/linum-areas.png" className="areas" /></p>
                </div>
                <p className="justified"><a href="http://linumlabs.com/" target="_blank" className="linum-link">Linum Labs</a> is a Blockchain production studio with a focus on training, consulting and community aggregation. We strive to be at the forefront of Blockchain thought leadership and development in Sub-Saharan Africa and Europe with our HQ located in the beautiful city of Cape Town, South Africa.</p>
                <p className="justified">While being Blockchain agnostic in our development approach and utilizing both public, private and sidechain solutions, we specifically have strong capabilities with the Ethereum platform, with which we are also currently offering training to our corporate clients. Our training ranges from beginners Ethereum training through to enterprise development understanding for CEO’s and the more advanced technical training for developers.</p>
                <p className="justified">Besides assisting corporate entities with Blockchain solutions and developing our own products, we host the Ethereum Meetups in Cape Town, Johannesburg, Prague and Dubai – as well as participate in hackathons, organize community- and industry specific events and engage with incubators and universities.</p>
            </div>
        )
};

module.exports = LinumLabs;