import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";
import { startWeb3, donate, makeBetOnBlack, makeBetOnRed } from "./utils/interactWithContract.js";
//import Web3 from 'web3';

const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [donationAmount, setDonationAmount] = useState("");
  const [result, setResult] = useState("");
 
  useEffect(async () => { //TODO: implement
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status);
    addWalletListener()
  }, []);

  const connectWalletPressed = async () => { //TODO: implement
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => { //TODO: implement
    const result = await startWeb3();
    setResult(result);
  };
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }



  return (
    <div className="Minter">
      <h1 id="title">🧙‍♂️ SmartRoulette</h1>
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <form>
        <h2>Donations: </h2>
        <input
          type="text"
          placeholder="Like my project? Feel free to donate some ether! Enter amount here :)"
          onChange={(event) => setDonationAmount(event.target.value)}
        />
        <button type="submit" id="mintButton" onClick={() => donate(walletAddress, donationAmount)}>
        Donate!
      </button>
        <h2>Bet amount: </h2>
        <input
          type="text"
          placeholder="Choose a number of ether to bet"
          onChange={(event) => setBetAmount(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        Get the spin result
      </button>
      <button type="submit" id="mintButton" onClick={() => makeBetOnBlack(walletAddress, betAmount)}>
        Bet on black
      </button>
      <button id="mintButton" onClick={() => makeBetOnRed(walletAddress, betAmount)}>
        Bet on red
      </button>
      <p id="status">
        {status}
      </p>
      <p id="result">{result}</p>
    </div>
  );
};

export default Minter;
