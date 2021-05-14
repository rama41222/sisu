pragma solidity ^0.8.3;

import "hardhat/console.sol";

contract Sisu {
    string public name = "Sisu Token";
    string public description = "si suuu";
    string public symbol = "SISU";
    uint public totalSupply = 1000000000;
    // { address: 0 }
    mapping(address => uint) balances;
    address public owner;

    constructor() {
        // adddress of the person who deploys this contract
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint amount) external {
        require(balances[msg.sender] >= amount, "Not enough Sisu");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint) {
        return balances[account];
    }
}