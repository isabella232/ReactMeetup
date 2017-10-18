pragma solidity ^0.4.11;

import "./Owned.sol";

contract LinumCert is Owned {
    
    struct Hash {
        mapping(address => string) certificates;
        mapping(address => string) learners;
    }
    
    Hash[] hashes;
    
    function storeHash(string _hash, string _name, address _learner) onlyowner() returns (uint256 hashID) {
        hashID = hashes.length++;
        Hash h = hashes[hashID];
        h.learners[_learner] = _name;
        h.certificates[_learner] = _hash;
        HashStored(hashID);
        return hashID;
    }
    
    function getHashByAddress(uint256 _hashID) {
        HashReturned(hashes[_hashID].certificates[msg.sender], hashes[_hashID].learners[msg.sender]);
    }

    event HashStored(uint256 hashId);
    event HashReturned(string certificate, string name);
}