// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

contract DutchPairFactory {
    address public operator;
    address public feeRecipient;
    uint public feeBPS = 30; // 0.3%
    mapping (address => bool) public swapWhitelist;

    constructor(
        address _operator,
        address _feeRecipient
    ) {
        operator = _operator;
        feeRecipient = _feeRecipient;
    }

    modifier onlyOperator() {
        require(msg.sender == operator, "Only operator can call this function!");
        _;
    }

    function deployPair() public onlyOperator {

    }

    
}
a
contract DutchPair {
    
}