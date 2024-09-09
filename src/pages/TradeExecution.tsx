import { ethers } from 'ethers';
import React, { useState } from 'react';
import { Button } from '@mui/material';

const TradeExecution = ({ contractAddress, contractABI }) => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } else {
      alert("Install MetaMask");
    }
  };

  const executeTrade = async () => {
    if (!account) return;
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      const transaction = await contract.executeTrade();
      await transaction.wait(); // Wait for the transaction to be confirmed
      console.log('Trade executed');
    } catch (error) {
      console.error("Error executing trade:", error);
    }
  };

  return (
    <div>
      <Button onClick={connectWallet} variant="contained">Connect Wallet</Button>
      {account && <p>Connected Account: {account}</p>}
      <Button onClick={executeTrade} variant="contained">Execute Trade</Button>
    </div>
  );
};

export default TradeExecution;
