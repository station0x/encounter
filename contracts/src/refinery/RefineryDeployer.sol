//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

import "./ContDutchAuctionPair.sol";
import "../tokens/ERC20.sol";
import "./Refinery.sol";

contract RefineryDeployer {
    uint256 public stage = 0;
    address public operator;
    ERC20 public halfinium;
    ERC20 public sangius;
    ERC20 public shigerium;
    ERC20 public zisek;
    ERC20 public mtare;

    ERC20 public plutonium;
    ERC20 public carbon;
    ERC20 public iron;
    ERC20 public silicon;
    ERC20 public aluminium;
    ERC20 public pyrosilicate;

    ContDutchAuctionPair public SHI_PLTM;
    ContDutchAuctionPair public SHI_IRN;
    ContDutchAuctionPair public SHI_CRBN;
    ContDutchAuctionPair public SAN_SLCN;
    ContDutchAuctionPair public SAN_ALMN;
    ContDutchAuctionPair public HALF_CRBN;
    ContDutchAuctionPair public HALF_IRN;
    ContDutchAuctionPair public ZIS_ALMN;
    ContDutchAuctionPair public ZIS_SLCN;
    ContDutchAuctionPair public ZIS_CRBN;
    ContDutchAuctionPair public MTA_PSLT;
    ContDutchAuctionPair public MTA_IRN;

    Refinery public refinery;

    modifier deploymentStage(uint256 _stage) {
        require(_stage == stage, "not valid stage!");
        stage  += 1;
        _;
    }

    modifier onlyOperator() {
        require(msg.sender == operator, "operator function only");
        _;
    }

    constructor (address _operator) {
        operator = _operator;
        refinery = new Refinery(address(this));
    }

    function A_deployOres() public deploymentStage(0) onlyOperator {
        halfinium = new ERC20("Halfinium", "HALF"); 
        sangius = new ERC20("Sangius", "SAN");
        shigerium = new ERC20("Shigerium", "SHI");
        zisek = new ERC20("Zisek", "ZIS");
        mtare = new ERC20("Mtare", "MTA");
    }

    function B_deployMaterials() public deploymentStage(1) onlyOperator {
        plutonium = new ERC20("Plutonium", "PLTM");  
        carbon = new ERC20("Carbon", "CRBN");
        iron = new ERC20("Iron", "IRN");
        silicon = new ERC20("Silicon", "SLCN");
        aluminium = new ERC20("Aluminium", "ALMN");
        pyrosilicate = new ERC20("Pyrosilicate", "PSLT");
    }

    function C_deployPairs() public deploymentStage(2) onlyOperator {
        // Shigerium Pairs
        SHI_PLTM = new ContDutchAuctionPair(address(this), 1 ether, IERC20(address(shigerium)), IERC20(address(plutonium)), address(0));
        SHI_IRN = new ContDutchAuctionPair(address(this), 1 ether, IERC20(address(shigerium)), IERC20(address(iron)), address(0));
        SHI_CRBN = new ContDutchAuctionPair(address(this), 1 ether, IERC20(address(shigerium)), IERC20(address(carbon)), address(0));

        // Sangius Pairs
        SAN_SLCN = new ContDutchAuctionPair(address(this), 1 ether, IERC20(address(sangius)), IERC20(address(silicon)), address(0));
        SAN_ALMN = new ContDutchAuctionPair(address(this), 1 ether, IERC20(address(sangius)), IERC20(address(aluminium)), address(0));

        // Halfinium
        HALF_CRBN = new ContDutchAuctionPair(address(this), 1 ether, IERC20(address(halfinium)), IERC20(address(carbon)), address(0));
    }

    function D_deployPairs() public deploymentStage(3) onlyOperator {
        // Halfinium
        HALF_IRN = new ContDutchAuctionPair(address(this), 1 ether, IERC20(address(halfinium)), IERC20(address(iron)), address(0));

        // Zisek
        ZIS_ALMN = new ContDutchAuctionPair(address(this), 1 ether, IERC20(address(zisek)), IERC20(address(aluminium)), address(0));
        ZIS_SLCN = new ContDutchAuctionPair(address(this), 1 ether, IERC20(address(zisek)), IERC20(address(silicon)), address(0));
        ZIS_CRBN = new ContDutchAuctionPair(address(this), 1 ether, IERC20(address(zisek)), IERC20(address(carbon)), address(0));

        // Mtare
        MTA_PSLT = new ContDutchAuctionPair(address(this), 1 ether, IERC20(address(mtare)), IERC20(address(pyrosilicate)), address(0));
        MTA_IRN = new ContDutchAuctionPair(address(this), 1 ether, IERC20(address(mtare)), IERC20(address(iron)), address(0));
    }

    function E_configPairs() public deploymentStage(4) onlyOperator {
        // Whitelist refinery in pairs
        SHI_PLTM.whitelistSwapper(address(refinery), true);
        SHI_IRN.whitelistSwapper(address(refinery), true);
        SHI_CRBN.whitelistSwapper(address(refinery), true);
        SAN_SLCN.whitelistSwapper(address(refinery), true);
        SAN_ALMN.whitelistSwapper(address(refinery), true);
        HALF_CRBN.whitelistSwapper(address(refinery), true);
        HALF_IRN.whitelistSwapper(address(refinery), true);
        ZIS_ALMN.whitelistSwapper(address(refinery), true);
        ZIS_SLCN.whitelistSwapper(address(refinery), true);
        ZIS_CRBN.whitelistSwapper(address(refinery), true);
        MTA_PSLT.whitelistSwapper(address(refinery), true);
        MTA_IRN.whitelistSwapper(address(refinery), true);
    }


    function F_configOres() public deploymentStage(5) onlyOperator {
        // Whitelist refinery in ores contracts to receive funds
        halfinium.whitelist(address(refinery), true);
        sangius.whitelist(address(refinery), true);
        shigerium.whitelist(address(refinery), true);
        zisek.whitelist(address(refinery), true);
        mtare.whitelist(address(refinery), true);
    }

    function G_configMaterials() public deploymentStage(6) onlyOperator {
        // Add pair minter role to materials
        carbon.addMinter(address(ZIS_CRBN));
        carbon.addMinter(address(SHI_CRBN));
        carbon.addMinter(address(HALF_CRBN));
        silicon.addMinter(address(SAN_SLCN));
        silicon.addMinter(address(ZIS_SLCN));
        aluminium.addMinter(address(ZIS_ALMN));
        aluminium.addMinter(address(SAN_ALMN));
        iron.addMinter(address(HALF_IRN));
        iron.addMinter(address(MTA_IRN));
        iron.addMinter(address(SHI_IRN));
        pyrosilicate.addMinter(address(MTA_PSLT));
        plutonium.addMinter(address(SHI_PLTM));
    }

    function H_transferOwnership(address _operator) public deploymentStage(7) onlyOperator {
        // transfer ownerships to operator
        halfinium.setPendingOperator(_operator);
        sangius.setPendingOperator(_operator);
        shigerium.setPendingOperator(_operator);
        zisek.setPendingOperator(_operator);
        mtare.setPendingOperator(_operator);

        plutonium.setPendingOperator(_operator);
        carbon.setPendingOperator(_operator);
        silicon.setPendingOperator(_operator);
        aluminium.setPendingOperator(_operator);
        iron.setPendingOperator(_operator);
        pyrosilicate.setPendingOperator(_operator);
        plutonium.setPendingOperator(_operator);
        
        SHI_PLTM.setPendingOperator(_operator);
        SHI_IRN.setPendingOperator(_operator);
        SHI_CRBN.setPendingOperator(_operator);
        SAN_SLCN.setPendingOperator(_operator);
        SAN_ALMN.setPendingOperator(_operator);
        HALF_CRBN.setPendingOperator(_operator);
        HALF_IRN.setPendingOperator(_operator);
        ZIS_ALMN.setPendingOperator(_operator);
        ZIS_SLCN.setPendingOperator(_operator);
        ZIS_CRBN.setPendingOperator(_operator);
        MTA_PSLT.setPendingOperator(_operator);
        MTA_IRN.setPendingOperator(_operator);
        refinery.setPendingOperator(_operator);
    }
}