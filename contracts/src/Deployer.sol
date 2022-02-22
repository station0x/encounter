// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

import "./ERC20.sol";
import "./OresMinter.sol";

contract Deployer {

    constructor(address _signer, address _operator) {
        // deploy contracts
        OresMinter oresMinter = new OresMinter(_signer, address(this));
        ERC20 halfinium = new ERC20("Halfinium", "HALF"); 
        ERC20 sangius = new ERC20("Sangius", "SAN");
        ERC20 shigerium = new ERC20("Shigerium", "SHI");
        ERC20 zisek = new ERC20("Zisek", "ZIS");

        // config contracts
        halfinium.addMinter(address(oresMinter));
        sangius.addMinter(address(oresMinter));
        shigerium.addMinter(address(oresMinter));
        zisek.addMinter(address(oresMinter));
        oresMinter.setDailyLimit(address(halfinium), 1000000 ether);
        oresMinter.setDailyLimit(address(sangius), 1000000 ether);
        oresMinter.setDailyLimit(address(shigerium), 1000000 ether);
        oresMinter.setDailyLimit(address(zisek), 1000000 ether);

        // transfer ownerships to operator
        oresMinter.changeOperator(_operator);
        halfinium.setPendingOperator(_operator);
        sangius.setPendingOperator(_operator);
        shigerium.setPendingOperator(_operator);
        zisek.setPendingOperator(_operator);
    }

}