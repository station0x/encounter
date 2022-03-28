//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

interface IERC20 {
    function transferFrom(address,address,uint256) external returns (bool);
    function mint(address, uint256) external;
}

contract ContDutchAuctionPair {
    uint256 public r;
    uint256 public s;
    uint256 public immutable g = block.timestamp;
    uint256 public constant P = 1 ether;
    uint256 public fee = 250; // 2.5%
    address public operator;
    address public pendingOperator;
    address public feeRecipient;
    IERC20 public immutable tokenX;
    IERC20 public immutable tokenY;
    mapping(address => bool) public swappers;

    modifier onlyOperator {
        require(msg.sender == operator, "ONLY OPERATOR");
        _;
    }

    modifier onlySwappers {
        require(swappers[msg.sender], "ONLY WHITELISTED SWAPPERS ALLOWED");
        _;
    }

    constructor(address _operator, uint256 _r, IERC20 _tokenX, IERC20 _tokenY, address _feeRecipient) {
        operator = _operator;
        r = _r;
        tokenX = _tokenX;
        tokenY = _tokenY;
        feeRecipient = _feeRecipient;
    }

    function setPendingOperator(address newOperator_) public onlyOperator {
        pendingOperator = newOperator_;
    }

    function claimOperator() public {
        require(msg.sender == pendingOperator, "ONLY PENDING OPERATOR");
        operator = pendingOperator;
        pendingOperator = address(0);
        emit ChangeOperator(operator);
    }

    function getY(uint256 x) public view returns (uint256) {
        return (x*r*getT() - x*s) / (P+x);
    }

    // Not for precise calculations
    function getX(uint256 y) public view returns (uint256) {
        return (y*P) / (r*getT() - s - y);
    }

    function getT() public view returns (uint256) {
        unchecked { 
            return block.timestamp - g;
        }
    }

    function swap(uint256 x, uint256 minY, address to) public onlySwappers returns (uint256 y) {
        uint256 _s = s; // gas opt.
        y = (x*r*getT() - x*_s) / (P+x);
        require(y >= minY, "Insufficient Y");
        unchecked {
            s = _s + y;
        }
        // Get X from refinery to calculate Y then burn it
        // tokenX.transferFrom(msg.sender, address(this), x);
        // tokenX.burn(x);
        unchecked {
            uint256 yFee = y * fee / 10000;
            tokenY.mint(to, y - yFee);
            tokenY.mint(feeRecipient, yFee);
        }
    }

    function setR(uint256 _r) public onlyOperator {
        r = _r;
    }

    function whitelistSwapper(address _swapper, bool whitelist) public onlyOperator {
        swappers[_swapper] = whitelist;
    }

    function setFee(uint256 _newFee) public onlyOperator {
        require(_newFee <= 10000, "Not a valid bps");
        fee = _newFee;
    }

    function changeFeeRecipient(address _newRecipient) public onlyOperator {
        feeRecipient = _newRecipient;
    }

    event SetPaused(bool);
    event ChangeOperator(address);
}