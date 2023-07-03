import { useEffect, useState } from "react";
//import { connectWallet, getCurrentWalletConnected, mintNFT, upload } from "./utils/interact.js";
import { connectWallet,  mintNFT, upload } from "./utils/interact.js";

const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const [amount, setAmount] = useState("");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const [documentName, setDocumentName] = useState("");

 
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("");
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


 /* useEffect(async () => {
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status); 
    addWalletListener(); 
}, []); */

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    const { success, status } = await mintNFT(amount);
    setStatus(status);
    if (success) {
      setAmount("");
    }
  };

  const onUploadPressed = async () => { 
    const { status } = await upload(documentName);
    setStatus(status);
  };

  return (
    <div className="Minter">
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
      <h1 id="title">Bilge's NFT Minter</h1>
      <p>
        Upload your *.png, Enter the amount, Press Mint! That's it!"
      </p>
     
      <form>
        <h1>General Info </h1>
        <h2>Name: </h2>
        <input
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setDocumentName(event.target.value)}
        />
      </form>
      <button id="upload" onClick={onUploadPressed}>
        Upload
      </button>

      <form><h1>Meta Data</h1></form>
      <div class="left">
      <form>
        <input
          type="text"
          placeholder="Value"
        />
      </form>
      </div>
      <div class="right">
      <form>
        <input
          type="text"
          placeholder="Key"
        />
      </form>
      </div>
      <div class="clear"></div>

  
      <form>
        <h1>Price</h1>
        <h2>Amount</h2>
        <input
          type="text"
        />
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        Mint
      </button>
      <p id="status">
        {status}
      </p>
    </div>
  );
};

export default Minter;
