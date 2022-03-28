//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

import "../ContDutchAuctionPair.sol";
import "../../tokens/ERC20.sol";
import "../Refinery.sol";
import "../../../lib/ds-test/src/test.sol";

interface Forge {
    function warp(uint x) external;
}

contract TestContDutchAuction is DSTest {
    Forge forge = Forge(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);
    Refinery refinery;
    // ores
    ERC20 halfinium;
    ERC20 sangius;
    // materials
    ERC20 carbon;
    ERC20 iron;
    ERC20 silicon;
    ERC20 aluminium;
    // pairs
    ContDutchAuctionPair CDA_SS;
    ContDutchAuctionPair CDA_SA;
    ContDutchAuctionPair CDA_HC;
    ContDutchAuctionPair CDA_HI;

    address[] HALFmaterials;
    address[] SANGmaterials;
    uint256[] percentages;
    uint256[] minYs;

    constructor () {
        refinery = new Refinery(address(this));
        refinery.setPaused(false);
        // Ores
        halfinium = new ERC20("Halfinium", "HALF"); 
        sangius = new ERC20("Sangius", "SAN");

        // Materials
        carbon = new ERC20("Carbon", "CRBN");
        iron = new ERC20("Iron", "IRN");
        silicon = new ERC20("Silicon", "SLCN");
        aluminium = new ERC20("Aluminium", "ALMN");
        

        // Sangius Pairs
        CDA_SS = new ContDutchAuctionPair(address(this), 1 ether, IERC20(address(sangius)), IERC20(address(silicon)), address(0));
        CDA_SA = new ContDutchAuctionPair(address(this), 1 ether, IERC20(address(sangius)), IERC20(address(aluminium)), address(0));

        // Halfinium
        CDA_HC = new ContDutchAuctionPair(address(this), 1 ether, IERC20(address(halfinium)), IERC20(address(carbon)), address(0));
        CDA_HI = new ContDutchAuctionPair(address(this), 1 ether, IERC20(address(halfinium)), IERC20(address(iron)), address(0));

        // Whitelist refinery in pairs
        CDA_HC.whitelistSwapper(address(refinery), true);
        CDA_HI.whitelistSwapper(address(refinery), true);
        CDA_SS.whitelistSwapper(address(refinery), true);
        CDA_SA.whitelistSwapper(address(refinery), true);

        // Whitelist refinery in ores contracts to receive funds
        halfinium.whitelist(address(refinery), true);
        sangius.whitelist(address(refinery), true);

        // add pair minter role to their materials
        carbon.addMinter(address(CDA_HC));
        aluminium.addMinter(address(CDA_SA));
        silicon.addMinter(address(CDA_SS));
        iron.addMinter(address(CDA_HI));

        // set minYs
        minYs.push(0);
        minYs.push(0);

        forge.warp(block.timestamp + 100); // r * 100 - s 
    }

    function testAddHalfinium() public {
        // add halfinium ore
        HALFmaterials.push(address(carbon));
        HALFmaterials.push(address(iron));
        percentages.push(50);
        percentages.push(50);
        refinery.setOre(address(halfinium), HALFmaterials, percentages);
        // add halfinium materials pairs
        refinery.setPair(address(CDA_HC), address(halfinium), address(carbon));
        refinery.setPair(address(CDA_HI), address(halfinium), address(iron));
        require(refinery.getPairAddress(address(halfinium), address(carbon)) != address(0), "HALF Pair creation failed");
    }

    function testAddSangius() public {
        // add sangius ore
        SANGmaterials.push(address(silicon));
        SANGmaterials.push(address(aluminium));
        percentages.push(50);
        percentages.push(50);
        refinery.setOre(address(sangius), SANGmaterials, percentages);
        // add sangius materials pairs
        refinery.setPair(address(CDA_SS), address(sangius), address(silicon));
        refinery.setPair(address(CDA_SA), address(sangius), address(aluminium));
        require(refinery.getPairAddress(address(sangius), address(silicon)) != address(0), "SANGIUS Pair creation failed");
    }

    function testRefineHalfinium() public {
        halfinium.mint(address(this), 1 ether);
        assertEq(halfinium.balanceOf(address(this)), 1 ether);
        testAddHalfinium();
        assertTrue(!refinery.paused());
        halfinium.approve(address(refinery), 1 ether);
        assertEq(halfinium.allowance(address(this), address(refinery)), 1 ether);
        refinery.refineOre(1 ether, address(halfinium), minYs);
        // require material balances > 0
        require(carbon.balanceOf(address(this)) > 0 && iron.balanceOf(address(this)) > 0, "Refining halfinium failed");
        emit log('Carbon Minted from Halfinium: ');
        emit log_uint(carbon.balanceOf(address(this)));
        emit log('Iron Minted from Halfinium: ');
        emit log_uint(iron.balanceOf(address(this)));
    }

    function testRefineSangius() public {
        sangius.mint(address(this), 1 ether);
        assertEq(sangius.balanceOf(address(this)), 1 ether);
        testAddSangius();
        assertTrue(!refinery.paused());
        sangius.approve(address(refinery), 1 ether);
        assertEq(sangius.allowance(address(this), address(refinery)), 1 ether);
        refinery.refineOre(1 ether, address(sangius), minYs);
        // require material balances > 0
        require(silicon.balanceOf(address(this)) > 0 && aluminium.balanceOf(address(this)) > 0, "Refining sangius failed");
        emit log('Silicon Minted from Sangius: ');
        emit log_uint(silicon.balanceOf(address(this)));
        emit log('Aluminium Minted from Sangius: ');
        emit log_uint(aluminium.balanceOf(address(this)));
    }
}