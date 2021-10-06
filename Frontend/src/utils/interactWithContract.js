import Web3 from 'web3';

const abi = require('./contract-abi.json');

const web3 = new Web3(window.ethereum);
window.ethereum.enable();

var address = "0x61851847159E51658eD5ACECB9fdf50ce0c3c2C9";
var contract = new web3.eth.Contract(abi, address);

export const startWeb3 = async () => {
    var result = await contract.methods.result.call().call();
    if (result === 0) return "Green";
    if (result % 2 === 0) return "Black";
    return "Red";
}

export const donate = async (fromAddress, amount) => {
    web3.eth.sendTransaction({
        from: fromAddress,
        to: address,
        value: web3.utils.toWei(amount, 'ether'),
      });
}

export const makeBetOnBlack = async (fromAddress, amount) => {
    contract.methods.makeBet(0, 0).send({from: fromAddress,
    value: web3.utils.toWei(amount, 'ether'),});
}

export const makeBetOnRed = async (fromAddress, amount) => {
    contract.methods.makeBet(0, 1).send({from: fromAddress,
    value: web3.utils.toWei(amount, 'ether'),});
}

export const makeBetOnGreen = async (fromAddress, amount) => {
    contract.methods.makeBet(0, 2).send({from: fromAddress,
    value: web3.utils.toWei(amount, 'ether'),});
}

export const spin = async (fromAddress) => {
    contract.methods.spinAll().send({from: fromAddress});
}