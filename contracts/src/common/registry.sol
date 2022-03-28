/**
 * Non-upgradable Global Contracts Registry Storage Contract
 * 
 */
//SPDX-License-Identifier: GPL-2.0
pragma solidity ^0.8.0;

contract Registry {
    address gameMaster;
    mapping (string => address) public addressOf;

    constructor(address _gameMaster) {
        gameMaster = _gameMaster;
    }

    modifier onlyGM {
        require(msg.sender == gameMaster);
        _;
    }

    function getAddressOf(string calldata name) public view returns(address) {
        return addressOf[name];
    }

    function setAddressOf(string calldata name, address nameAddress) public onlyGM {
        addressOf[name] = nameAddress;
        emit SetAddressOf(name, nameAddress);

    }

    function changeGameMaster(address _newGameMaster) public onlyGM {
        gameMaster = _newGameMaster;
        emit ChangeGameMaster(_newGameMaster);
    }

    event SetAddressOf(string indexed name, address nameAddress);
    event ChangeGameMaster(address _newGameMaster);
}