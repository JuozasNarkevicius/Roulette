import Web3 from 'web3';

const abi = require('./contract-abi.json');

const web3 = new Web3(window.ethereum);
window.ethereum.enable();

var address = "0xb7da72Ff63C0Eb5C076526c943D064088AdB8e71";
var contract = new web3.eth.Contract(abi, address);

export const startWeb3 = async () => {

var result = contract.methods.result.call().call();
return result;

}

export const donate = async (fromAddress, amount) => {
    web3.eth.sendTransaction({
        from: fromAddress,
        to: address,
        value: web3.utils.toWei(amount, 'ether'),
      });
      //console.log(amount);
}

export const makeBetOnBlack = async (fromAddress, amount) => {
    contract.methods.makeBet(0, 0).send({from: fromAddress,
    value: web3.utils.toWei('1', 'ether'),});
    console.log(amount);
}

export const makeBetOnRed = async (fromAddress, amount) => {
    contract.methods.makeBet(0, 1).send({from: fromAddress,
        value: web3.utils.toWei('1', 'ether'),});
}