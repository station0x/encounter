pragma solidity 0.8.10;
import "../RefineryDeployer.sol";

contract Gas {
    function testGas() public {
        new RefineryDeployer(address(this));
    }
}