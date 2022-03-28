//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

import "../ContDutchAuctionPair.sol";
import "../../tokens/ERC20.sol";

interface Forge {
    function warp(uint x) external;
}

contract TestContDutchAuction {
    ERC20 tokenX;
    ERC20 tokenY;
    ContDutchAuctionPair CDA;
    Forge forge = Forge(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);

    constructor () {
        tokenX = new ERC20("ore",  "ORE");
        tokenY = new ERC20("material","MAT");
        CDA = new ContDutchAuctionPair(address(this), 1 ether, IERC20(address(tokenX)), IERC20(address(tokenY)), address(0));
        CDA.whitelistSwapper(address(this), true);
        tokenX.openTheGates();
        tokenY.openTheGates();
        tokenY.addMinter(address(CDA));
        tokenX.mint(address(this), 1 ether);
        forge.warp(block.timestamp + 100); // r * 100 - s
    }

    function testSwap() public {
        tokenX.approve(address(CDA), 1 ether);
        CDA.swap(1 ether, 0, address(this));
        // require(tokenY.balanceOf(address(this)) > 0, "Failed");
    }
}