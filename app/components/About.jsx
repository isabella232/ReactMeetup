var React = require('react');
var {Link} = require('react-router');

var About = (props) => {
        return (
            <div className="columns medium-10 large-6 small-centered">
                <h1 className="text-center page-title">About</h1>
                <div className="area-div">
                    <p className="text-center"><img src="img/Ethereum_SA.png" className="ethZA" /></p>
                </div>
                <p className="justified">The MeetupToken is a community-driven project intended to introduce newcomers to Ethereum
                    to some of the basic technologies that the combination of decentralized networks and cryptographic tools
                    make possible.</p>
                <p className="justified">We firmly believe that building a viable and sustainable community that is well educated and shares a clearly-defined, common
                    goal is a vital aspect of the long-term success of any blockchain. Doing so requires unique and innovative
                    approaches to education and the communication of a certain set of values and perspectives.</p>
                <p className="justified">In our case, the goal is to redesign the protocols by which we evaluate the world, as well as communicate and secure that value.</p>
                <p className="justified"> We therefore hand out MeetupTokens for free
                    at every Meetup we host around the world, so people can use them as 'a badge of honour' - essentially as a way to signal your
                    continued involvement in the community. Seeing as the Meetups are growing so fast, possession of a token will now
                    guarantee you entrance to the events, whether the RSVPs are full or not. We have many more ideas in the pipeline than just priority seating though.</p>
                <p className="justified">We want to use the MeetupToken to, amongst other things:</p>
                    <ul>
                        <li>Curate a list of speakers for our events - the more tokens you have (i.e. the more Meetups you've been to), the higher you are on the list.</li>
                        <li>Handle voting for future event types, speakers, locations and perhaps even community projects. (Note: for this to happen, we would need to 
                            re-implement the transferFrom function in our ERC20 contract to fit in with <a href="https://medium.com/@AdChain/a-walkthrough-of-plcr-voting-in-solidity-92420bd5b87c"  className="linum-link" target="_blank">PLCR voting</a>).</li>
                        <li>Use the token to vet entry to the Ethereum User Groups we plan on hosting, akin to the old Linux User Groups - where we introduce people to and train them how to use this
                            new class of technologies, discussing in a hands-on way the applicability and use of strange things like 
                            <a href="http://www.moxytongue.com/2016/02/self-sovereign-identity.html" className="linum-link" target="_blank"> self-sovereign identity</a>.
                        </li>
                    </ul>
            </div>
        )
};

module.exports = About;