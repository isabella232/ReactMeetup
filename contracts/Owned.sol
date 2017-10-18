pragma solidity ^0.4.11;

contract Owned {
    address public owner;
    
    function Owned() {
        owner = msg.sender;
      }

    modifier onlyowner() {
        if (msg.sender != owner) {
          throw;
        }
        _;
    }
  
    function transferOwnership(address newOwner) onlyowner {
        if (newOwner != address(0)) {
          owner = newOwner;
        }
      }
}