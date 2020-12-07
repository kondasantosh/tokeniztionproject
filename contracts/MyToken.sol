pragma solidity ^0.7.0;

import "./ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Starbucks cappicino token", "capu") public{
        _mint(msg.sender, initialSupply);
        _setupDecimals(0);
    }
}