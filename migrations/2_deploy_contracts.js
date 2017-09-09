var MeetupToken = artifacts.require("./MeetupToken.sol");

module.exports = function(deployer) {
  deployer.deploy(MeetupToken);
};
